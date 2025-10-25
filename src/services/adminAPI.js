// Admin API Service
// This service handles all admin panel data operations
// In a real application, these would be actual API calls to your backend

class AdminAPI {
  constructor() {
    this.baseURL = '/api/admin'; // Replace with your actual API endpoint
    this.data = this.loadFromStorage();
  }

  // Load data from localStorage (simulating server data)
  loadFromStorage() {
    try {
      const savedData = localStorage.getItem('adminData');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
    return this.getDefaultData();
  }

  // Save data to localStorage (simulating server save)
  saveToStorage(data) {
    try {
      localStorage.setItem('adminData', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving data to storage:', error);
      return false;
    }
  }

  // Get default data structure
  getDefaultData() {
    return {
      contact: {
        address: 'Pune, Maharashtra, India',
        email: 'info@sanjtiksha.com',
        phone: '+91 76662 93267',
        businessHours: {
          weekdays: 'Monday - Saturday: 10:00 AM - 10:00 PM',
          sunday: 'Sunday: Closed'
        }
      },
      testimonials: [],
      productCategories: [],
      marketplacePresence: [],
      technicalExpertise: [],
      messages: [],
      footerContact: {
        address: 'Pune, Maharashtra, India',
        email: 'info@sanjtiksha.com',
        phone: '+91 76662 93267'
      }
    };
  }

  // Contact Information API
  async getContactInfo() {
    return this.data.contact;
  }

  async updateContactInfo(contactData) {
    this.data.contact = { ...this.data.contact, ...contactData };
    this.saveToStorage(this.data);
    return this.data.contact;
  }

  // Testimonials API
  async getTestimonials() {
    return this.data.testimonials;
  }

  async addTestimonial(testimonial) {
    const newTestimonial = {
      id: Date.now(),
      ...testimonial,
      createdAt: new Date().toISOString()
    };
    this.data.testimonials.push(newTestimonial);
    this.saveToStorage(this.data);
    return newTestimonial;
  }

  async updateTestimonial(id, updatedTestimonial) {
    const index = this.data.testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      this.data.testimonials[index] = { ...this.data.testimonials[index], ...updatedTestimonial };
      this.saveToStorage(this.data);
      return this.data.testimonials[index];
    }
    throw new Error('Testimonial not found');
  }

  async deleteTestimonial(id) {
    this.data.testimonials = this.data.testimonials.filter(t => t.id !== id);
    this.saveToStorage(this.data);
    return true;
  }

  // Product Categories API
  async getProductCategories() {
    return this.data.productCategories;
  }

  async addProductCategory(category) {
    const newCategory = {
      id: Date.now(),
      ...category,
      createdAt: new Date().toISOString()
    };
    this.data.productCategories.push(newCategory);
    this.saveToStorage(this.data);
    return newCategory;
  }

  async updateProductCategory(id, updatedCategory) {
    const index = this.data.productCategories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.data.productCategories[index] = { ...this.data.productCategories[index], ...updatedCategory };
      this.saveToStorage(this.data);
      return this.data.productCategories[index];
    }
    throw new Error('Product category not found');
  }

  async deleteProductCategory(id) {
    this.data.productCategories = this.data.productCategories.filter(c => c.id !== id);
    this.saveToStorage(this.data);
    return true;
  }

  // Marketplace Presence API
  async getMarketplacePresence() {
    return this.data.marketplacePresence;
  }

  async addMarketplacePresence(marketplace) {
    const newMarketplace = {
      id: Date.now(),
      ...marketplace,
      createdAt: new Date().toISOString()
    };
    this.data.marketplacePresence.push(newMarketplace);
    this.saveToStorage(this.data);
    return newMarketplace;
  }

  async updateMarketplacePresence(id, updatedMarketplace) {
    const index = this.data.marketplacePresence.findIndex(m => m.id === id);
    if (index !== -1) {
      this.data.marketplacePresence[index] = { ...this.data.marketplacePresence[index], ...updatedMarketplace };
      this.saveToStorage(this.data);
      return this.data.marketplacePresence[index];
    }
    throw new Error('Marketplace presence not found');
  }

  async deleteMarketplacePresence(id) {
    this.data.marketplacePresence = this.data.marketplacePresence.filter(m => m.id !== id);
    this.saveToStorage(this.data);
    return true;
  }

  // Technical Expertise API
  async getTechnicalExpertise() {
    return this.data.technicalExpertise;
  }

  async addTechnicalExpertise(expertise) {
    const newExpertise = {
      id: Date.now(),
      ...expertise,
      createdAt: new Date().toISOString()
    };
    this.data.technicalExpertise.push(newExpertise);
    this.saveToStorage(this.data);
    return newExpertise;
  }

  async updateTechnicalExpertise(id, updatedExpertise) {
    const index = this.data.technicalExpertise.findIndex(e => e.id === id);
    if (index !== -1) {
      this.data.technicalExpertise[index] = { ...this.data.technicalExpertise[index], ...updatedExpertise };
      this.saveToStorage(this.data);
      return this.data.technicalExpertise[index];
    }
    throw new Error('Technical expertise not found');
  }

  async deleteTechnicalExpertise(id) {
    this.data.technicalExpertise = this.data.technicalExpertise.filter(e => e.id !== id);
    this.saveToStorage(this.data);
    return true;
  }

  // Messages API
  async getMessages() {
    return this.data.messages;
  }

  async addMessage(message) {
    const newMessage = {
      id: Date.now(),
      ...message,
      createdAt: new Date().toISOString()
    };
    this.data.messages.push(newMessage);
    this.saveToStorage(this.data);
    return newMessage;
  }

  // Footer Contact API
  async getFooterContact() {
    return this.data.footerContact;
  }

  async updateFooterContact(footerData) {
    this.data.footerContact = { ...this.data.footerContact, ...footerData };
    this.saveToStorage(this.data);
    return this.data.footerContact;
  }

  // Export all data
  async exportData() {
    return this.data;
  }

  // Import data
  async importData(data) {
    this.data = data;
    this.saveToStorage(this.data);
    return true;
  }

  // Reset to default data
  async resetData() {
    this.data = this.getDefaultData();
    this.saveToStorage(this.data);
    return true;
  }
}

// Create singleton instance
const adminAPI = new AdminAPI();

export default adminAPI;
