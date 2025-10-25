// Data Synchronization Service
// This service handles syncing admin panel changes with website components

class DataSyncService {
  constructor() {
    this.listeners = new Map();
    this.data = null;
  }

  // Subscribe to data changes
  subscribe(componentName, callback) {
    if (!this.listeners.has(componentName)) {
      this.listeners.set(componentName, []);
    }
    this.listeners.get(componentName).push(callback);
  }

  // Unsubscribe from data changes
  unsubscribe(componentName, callback) {
    if (this.listeners.has(componentName)) {
      const callbacks = this.listeners.get(componentName);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Notify all listeners of data changes
  notifyListeners(componentName, newData) {
    if (this.listeners.has(componentName)) {
      this.listeners.get(componentName).forEach(callback => {
        callback(newData);
      });
    }
  }

  // Load website data
  async loadWebsiteData() {
    try {
      const response = await fetch('/data/websiteData.json');
      if (response.ok) {
        this.data = await response.json();
        return this.data;
      }
    } catch (error) {
      console.error('Error loading website data:', error);
    }
    return null;
  }

  // Update website data
  async updateWebsiteData(newData) {
    try {
      this.data = newData;
      
      // Notify all components of the update
      this.listeners.forEach((callbacks, componentName) => {
        callbacks.forEach(callback => {
          callback(newData);
        });
      });

      return true;
    } catch (error) {
      console.error('Error updating website data:', error);
      return false;
    }
  }

  // Get specific data for a component
  getDataForComponent(componentName) {
    if (!this.data) return null;

    switch (componentName) {
      case 'contact':
        return this.data.contact;
      case 'testimonials':
        return this.data.testimonials;
      case 'productCategories':
        return this.data.productCategories;
      case 'marketplacePresence':
        return this.data.marketplacePresence;
      case 'technicalExpertise':
        return this.data.technicalExpertise;
      case 'messages':
        return this.data.messages;
      case 'footerContact':
        return this.data.footerContact;
      default:
        return this.data;
    }
  }

  // Force refresh all components
  async refreshAllComponents() {
    const newData = await this.loadWebsiteData();
    if (newData) {
      await this.updateWebsiteData(newData);
    }
  }
}

// Create singleton instance
const dataSyncService = new DataSyncService();

export default dataSyncService;
