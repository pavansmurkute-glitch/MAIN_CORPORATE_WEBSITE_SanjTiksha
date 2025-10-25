import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    '/images/hero-bg.jpg',
    '/images/hero2.jpg',
    '/images/hero3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
      backgroundImage: `url("${heroImages[currentSlide]}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dark Overlay for Text Readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(30, 41, 59, 0.5)',
        zIndex: 1
      }}></div>

      {/* Modern Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)
        `,
        opacity: 0.6,
        zIndex: 2
      }}></div>

      {/* Subtle Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        opacity: 0.4
      }}></div>

      <div 
        className="hero-grid"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 3,
          minHeight: '100vh'
        }}>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Business Registration Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '10px 20px',
              borderRadius: '30px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '30px'
            }}
          >
            <div style={{
              width: '6px',
              height: '6px',
              background: '#10b981',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            <span style={{
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              UDYAM-MH-26-0974706
            </span>
          </motion.div>

          {/* Main Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}
          >
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '900',
              lineHeight: '1.1',
              marginBottom: '15px',
              letterSpacing: '-0.02em'
            }}>
              <span style={{ color: '#ff6b35' }}>SANJ</span>
              <span style={{ color: '#20b2aa' }}>TIKSHA</span>
            </h1>
            
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '400',
              color: '#cbd5e1',
              marginBottom: '10px',
              letterSpacing: '0.5px'
            }}>
              Roots and Wings
            </h2>
            
            <p style={{
              fontSize: '1rem',
              fontWeight: '300',
              color: '#94a3b8',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              ROOTED IN VISION, FLYING BEYOND LIMITS
            </p>
          </motion.div>

          {/* Professional Tagline */}
        <motion.p
            initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: '1.25rem',
              color: '#cbd5e1',
              marginBottom: '30px',
              fontWeight: '500',
              lineHeight: '1.5'
            }}
          >
            Global Leader in Trading & Technology Solutions
        </motion.p>

          {/* Professional Description */}
        <motion.p
            initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontSize: '1rem',
              color: '#94a3b8',
              marginBottom: '50px',
              lineHeight: '1.6',
              maxWidth: '500px'
            }}
          >
            Empowering enterprises worldwide with comprehensive trading solutions and cutting-edge technology services. We deliver excellence across every touchpoint with unmatched quality and innovation.
        </motion.p>

          {/* Professional CTA Buttons */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}
          >
              <motion.a
              href="https://shop.sanjtiksha.com"
                target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1rem',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              📊 Explore Trading Solutions
              </motion.a>

            <motion.a
              href="https://it.sanjtiksha.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '1rem',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              💻 Discover IT Services
            </motion.a>
        </motion.div>

          {/* Professional Stats */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '30px'
            }}
          >
            {[
              { number: '500+', label: 'Global Clients' },
              { number: '1000+', label: 'Projects' },
              { number: '5+', label: 'Years' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                style={{
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: '900',
                  color: 'white',
                  marginBottom: '5px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#94a3b8',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Visual Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: 'relative',
            minHeight: '700px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 0'
          }}
        >
          {/* Main Visual Card */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: '450px',
              minHeight: '600px',
              background: 'rgba(45, 55, 72, 0.4)',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '50px 40px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'visible'
            }}
          >

            <div style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              width: '100%'
            }}>

              {/* Content */}
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'white',
                marginBottom: '15px'
              }}>
                Innovation in Every Solution
              </h3>
              
              <p style={{
                color: '#cbd5e1',
                textAlign: 'center',
                lineHeight: '1.5',
                marginBottom: '30px',
                fontSize: '1rem'
              }}>
                Delivering world-class trading and technology solutions with unmatched quality, innovation, and reliability.
              </p>

              {/* Feature List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                width: '100%'
              }}>
                {[
                  { icon: '✓', text: 'Professional Project Management', color: '#10b981' },
                  { icon: '✓', text: 'Global Network & Partnerships', color: '#3b82f6' },
                  { icon: '✓', text: '24/7 Premium Support', color: '#8b5cf6' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '12px 20px',
                      borderRadius: '25px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <span style={{ 
                      color: feature.color, 
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}>
                      {feature.icon}
                    </span>
                    <span style={{ 
                      color: 'white', 
                      fontSize: '0.9rem', 
                      fontWeight: '600'
                    }}>
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
              </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: '60px',
              right: '40px',
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: '0 15px 30px rgba(59, 130, 246, 0.3)'
            }}
          >
            🚀
        </motion.div>

        <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '30px',
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
            }}
          >
            💻
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 10
      }}>
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: '2px solid white',
              background: currentSlide === index ? 'white' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        ‹
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
        }}
      >
        ›
      </button>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          color: 'white',
          cursor: 'pointer',
          zIndex: 10
        }}
        onClick={() => {
          const aboutSection = document.querySelector('#about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div style={{
          width: '2px',
          height: '30px',
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '1px'
        }}></div>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: '500',
          opacity: 0.7
        }}>
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;