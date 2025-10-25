const ITSection = ({ data }) => {
  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    <section id="it-services" style={{
      padding: '120px 40px',
      background: `
        linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%),
        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.04) 0%, transparent 70%)
      `,
      color: '#1e293b',
      textAlign: 'center',
      position: 'relative',
      overflow: 'visible',
      minHeight: '100vh'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(45deg, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
          linear-gradient(-45deg, rgba(16, 185, 129, 0.03) 0%, transparent 50%),
          linear-gradient(90deg, rgba(139, 92, 246, 0.02) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite'
      }}></div>

      {/* Floating Particles */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '4px',
        height: '4px',
        background: 'rgba(59, 130, 246, 0.6)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '6px',
        height: '6px',
        background: 'rgba(16, 185, 129, 0.6)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '20%',
        width: '3px',
        height: '3px',
        background: 'rgba(139, 92, 246, 0.6)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite'
      }}></div>

      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        width: '100%',
        overflow: 'visible'
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, #20b2aa, #0d9488)',
            padding: '12px 28px',
            borderRadius: '35px',
            fontSize: '0.95rem',
            fontWeight: '700',
            marginBottom: '35px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(32, 178, 170, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              animation: 'shimmer 3s infinite'
            }}></div>
            <span style={{ fontSize: '1.1rem' }}>💻</span>
            <span>Comprehensive IT Solutions</span>
          </div>

        <h2 style={{
          fontSize: '3.2rem',
          fontWeight: '900',
          marginBottom: '30px',
          color: '#0f172a',
          textShadow: '0 2px 10px rgba(0,0,0,0.1)',
          letterSpacing: '-0.02em',
          lineHeight: '1.1'
        }}>
          IT Services & Technology Solutions
        </h2>
          
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '50px',
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto 50px',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            Complete technology solutions covering software development, database management, IT consulting, hosting, digital marketing, and business consulting.
          </p>

          {/* CTA Button */}
          <a
            href="https://it.sanjtiksha.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '15px',
              background: 'linear-gradient(135deg, #20b2aa, #0d9488)',
              color: 'white',
              padding: '20px 40px',
              borderRadius: '15px',
              textDecoration: 'none',
              fontWeight: '800',
              fontSize: '1.2rem',
              border: '2px solid rgba(32, 178, 170, 0.5)',
              backdropFilter: 'blur(15px)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 20px 40px rgba(32, 178, 170, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #0d9488, #20b2aa)';
              e.target.style.transform = 'translateY(-5px) scale(1.05)';
              e.target.style.boxShadow = '0 25px 50px rgba(32, 178, 170, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #20b2aa, #0d9488)';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 20px 40px rgba(32, 178, 170, 0.5)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>💻</span>
            <span>Explore IT Services</span>
            <span style={{ 
              fontSize: '1.1rem',
              transition: 'transform 0.3s ease'
            }}>→</span>
          </a>
        </div>

        {/* Core IT Services */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '80px'
        }}>
          {[
            { 
              icon: '🌐', 
              title: 'Software Development', 
              desc: 'Custom software, web applications, and mobile apps',
              features: ['Web Development', 'Mobile Apps', 'Custom Software', 'API Development'],
              color: '#3b82f6'
            },
            { 
              icon: '🗄️', 
              title: 'Database Management', 
              desc: 'Database design, optimization, and management services',
              features: ['Database Design', 'Data Migration', 'Performance Tuning', 'Backup & Recovery'],
              color: '#3b82f6'
            },
            { 
              icon: '☁️', 
              title: 'Hosting & Infrastructure', 
              desc: 'Cloud hosting, server management, and infrastructure support',
              features: ['Cloud Hosting', 'Server Management', 'DevOps', 'Monitoring'],
              color: '#8b5cf6'
            },
            { 
              icon: '📈', 
              title: 'Digital Marketing', 
              desc: 'SEO, social media, and online marketing strategies',
              features: ['SEO Optimization', 'Social Media', 'PPC Campaigns', 'Analytics'],
              color: '#f59e0b'
            },
            { 
              icon: '💼', 
              title: 'IT Consulting', 
              desc: 'Strategic IT consulting and technology advisory',
              features: ['Technology Strategy', 'Digital Transformation', 'IT Audit', 'Process Optimization'],
              color: '#ff6b35'
            },
            { 
              icon: '🏢', 
              title: 'Business Consulting', 
              desc: 'Professional business consulting and advisory services',
              features: ['Business Strategy', 'Process Improvement', 'Change Management', 'Training'],
              color: '#20b2aa'
            }
          ].map((service, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '45px 35px',
              borderRadius: '25px',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(32, 178, 170, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(32, 178, 170, 0.15)'
            }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-15px) scale(1.02)';
      e.target.style.background = `linear-gradient(135deg, ${service.color}15, rgba(255, 255, 255, 0.95))`;
      e.target.style.border = `1px solid ${service.color}50`;
      e.target.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.2), 0 0 30px ${service.color}20`;
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0) scale(1)';
      e.target.style.background = 'rgba(255, 255, 255, 0.9)';
      e.target.style.border = '1px solid rgba(32, 178, 170, 0.2)';
      e.target.style.boxShadow = '0 8px 32px rgba(32, 178, 170, 0.15)';
    }}
            >
              <div style={{
                fontSize: '4rem',
                marginBottom: '25px',
                textAlign: 'center',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                transition: 'transform 0.3s ease'
              }}>
                {service.icon}
              </div>
              <h3 style={{
                fontSize: '1.6rem',
                fontWeight: '800',
                marginBottom: '18px',
                color: '#0f172a',
                textAlign: 'center',
                letterSpacing: '-0.01em',
                lineHeight: '1.2',
                background: 'rgba(32, 178, 170, 0.1)',
                padding: '12px 20px',
                borderRadius: '15px',
                border: '1px solid rgba(32, 178, 170, 0.2)',
                backdropFilter: 'blur(10px)',
                margin: '0 auto 18px',
                maxWidth: 'fit-content'
              }}>
                {service.title}
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                fontSize: '1rem',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {service.desc}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center'
              }}>
                {service.features.map((feature, idx) => (
      <span key={idx} style={{
        background: 'rgba(32, 178, 170, 0.15)',
        color: '#0f172a',
        padding: '8px 16px',
        borderRadius: '25px',
        fontSize: '0.85rem',
        fontWeight: '600',
        border: '1px solid rgba(32, 178, 170, 0.3)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2px',
        boxShadow: '0 2px 8px rgba(32, 178, 170, 0.1)',
        textAlign: 'center',
        minHeight: '32px'
      }}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
            </div>
            
        {/* Technical Expertise */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '70px 50px',
          borderRadius: '30px',
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(32, 178, 170, 0.2)',
          marginBottom: '70px',
          boxShadow: '0 20px 60px rgba(32, 178, 170, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '40px',
            color: '#1e293b',
            textAlign: 'center'
          }}>
            Technical Expertise
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '25px'
          }}>
            {[
              { icon: '⚛️', title: 'React/Next.js', desc: 'Frontend Development' },
              { icon: '🟢', title: 'Node.js', desc: 'Backend Development' },
              { icon: '🐘', title: 'PostgreSQL', desc: 'Database Management' },
              { icon: '🐳', title: 'Docker', desc: 'Containerization' },
              { icon: '☁️', title: 'AWS/Azure', desc: 'Cloud Services' },
              { icon: '📱', title: 'Mobile Apps', desc: 'iOS/Android' },
              { icon: '🔒', title: 'Security', desc: 'Cybersecurity' },
              { icon: '📊', title: 'Analytics', desc: 'Data Analysis' },
              { icon: '🤖', title: 'AI/ML', desc: 'Artificial Intelligence' },
              { icon: '🔧', title: 'DevOps', desc: 'Development Operations' },
              { icon: '🌐', title: 'Web APIs', desc: 'API Development' },
              { icon: '💾', title: 'Data Science', desc: 'Data Analytics' }
            ].map((tech, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '30px 20px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '20px',
                border: '1px solid rgba(32, 178, 170, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(32, 178, 170, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(32, 178, 170, 0.15)';
                e.target.style.transform = 'scale(1.08) translateY(-5px)';
                e.target.style.border = '1px solid rgba(32, 178, 170, 0.4)';
                e.target.style.boxShadow = '0 15px 40px rgba(32, 178, 170, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.transform = 'scale(1) translateY(0)';
                e.target.style.border = '1px solid rgba(32, 178, 170, 0.2)';
                e.target.style.boxShadow = '0 8px 32px rgba(32, 178, 170, 0.1)';
              }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '15px'
                }}>
                  {tech.icon}
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#1e293b'
                }}>
                  {tech.title}
                </h4>
                <p style={{
                  color: '#1e293b',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
            </div>
            
        {/* Development Process */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '60px 40px',
          borderRadius: '25px',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(32, 178, 170, 0.2)',
          marginBottom: '60px',
          boxShadow: '0 15px 50px rgba(32, 178, 170, 0.15)'
        }}>
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '40px',
            color: '#1e293b',
            textAlign: 'center'
          }}>
            Our Development Process
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                title: 'Custom Development',
                desc: 'Tailored solutions built specifically for your business needs and requirements.',
                features: ['Requirement Analysis', 'Custom Architecture', 'Scalable Solutions', 'Performance Optimization'],
                icon: '🛠️'
              },
              {
                title: 'Modern Technologies',
                desc: 'Using the latest frameworks and tools to ensure optimal performance and security.',
                features: ['Latest Frameworks', 'Best Practices', 'Future-proof Code', 'Security First'],
                icon: '🚀'
              },
              {
                title: 'Ongoing Support',
                desc: 'Comprehensive maintenance and support to keep your systems running smoothly.',
                features: ['24/7 Monitoring', 'Regular Updates', 'Technical Support', 'Performance Optimization'],
                icon: '🛡️'
              }
            ].map((process, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '30px 25px',
                borderRadius: '20px',
                border: '1px solid rgba(32, 178, 170, 0.2)',
                textAlign: 'left',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(32, 178, 170, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(32, 178, 170, 0.15)';
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.border = '1px solid rgba(32, 178, 170, 0.4)';
                e.target.style.boxShadow = '0 15px 40px rgba(32, 178, 170, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.border = '1px solid rgba(32, 178, 170, 0.2)';
                e.target.style.boxShadow = '0 8px 32px rgba(32, 178, 170, 0.1)';
              }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  {process.icon}
                      </div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#1e293b',
                  textAlign: 'center'
                }}>
                  {process.title}
                </h4>
                <p style={{
                  color: '#1e293b',
                  marginBottom: '20px',
                  lineHeight: '1.6',
                  textAlign: 'center',
                  fontWeight: '500'
                }}>
                  {process.desc}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {process.features.map((item, idx) => (
                    <li key={idx} style={{
                      padding: '8px 0',
                      color: '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontWeight: '500'
                    }}>
                      <span style={{ color: '#10b981' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '40px'
        }}>
          {[
            {
              title: 'End-to-End Solutions',
              desc: 'Complete technology solutions from concept to deployment and ongoing support.',
              features: ['Full Stack Development', 'Database Design', 'Cloud Deployment', '24/7 Support'],
              icon: '🔄'
            },
            {
              title: 'Scalable Architecture',
              desc: 'Building solutions that grow with your business and handle increasing demands.',
              features: ['Microservices', 'Cloud Native', 'Auto Scaling', 'Performance Optimization'],
              icon: '📈'
            },
            {
              title: 'Security First',
              desc: 'Implementing robust security measures to protect your data and applications.',
              features: ['Data Encryption', 'Access Control', 'Security Audits', 'Compliance'],
              icon: '🔒'
            }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '40px 30px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(32, 178, 170, 0.2)',
              textAlign: 'left',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(32, 178, 170, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.background = 'rgba(32, 178, 170, 0.15)';
              e.target.style.border = '1px solid rgba(32, 178, 170, 0.4)';
              e.target.style.boxShadow = '0 15px 40px rgba(32, 178, 170, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.border = '1px solid rgba(32, 178, 170, 0.2)';
              e.target.style.boxShadow = '0 8px 32px rgba(32, 178, 170, 0.15)';
            }}
            >
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#1e293b'
              }}>
                {feature.title}
              </h4>
              <p style={{
                color: '#1e293b',
                marginBottom: '20px',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                {feature.desc}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {feature.features.map((item, idx) => (
                    <li key={idx} style={{
                      padding: '8px 0',
                      color: '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontWeight: '500'
                    }}>
                      <span style={{ color: '#10b981' }}>✓</span>
                      {item}
                    </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default ITSection;