import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('contact');
  const [data, setData] = useState({
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
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check if user is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      loadData();
    }
  }, []);

  const handleLogin = (success) => {
    setIsLoggedIn(success);
    if (success) {
      loadData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
  };

  // Load data from server
  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load actual website data from existing JSON files
      let websiteData = {
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

      // Load messages from the new messages API
      try {
        const messagesResponse = await fetch('/api/admin/messages', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json();
          websiteData.messages = messagesData;
        }
      } catch (error) {
        console.warn('Could not load messages from API:', error);
        
        // Fallback: Load from localStorage
        try {
          const localMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
          if (localMessages.length > 0) {
            websiteData.messages = localMessages;
            // Messages loaded from localStorage
          }
        } catch (localError) {
          // Silently handle localStorage errors in production
        }
      }

      // Load contact data from actual website files
      try {
        const contactResponse = await fetch('/data/contact.json');
        if (contactResponse.ok) {
          const contactData = await contactResponse.json();
          websiteData.contact = {
            address: contactData.contact.address,
            email: contactData.contact.email,
            phone: contactData.contact.phone,
            businessHours: {
              weekdays: contactData.contact.business_hours || 'Monday - Saturday: 10:00 AM - 10:00 PM',
              sunday: 'Sunday: Closed'
            }
          };
          websiteData.footerContact = {
            address: contactData.contact.address,
            email: contactData.contact.email,
            phone: contactData.contact.phone
          };
        }
      } catch (error) {
        console.warn('Could not load contact data:', error);
      }

      // Load testimonials from actual website files
      try {
        const testimonialsResponse = await fetch('/data/testimonials.json');
        if (testimonialsResponse.ok) {
          const testimonialsData = await testimonialsResponse.json();
          websiteData.testimonials = testimonialsData.testimonials.map((testimonial, index) => ({
            id: index + 1,
            name: testimonial.name,
            company: testimonial.company,
            testimonial: testimonial.content,
            rating: testimonial.rating,
            createdAt: new Date().toISOString()
          }));
        }
      } catch (error) {
        console.warn('Could not load testimonials data:', error);
      }

      // Try to load from localStorage as backup
      const savedData = localStorage.getItem('adminData');
      if (savedData) {
        const localData = JSON.parse(savedData);
        // Merge with website data, prioritizing website data
        websiteData = {
          ...localData,
          contact: websiteData.contact,
          testimonials: websiteData.testimonials,
          footerContact: websiteData.footerContact
        };
      }
      
      setData(websiteData);
      console.log('Admin panel data loaded from website files:', websiteData);
      setMessage('Data loaded from website files successfully!');
      setTimeout(() => setMessage(''), 2000);
      
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Error loading data - using default settings');
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (newData) => {
    try {
      setLoading(true);
      
      // Always save to localStorage first
      localStorage.setItem('adminData', JSON.stringify(newData));
      
      // Save contact data back to contact.json
      if (newData.contact) {
        try {
          const contactData = {
            contact: {
              address: newData.contact.address,
              email: newData.contact.email,
              phone: newData.contact.phone,
              business_hours: newData.contact.businessHours.weekdays
            }
          };
          
          const response = await fetch('/api/admin/contact', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData)
          });
          
          if (!response.ok) {
            console.warn('Failed to save contact data to server');
          }
        } catch (error) {
          console.warn('Could not save contact data:', error);
        }
      }

      // Save testimonials data back to testimonials.json
      if (newData.testimonials) {
        try {
          const testimonialsData = {
            testimonials: newData.testimonials.map(testimonial => ({
              name: testimonial.name,
              position: 'Customer',
              company: testimonial.company,
              content: testimonial.testimonial,
              rating: testimonial.rating
            }))
          };
          
          const response = await fetch('/api/admin/testimonials', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonialsData)
          });
          
          if (!response.ok) {
            console.warn('Failed to save testimonials data to server');
          }
        } catch (error) {
          console.warn('Could not save testimonials data:', error);
        }
      }
      
      setData(newData);
      setMessage('Data saved successfully! Changes will reflect on the website.');
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('Error saving data - please try again');
    } finally {
      setLoading(false);
    }
  };

  const updateContactInfo = (field, value) => {
    const newData = { ...data };
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      newData.contact[parent][child] = value;
    } else {
      newData.contact[field] = value;
    }
    saveData(newData);
  };

  const addTestimonial = (testimonial) => {
    const newData = { ...data };
    newData.testimonials.push({
      id: Date.now(),
      ...testimonial,
      createdAt: new Date().toISOString()
    });
    saveData(newData);
  };

  const updateTestimonial = (id, updatedTestimonial) => {
    const newData = { ...data };
    const index = newData.testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      newData.testimonials[index] = { ...newData.testimonials[index], ...updatedTestimonial };
      saveData(newData);
    }
  };

  const deleteTestimonial = (id) => {
    const newData = { ...data };
    newData.testimonials = newData.testimonials.filter(t => t.id !== id);
    saveData(newData);
  };

  const addProductCategory = (category) => {
    const newData = { ...data };
    newData.productCategories.push({
      id: Date.now(),
      ...category,
      createdAt: new Date().toISOString()
    });
    saveData(newData);
  };

  const updateProductCategory = (id, updatedCategory) => {
    const newData = { ...data };
    const index = newData.productCategories.findIndex(c => c.id === id);
    if (index !== -1) {
      newData.productCategories[index] = { ...newData.productCategories[index], ...updatedCategory };
      saveData(newData);
    }
  };

  const deleteProductCategory = (id) => {
    const newData = { ...data };
    newData.productCategories = newData.productCategories.filter(c => c.id !== id);
    saveData(newData);
  };

  const addMarketplacePresence = (marketplace) => {
    const newData = { ...data };
    newData.marketplacePresence.push({
      id: Date.now(),
      ...marketplace,
      createdAt: new Date().toISOString()
    });
    saveData(newData);
  };

  const updateMarketplacePresence = (id, updatedMarketplace) => {
    const newData = { ...data };
    const index = newData.marketplacePresence.findIndex(m => m.id === id);
    if (index !== -1) {
      newData.marketplacePresence[index] = { ...newData.marketplacePresence[index], ...updatedMarketplace };
      saveData(newData);
    }
  };

  const deleteMarketplacePresence = (id) => {
    const newData = { ...data };
    newData.marketplacePresence = newData.marketplacePresence.filter(m => m.id !== id);
    saveData(newData);
  };

  const addTechnicalExpertise = (expertise) => {
    const newData = { ...data };
    newData.technicalExpertise.push({
      id: Date.now(),
      ...expertise,
      createdAt: new Date().toISOString()
    });
    saveData(newData);
  };

  const updateTechnicalExpertise = (id, updatedExpertise) => {
    const newData = { ...data };
    const index = newData.technicalExpertise.findIndex(e => e.id === id);
    if (index !== -1) {
      newData.technicalExpertise[index] = { ...newData.technicalExpertise[index], ...updatedExpertise };
      saveData(newData);
    }
  };

  const deleteTechnicalExpertise = (id) => {
    const newData = { ...data };
    newData.technicalExpertise = newData.technicalExpertise.filter(e => e.id !== id);
    saveData(newData);
  };

  const updateFooterContact = (field, value) => {
    const newData = { ...data };
    newData.footerContact[field] = value;
    saveData(newData);
  };

  const sections = [
    { id: 'contact', name: 'Contact Information', icon: '📞' },
    { id: 'testimonials', name: 'Testimonials', icon: '💬' },
    { id: 'products', name: 'Product Categories', icon: '📦' },
    { id: 'marketplace', name: 'Marketplace Presence', icon: '🏪' },
    { id: 'expertise', name: 'Technical Expertise', icon: '⚙️' },
    { id: 'messages', name: `Messages ${data.messages?.length > 0 ? `(${data.messages.length})` : ''}`, icon: '📧' },
    { id: 'footer', name: 'Footer Contact', icon: '🔗' }
  ];

  // Show login form if not logged in
  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
      {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          color: 'white',
          padding: '30px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <button
            onClick={handleLogout}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span>🚪</span>
            Logout
          </button>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '10px'
          }}>
            Admin Panel
          </h1>
          <p style={{
            fontSize: '1.1rem',
            margin: 0,
            opacity: 0.9
          }}>
            Manage your website content and data
          </p>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          overflowX: 'auto'
        }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                padding: '20px 25px',
                border: 'none',
                background: activeSection === section.id ? 'white' : 'transparent',
                color: activeSection === section.id ? '#3b82f6' : '#64748b',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: activeSection === section.id ? '600' : '500',
                borderBottom: activeSection === section.id ? '3px solid #3b82f6' : '3px solid transparent',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div style={{
            padding: '15px 30px',
            background: message.includes('Error') ? '#fef2f2' : '#f0fdf4',
            color: message.includes('Error') ? '#dc2626' : '#16a34a',
            borderLeft: `4px solid ${message.includes('Error') ? '#dc2626' : '#16a34a'}`,
            margin: '0 30px',
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            {message}
          </div>
        )}

        {/* Debug Info */}
        <div style={{
          padding: '10px 30px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          margin: '0 30px',
          borderRadius: '8px',
          marginTop: '10px',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <strong>Debug Info:</strong> Data loaded from {data.contact ? 'admin panel' : 'default'}. 
          {data.testimonials?.length > 0 && ` Testimonials: ${data.testimonials.length}`}
          {data.messages?.length > 0 && ` Messages: ${data.messages.length}`}
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {loading && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px',
              fontSize: '1.1rem',
              color: '#64748b'
            }}>
              Loading...
            </div>
          )}

          {!loading && (
            <>
              {activeSection === 'contact' && (
                <ContactInfoSection 
                  data={data.contact} 
                  onUpdate={updateContactInfo} 
                />
              )}
              {activeSection === 'testimonials' && (
                <TestimonialsSection 
                  data={data.testimonials} 
                  onAdd={addTestimonial}
                  onUpdate={updateTestimonial}
                  onDelete={deleteTestimonial}
                />
              )}
              {activeSection === 'products' && (
                <ProductCategoriesSection 
                  data={data.productCategories} 
                  onAdd={addProductCategory}
                  onUpdate={updateProductCategory}
                  onDelete={deleteProductCategory}
                />
              )}
              {activeSection === 'marketplace' && (
                <MarketplacePresenceSection 
                  data={data.marketplacePresence} 
                  onAdd={addMarketplacePresence}
                  onUpdate={updateMarketplacePresence}
                  onDelete={deleteMarketplacePresence}
                />
              )}
              {activeSection === 'expertise' && (
                <TechnicalExpertiseSection 
                  data={data.technicalExpertise} 
                  onAdd={addTechnicalExpertise}
                  onUpdate={updateTechnicalExpertise}
                  onDelete={deleteTechnicalExpertise}
                />
              )}
              {activeSection === 'messages' && (
                <MessagesSection data={data.messages} />
              )}
              {activeSection === 'footer' && (
                <FooterContactSection 
                  data={data.footerContact} 
                  onUpdate={updateFooterContact} 
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Contact Information Section
const ContactInfoSection = ({ data, onUpdate }) => {
  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px', color: '#1e293b' }}>
        Contact Information
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Address
              </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => onUpdate('address', e.target.value)}
                style={{
                  width: '100%',
              padding: '12px',
                  border: '2px solid #e5e7eb',
              borderRadius: '8px',
                  fontSize: '1rem',
              transition: 'border-color 0.3s ease'
                }}
              />
            </div>

            <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Weekdays Hours
              </label>
              <input
                type="text"
            value={data.businessHours.weekdays}
            onChange={(e) => onUpdate('businessHours.weekdays', e.target.value)}
                style={{
                  width: '100%',
              padding: '12px',
                  border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
                }}
              />
            </div>

            <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Sunday Hours
          </label>
          <input
            type="text"
            value={data.businessHours.sunday}
            onChange={(e) => onUpdate('businessHours.sunday', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Testimonials Section
const TestimonialsSection = ({ data, onAdd, onUpdate, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    testimonial: '',
    rating: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData({ name: '', company: '', testimonial: '', rating: 5 });
    setShowForm(false);
  };

  const handleEdit = (testimonial) => {
    setFormData(testimonial);
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  return (
                <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
          Testimonials
        </h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
                    fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Add Testimonial
        </button>
      </div>

      {showForm && (
        <div style={{
          background: '#f8fafc',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '2px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>
            {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Name *
                  </label>
                  <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                      fontSize: '1rem'
                    }}
              />
            </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Company *
                  </label>
                  <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                    border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Rating *
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '12px',
                      border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                      fontSize: '1rem'
                  }}
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                Testimonial *
              </label>
              <textarea
                required
                rows={4}
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                    }}
                />
              </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="submit"
                style={{
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                {editingId ? 'Update' : 'Add'} Testimonial
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', company: '', testimonial: '', rating: 5 });
                }}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        {data.map((testimonial) => (
          <div key={testimonial.id} style={{
            background: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
                  {testimonial.name}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '5px 0 0 0' }}>
                  {testimonial.company}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  onClick={() => handleEdit(testimonial)}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(testimonial.id)}
                  style={{
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} style={{ color: '#fbbf24', fontSize: '1.2rem' }}>★</span>
              ))}
            </div>
            <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Product Categories Section
const ProductCategoriesSection = ({ data, onAdd, onUpdate, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    features: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData({ name: '', description: '', icon: '', features: [] });
    setShowForm(false);
  };

  const handleEdit = (category) => {
    setFormData(category);
    setEditingId(category.id);
    setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
          Product Categories
        </h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
                    fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Add Category
        </button>
      </div>

      {showForm && (
        <div style={{
          background: '#f8fafc',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '2px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Name *
                  </label>
                  <input
                    type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                    border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Icon
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., 📱, 💻, 🛒"
                  style={{
                    width: '100%',
                    padding: '12px',
                      border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="submit"
                style={{
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                {editingId ? 'Update' : 'Add'} Category
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', description: '', icon: '', features: [] });
                }}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {data.map((category) => (
          <div key={category.id} style={{
            background: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {category.icon && <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>}
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
                  {category.name}
                </h4>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  onClick={() => handleEdit(category)}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(category.id)}
                  style={{
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Marketplace Presence Section
const MarketplacePresenceSection = ({ data, onAdd, onUpdate, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    icon: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData({ name: '', url: '', description: '', icon: '' });
    setShowForm(false);
  };

  const handleEdit = (marketplace) => {
    setFormData(marketplace);
    setEditingId(marketplace.id);
    setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
          Marketplace Presence
        </h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Add Marketplace
        </button>
      </div>

      {showForm && (
              <div style={{
          background: '#f8fafc',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '2px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>
            {editingId ? 'Edit Marketplace' : 'Add New Marketplace'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Name *
                    </label>
              <input
                      type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                    padding: '12px',
                        border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Icon
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., 🛒, 🏪, 📱"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="submit"
                style={{
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                {editingId ? 'Update' : 'Add'} Marketplace
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', url: '', description: '', icon: '' });
                }}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {data.map((marketplace) => (
          <div key={marketplace.id} style={{
            background: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {marketplace.icon && <span style={{ fontSize: '1.5rem' }}>{marketplace.icon}</span>}
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
                  {marketplace.name}
                </h4>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  onClick={() => handleEdit(marketplace)}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(marketplace.id)}
                  style={{
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <p style={{ color: '#64748b', lineHeight: '1.6', margin: '0 0 10px 0' }}>
              {marketplace.description}
            </p>
            <a
              href={marketplace.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              Visit Marketplace →
            </a>
            </div>
                ))}
            </div>
            </div>
  );
};

// Technical Expertise Section
const TechnicalExpertiseSection = ({ data, onAdd, onUpdate, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData({ name: '', description: '', icon: '', category: '' });
    setShowForm(false);
  };

  const handleEdit = (expertise) => {
    setFormData(expertise);
    setEditingId(expertise.id);
    setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
          Technical Expertise
        </h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Add Expertise
        </button>
          </div>

      {showForm && (
          <div style={{
          background: '#f8fafc',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '2px solid #e2e8f0'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>
            {editingId ? 'Edit Expertise' : 'Add New Expertise'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Frontend, Backend, Database"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Icon
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., ⚛️, 🟢, 🐘"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
                type="submit"
              style={{
                  background: '#10b981',
                color: 'white',
                border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                {editingId ? 'Update' : 'Add'} Expertise
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', description: '', icon: '', category: '' });
                }}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Cancel
            </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {data.map((expertise) => (
          <div key={expertise.id} style={{
            background: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {expertise.icon && <span style={{ fontSize: '1.5rem' }}>{expertise.icon}</span>}
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
                  {expertise.name}
                </h4>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
          <button
                  onClick={() => handleEdit(expertise)}
              style={{
                    background: '#3b82f6',
                color: 'white',
                border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(expertise.id)}
                  style={{
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Delete
          </button>
          </div>
        </div>
            {expertise.category && (
              <div style={{
                background: '#f1f5f9',
                color: '#475569',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: '600',
                display: 'inline-block',
                marginBottom: '10px'
              }}>
                {expertise.category}
              </div>
            )}
            <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>
              {expertise.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Messages Section
const MessagesSection = ({ data }) => {
  const [messages, setMessages] = useState(data || []);
  const [loading, setLoading] = useState(false);

  const refreshMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (response.ok) {
        const messagesData = await response.json();
        setMessages(messagesData);
      }
    } catch (error) {
      console.error('Error refreshing messages:', error);
      
      // Fallback: Load from localStorage
      try {
        const localMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        setMessages(localMessages);
        // Messages loaded from localStorage as fallback
      } catch (localError) {
        console.error('Could not load from localStorage either:', localError);
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      // Update message status to read
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
          Messages from Contact Form
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={refreshMessages}
            disabled={loading}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Refreshing...' : '🔄 Refresh Messages'}
          </button>
          <button
            onClick={() => {
              try {
                const localMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                setMessages(localMessages);
                // Messages loaded from localStorage
              } catch (error) {
                console.error('Error loading from localStorage:', error);
              }
            }}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            📱 Load from Local Storage
          </button>
        </div>
      </div>
      
      {messages.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#64748b',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '2px solid #e2e8f0'
        }}>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>No messages received yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          {messages.map((message, index) => (
            <div key={message.id || index} style={{
              background: 'white',
              border: `2px solid ${message.status === 'unread' ? '#3b82f6' : '#e2e8f0'}`,
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              position: 'relative'
            }}>
              {message.status === 'unread' && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#3b82f6',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}>
                  NEW
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>
                    {message.name}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '5px 0 0 0' }}>
                    {message.email}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                  <span style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                  <span style={{
                    background: '#f1f5f9',
                    color: '#475569',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: '600'
                  }}>
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              
              {message.company && (
                <p style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                  <strong>Company:</strong> {message.company}
                </p>
              )}
              {message.phone && (
                <p style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                  <strong>Phone:</strong> {message.phone}
                </p>
              )}
              {message.service && (
                <p style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                  <strong>Service Interest:</strong> {message.service}
                </p>
              )}
              
              <div style={{
                background: '#f8fafc',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                marginBottom: '15px'
              }}>
                <p style={{ color: '#374151', lineHeight: '1.6', margin: 0 }}>
                  {message.message}
                </p>
              </div>
              
              {message.status === 'unread' && (
                <button
                  onClick={() => markAsRead(message.id)}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}
                  >
                    Mark as Read
                  </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Footer Contact Section
const FooterContactSection = ({ data, onUpdate }) => {
  return (
    <div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px', color: '#1e293b' }}>
        Footer Contact Information
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Address
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => onUpdate('address', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Phone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;