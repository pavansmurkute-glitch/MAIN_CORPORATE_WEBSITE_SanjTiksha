import React, { useState, useEffect } from 'react';
import dataSyncService from '../services/dataSync';

const Contact = ({ data: propData }) => {
  const [contactData, setContactData] = useState(propData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load contact data from admin panel
    const loadContactData = async () => {
      try {
        // Try to load from website data file
        const response = await fetch('/data/websiteData.json');
        if (response.ok) {
          const websiteData = await response.json();
          setContactData(websiteData.contact);
        } else {
          // Fallback to prop data
          setContactData(propData);
        }
      } catch (error) {
        console.warn('Could not load contact data from admin panel, using default:', error);
        // Use prop data as fallback
        setContactData(propData);
      }
    };

    loadContactData();

    // Subscribe to data changes
    const handleDataChange = (newData) => {
      if (newData.contact) {
        setContactData(newData.contact);
      }
    };

    dataSyncService.subscribe('contact', handleDataChange);

    return () => {
      dataSyncService.unsubscribe('contact', handleDataChange);
    };
  }, [propData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Add timestamp and status to the data
    const messageData = {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    
    try {
      // Try to save to localStorage first as a backup
      const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const newMessage = {
        id: Date.now(),
        ...messageData
      };
      existingMessages.push(newMessage);
      localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
      
      // Send message to server
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
      });

      if (response.ok) {
        await response.json();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
      } else {
        // Even if server fails, message is saved to localStorage
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
      }
    } catch (error) {
      // Even if network fails, message is saved to localStorage
      alert('Thank you for your message! We will get back to you soon.');
      e.target.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{
      padding: '120px 20px',
      background: `
        linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%),
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.04) 0%, transparent 70%)
      `,
      color: '#1e293b',
      textAlign: 'center',
      minHeight: '100vh',
      overflow: 'visible'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        overflow: 'visible'
      }}>
        {/* Section Header */}
        <h2 style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          marginBottom: '20px',
          color: '#0f172a',
          textShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          Get In Touch
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          marginBottom: '80px',
          color: '#64748b',
          maxWidth: '700px',
          margin: '0 auto 80px',
          lineHeight: '1.6'
        }}>
          Ready to transform your business? Let's discuss how we can help you achieve your goals with our comprehensive trading and IT solutions.
        </p>

        <div style={{
          display: 'flex',
          gap: '60px',
          alignItems: 'start',
          flexWrap: 'nowrap'
        }}>
          {/* Contact Information */}
          <div style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            padding: '50px 40px',
            borderRadius: '16px',
            border: '2px solid #e2e8f0',
            textAlign: 'left',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)',
            flex: '1',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '40px',
              color: '#1e293b',
              textAlign: 'center',
              borderBottom: '3px solid #3b82f6',
              paddingBottom: '15px',
              position: 'relative'
            }}>
              Contact Information
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '25px',
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 8px rgba(59, 130, 246, 0.3)'
                }}>
                  📍
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '5px', color: '#1e293b' }}>Address</div>
                  <div style={{ color: '#64748b', fontSize: '0.95rem' }}>{contactData?.address || '51/7/9 NO B-17, R K IMPERIAL, Ambegaon Budruk, Pune MAHARASHTRA ,India, 411046'}</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '25px',
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 8px rgba(16, 185, 129, 0.3)'
                }}>
                  📧
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '5px', color: '#1e293b' }}>Email</div>
                  <div style={{ color: '#64748b', fontSize: '0.95rem' }}>{contactData?.email || 'info@sanjtiksha.com'}</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '25px',
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 8px rgba(245, 158, 11, 0.3)'
                }}>
                  📞
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '5px', color: '#1e293b' }}>Phone</div>
                  <div style={{ color: '#64748b', fontSize: '0.95rem' }}>{contactData?.phone || '+91 76662 93267'}</div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div style={{
              marginTop: '40px',
              padding: '30px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '12px',
              border: '2px solid #e2e8f0',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h4 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#1e293b',
                textAlign: 'center',
                borderBottom: '2px solid #3b82f6',
                paddingBottom: '10px'
              }}>
                Business Hours
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                color: '#64748b'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Monday - Saturday</span>
                  <span>{contactData?.businessHours?.weekdays || '10:00 AM - 10:00 PM'}</span>
                </div>
              
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Sunday</span>
                  <span>{contactData?.businessHours?.sunday || 'Closed'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            padding: '50px 40px',
            borderRadius: '16px',
            border: '2px solid #e2e8f0',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)',
            flex: '1',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '40px',
              color: '#1e293b',
              textAlign: 'center',
              borderBottom: '3px solid #3b82f6',
              paddingBottom: '15px',
              position: 'relative'
            }}>
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  style={{
                    padding: '18px 20px',
                    borderRadius: '8px',
                    border: '2px solid rgba(32, 178, 170, 0.3)',
                    fontSize: '1rem',
                    background: '#ffffff',
                    color: '#1e293b',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  required
                  style={{
                    padding: '18px 20px',
                    borderRadius: '12px',
                    border: '2px solid rgba(32, 178, 170, 0.3)',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#1e40af',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  style={{
                    padding: '18px 20px',
                    borderRadius: '12px',
                    border: '2px solid rgba(32, 178, 170, 0.3)',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#1e40af',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  style={{
                    padding: '18px 20px',
                    borderRadius: '12px',
                    border: '2px solid rgba(32, 178, 170, 0.3)',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#1e40af',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>

              <select
                name="service"
                style={{
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(32, 178, 170, 0.3)',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#0f172a',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                <option value="">Select Service Interest</option>
                <option value="trading">Trading & Retail Services</option>
                <option value="it">IT Services & Development</option>
                <option value="both">Both Services</option>
                <option value="consultation">General Consultation</option>
              </select>

              <textarea
                name="message"
                placeholder="Your Message *"
                rows="5"
                required
                style={{
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: '2px solid rgba(32, 178, 170, 0.3)',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#0f172a',
                  fontWeight: '500',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#20b2aa';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 178, 170, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(32, 178, 170, 0.3)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
              />

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                  color: 'white',
                  padding: '20px 40px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  marginTop: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;