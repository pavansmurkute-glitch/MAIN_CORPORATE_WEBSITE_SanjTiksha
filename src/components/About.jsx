const About = ({ data }) => {
  return (
    <section id="about" style={{
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      minHeight: 'auto',
      overflow: 'visible'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        overflow: 'visible'
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, #ff6b35, #f97316)',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: '700',
            marginBottom: '30px',
            boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)'
          }}>
            <span>🏢</span>
            About Our Company
          </div>

          <div style={{
            textAlign: 'center',
            marginBottom: '25px'
          }}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '800',
              marginBottom: '8px',
              lineHeight: '1.1'
            }}>
              <span style={{ color: '#ff6b35' }}>SANJ</span>
              <span style={{ color: '#20b2aa' }}>TIKSHA</span>
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              fontWeight: '400',
              letterSpacing: '0.5px'
            }}>
              Roots and Wings
            </p>
          </div>

          <p style={{
            fontSize: '1rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            A global leader in integrated commerce and technology solutions, delivering excellence across every touchpoint with unmatched quality and innovation.
          </p>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'start',
          marginBottom: '50px'
        }}>
          {/* Left Content */}
          <div>
            {/* Achievement Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {[
                { 
                  icon: '🏆', 
                  title: 'Professional Standards', 
                  desc: 'Service Excellence',
                  color: '#3b82f6'
                },
                { 
                  icon: '🌍', 
                  title: 'Global Reach', 
                  desc: '50+ Countries',
                  color: '#10b981'
                },
                { 
                  icon: '👥', 
                  title: 'Expert Team', 
                  desc: '150+ Professionals',
                  color: '#8b5cf6'
                },
                { 
                  icon: '⚡', 
                  title: 'Fast Delivery', 
                  desc: '24/7 Support',
                  color: '#f59e0b'
                }
              ].map((achievement, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '20px 15px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                }}
                >
                  <div style={{
                    width: '45px',
                    height: '45px',
                    background: `rgba(${achievement.color === '#3b82f6' ? '59, 130, 246' : achievement.color === '#10b981' ? '16, 185, 129' : achievement.color === '#8b5cf6' ? '139, 92, 246' : '245, 158, 11'}, 0.1)`,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem'
                  }}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '3px'
                    }}>
                      {achievement.title}
                    </h4>
                    <p style={{
                      fontSize: '0.85rem',
                      color: '#64748b',
                      fontWeight: '500'
                    }}>
                      {achievement.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #20b2aa, #0d9488)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '0.9rem',
                boxShadow: '0 8px 20px rgba(32, 178, 170, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 35px rgba(32, 178, 170, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 20px rgba(32, 178, 170, 0.3)';
              }}
            >
              Learn More →
            </a>
          </div>

          {/* Right Visual Content */}
          <div style={{
            position: 'relative',
            minHeight: '500px'
          }}>
            {/* Main Visual Card */}
            <div style={{
              width: '100%',
              minHeight: '450px',
              background: 'linear-gradient(135deg, #1e293b, #334155)',
              borderRadius: '18px',
              padding: '30px',
              color: 'white',
              position: 'relative',
              overflow: 'visible',
              boxShadow: '0 20px 40px rgba(30, 41, 59, 0.2)'
            }}>
              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
                `,
                opacity: 0.5
              }}></div>

              <div style={{
                position: 'relative',
                zIndex: 2,
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '25px'
              }}>
                {/* Company Stats */}
                <div>
                  <h3 style={{
                    fontSize: '1.6rem',
                    fontWeight: '800',
                    marginBottom: '20px'
                  }}>
                    Our Global Impact
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '15px'
                  }}>
                    {[
                      { number: '500+', label: 'Global Clients' },
                      { number: '1000+', label: 'Projects' },
                      { number: '50+', label: 'Countries' },
                      { number: '5+', label: 'Years' }
                    ].map((stat, index) => (
                      <div key={index} style={{
                        textAlign: 'center',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '900',
                          marginBottom: '3px',
                          color: 'white'
                        }}>
                          {stat.number}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          opacity: 0.8,
                          fontWeight: '600'
                        }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mission & Vision */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  marginTop: '15px'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '15px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      🎯 Our Mission
                    </h4>
                    <p style={{
                      fontSize: '0.85rem',
                      opacity: 0.9,
                      lineHeight: '1.4'
                    }}>
                      To empower businesses worldwide with exceptional trading solutions and innovative technology services.
                    </p>
                  </div>

                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '15px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      👁️ Our Vision
                    </h4>
                    <p style={{
                      fontSize: '0.85rem',
                      opacity: 0.9,
                      lineHeight: '1.4'
                    }}>
                      To become the global leader in integrated commerce and technology solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '-20px',
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: '0 15px 30px rgba(59, 130, 246, 0.3)'
            }}>
              🚀
              </div>

            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '-20px',
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
            }}>
              💡
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div style={{
          background: 'white',
          padding: '40px 30px',
          borderRadius: '18px',
          boxShadow: '0 15px 30px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: '900',
            marginBottom: '35px',
            color: '#1e293b',
            textAlign: 'center'
          }}>
            Our Core Values
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px'
          }}>
            {[
              { 
                icon: '⭐', 
                title: 'Innovation in Execution', 
                desc: 'We deliver results that exceed expectations every time, setting new standards for quality and performance.'
              },
              { 
                icon: '🤝', 
                title: 'Client-Centric Approach', 
                desc: 'Your success is our success, and we\'re committed to your growth with personalized solutions and dedicated support.'
              },
              { 
                icon: '🚀', 
                title: 'Innovation & Adaptability', 
                desc: 'We stay ahead of trends to provide cutting-edge solutions that keep you competitive in an ever-evolving marketplace.'
              },
              { 
                icon: '💎', 
                title: 'Integrity & Trust', 
                desc: 'We build lasting partnerships through transparent, honest practices and unwavering commitment to ethical business conduct.'
              }
            ].map((value, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '25px 20px',
                background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '15px'
                }}>
                  {value.icon}
                    </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#1e293b'
                }}>
                  {value.title}
                </h4>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {value.desc}
                </p>
              </div>
                ))}
              </div>
        </div>
      </div>
    </section>
  );
};

export default About;