import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Minimal Header - Only Hamburger Menu */}
      <header style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(32, 178, 170, 0.2)',
            color: '#1e293b',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(32, 178, 170, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 1)';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(32, 178, 170, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(32, 178, 170, 0.2)';
          }}
        >
          {/* Hamburger Icon */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            width: '24px',
            height: '18px'
          }}>
            <div style={{
              width: '100%',
              height: '2px',
              background: '#1e293b',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}></div>
            <div style={{
              width: '100%',
              height: '2px',
              background: '#1e293b',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              opacity: isMenuOpen ? '0' : '1'
            }}></div>
            <div style={{
              width: '100%',
              height: '2px',
              background: '#1e293b',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }}></div>
          </div>
        </button>
      </header>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '350px',
            height: '100vh',
            background: 'white',
            zIndex: 1001,
            boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.3)',
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease',
            overflowY: 'auto'
          }}>
            {/* Sidebar Header */}
            <div style={{
              padding: '30px 25px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: '#334155',
                  border: 'none',
                  color: 'white',
                  padding: '8px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                ☰
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            {/* Logo */}
            <div style={{
              padding: '20px 25px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: '900',
                marginBottom: '5px',
                letterSpacing: '-0.02em'
              }}>
                <span style={{ color: '#ff6b35' }}>SANJ</span>
                <span style={{ color: '#20b2aa' }}>TIKSHA</span>
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#64748b',
                fontWeight: '400',
                letterSpacing: '0.5px'
              }}>
                Roots and Wings
              </div>
            </div>

            {/* Navigation Links */}
            <div style={{
              padding: '0 25px 30px'
            }}>
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {[
                  { name: 'Home', href: '#hero', icon: '🏠' },
                  { name: 'About Us', href: '#about', icon: '🏢' },
                  { name: 'Trading Services', href: '#trading', icon: '🛒' },
                  { name: 'IT Services', href: '#it-services', icon: '💻' },
                  { name: 'Contact', href: '#contact', icon: '📞' }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '15px 20px',
                      color: '#1e293b',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: '500',
                      borderRadius: '10px',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.target.style.color = '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#1e293b';
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </nav>

              {/* CTA Button */}
              <div style={{
                marginTop: '30px',
                padding: '0 20px'
              }}>
                <a
                  href="#contact"
                  style={{
                    display: 'block',
                    background: 'linear-gradient(45deg, #ff6b35, #f97316)',
                    color: 'white',
                    padding: '15px 20px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
                    marginBottom: '15px'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </a>
                
                {/* Admin Button */}
                <a
                  href="/admin"
                  style={{
                    display: 'block',
                    background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔐 Admin Panel
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;