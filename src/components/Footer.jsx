const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      color: 'white',
      padding: '60px 20px 30px',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo and Company Info */}
        <div style={{
          marginBottom: '40px'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              marginBottom: '10px',
              letterSpacing: '-0.02em'
            }}>
              <span style={{ color: '#ff6b35' }}>SANJ</span>
              <span style={{ color: '#20b2aa' }}>TIKSHA</span>
            </div>
            <div style={{
              fontSize: '1.2rem',
              color: '#cbd5e1',
              fontWeight: '400',
              letterSpacing: '0.5px',
              marginBottom: '5px'
            }}>
              Roots and Wings
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#94a3b8',
              fontWeight: '300',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              ROOTED IN VISION, FLYING BEYOND LIMITS
                </div>
              </div>
          
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Empowering businesses with innovative trading solutions and cutting-edge technology services. 
            Where commerce meets technology for sustainable growth and success.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Quick Links
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {['Home', 'About', 'Services', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.8,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0.8';
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
            </div>

            <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Services
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {['Trading Solutions', 'IT Services', 'Custom Development', 'Consulting'].map((service) => (
                <span
                  key={service}
                  style={{
                    opacity: 0.8
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
            </div>

            <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Contact Info
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              opacity: 0.8
            }}>
              <div>📍 51/7/9 NO B-17, R K IMPERIAL, Ambegaon Budruk,Pune, MAHARASHTRA ,India, 411046</div>
              <div>📧 info@sanjtiksha.com</div>
              <div>📞 +91 76662 93267</div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div style={{
          marginBottom: '30px'
        }}>
          <h4 style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Follow Us
          </h4>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}>
            {[
              { icon: '📘', name: 'Facebook', url: '#' },
              { icon: '🐦', name: 'Twitter', url: '#' },
              { icon: '💼', name: 'LinkedIn', url: '#' },
              { icon: '📷', name: 'Instagram', url: '#' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  textDecoration: 'none',
                  fontSize: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Admin Login Button */}
        <div style={{
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          <a
            href="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.7)',
              padding: '4px 8px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '0.7rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.color = 'rgba(255, 255, 255, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
          >
            <span style={{ fontSize: '0.8rem' }}>🔐</span>
            Admin
          </a>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '30px',
          opacity: 0.7
        }}>
          <p>
            © 2024 SanjTiksha Roots & Wings. All rights reserved. | 
            <a href="#" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>Privacy Policy</a> | 
            <a href="#" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}>Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;