const TradingSection = ({ data }) => {
  return (
    <section id="trading" style={{
      padding: '120px 40px',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fdba74 100%)',
      color: '#1e293b',
      position: 'relative',
      overflow: 'visible',
      minHeight: '100vh'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.06) 0%, transparent 50%)
        `,
        opacity: 0.3
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
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '10px 24px',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '30px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
              <span>🛒</span>
            Comprehensive Trading Solutions
            </div>
            
          <h2 style={{
            fontSize: '2.8rem',
            fontWeight: '800',
            marginBottom: '25px',
            color: '#0f172a',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            Trading & Retail Solutions
            </h2>
            
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '50px',
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto 50px',
            lineHeight: '1.6'
          }}>
            Complete trading solutions covering all product categories through online and offline channels, wholesale and retail operations.
          </p>

          {/* CTA Button */}
          <a
            href="https://shop.sanjtiksha.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#0f172a',
              padding: '18px 36px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1.1rem',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🛒 Visit Our Shop
          </a>
        </div>

        {/* Trading Channels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '80px'
        }}>
          {[
            { 
              icon: '💻', 
              title: 'Online Trading', 
              desc: 'E-commerce platform with comprehensive product catalog',
              features: ['E-commerce Website', 'Online Catalog', 'Digital Payments', 'Order Management']
            },
            { 
              icon: '🏪', 
              title: 'Offline Trading', 
              desc: 'Physical stores and retail operations',
              features: ['Physical Stores', 'Retail Outlets', 'Showrooms', 'Customer Service']
            },
            { 
              icon: '📦', 
              title: 'Wholesale', 
              desc: 'Bulk trading and wholesale operations',
              features: ['Bulk Orders', 'Wholesale Pricing', 'Supply Chain', 'B2B Trading']
            },
            { 
              icon: '🛍️', 
              title: 'Retail', 
              desc: 'Direct consumer retail operations',
              features: ['Retail Stores', 'Consumer Sales', 'Customer Support', 'After Sales']
            }
          ].map((channel, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '40px 30px',
              borderRadius: '20px',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '0 8px 32px rgba(255, 107, 53, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-10px)';
              e.target.style.background = 'rgba(255, 255, 255, 0.95)';
              e.target.style.boxShadow = '0 15px 40px rgba(255, 107, 53, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.boxShadow = '0 8px 32px rgba(255, 107, 53, 0.15)';
            }}
            >
              <div style={{
                fontSize: '3.5rem',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {channel.icon}
                    </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#0f172a',
                textAlign: 'center'
              }}>
                {channel.title}
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                fontSize: '1rem',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {channel.desc}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center'
              }}>
                {channel.features.map((feature, idx) => (
                  <span key={idx} style={{
                    background: 'rgba(255, 107, 53, 0.1)',
                    color: '#0f172a',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    border: '1px solid rgba(255, 107, 53, 0.2)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    minHeight: '28px'
                  }}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Product Categories */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '60px 40px',
          borderRadius: '25px',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 107, 53, 0.2)',
          marginBottom: '60px',
          boxShadow: '0 8px 32px rgba(255, 107, 53, 0.15)'
        }}>
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '40px',
            color: '#0f172a',
            textAlign: 'center'
          }}>
            Product Categories
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '25px'
          }}>
            {[
              { icon: '🍽️', title: 'Kitchen Items', desc: 'Cookware & Utensils' },
              { icon: '🛒', title: 'Groceries', desc: 'Food & Beverages' },
              { icon: '💊', title: 'Medicines', desc: 'Healthcare Products' },
              { icon: '📱', title: 'Electronics', desc: 'Gadgets & Devices' },
              { icon: '⚡', title: 'Electricals', desc: 'Electrical Equipment' },
              { icon: '👕', title: 'Clothing', desc: 'Fashion & Apparel' },
              { icon: '👟', title: 'Footwear', desc: 'Shoes & Accessories' },
              { icon: '🧸', title: 'Toys', desc: 'Children Products' },
              { icon: '💄', title: 'Cosmetics', desc: 'Beauty & Personal Care' },
              { icon: '🔄', title: 'Plastics', desc: 'Plastic Products' },
              { icon: '📦', title: 'Packaging', desc: 'Packaging Materials' },
              { icon: '🏠', title: 'Household', desc: 'Home & Living' },
              { icon: '🎨', title: 'Art & Handicrafts', desc: 'Creative Products' }
            ].map((category, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '25px 15px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '15px',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(255, 107, 53, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 16px rgba(255, 107, 53, 0.1)';
              }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '15px'
                }}>
                  {category.icon}
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#0f172a'
                }}>
                  {category.title}
                </h4>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.9rem'
                }}>
                  {category.desc}
                </p>
              </div>
            ))}
          </div>
            </div>

        {/* Marketplace Presence */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '60px 40px',
          borderRadius: '25px',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 107, 53, 0.2)',
          marginBottom: '60px',
          boxShadow: '0 8px 32px rgba(255, 107, 53, 0.15)'
        }}>
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '40px',
            color: '#0f172a',
            textAlign: 'center'
          }}>
            Marketplace Presence
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {[
              { 
                icon: '🛒', 
                title: 'Amazon', 
                desc: 'Sell on Amazon marketplace',
                color: '#ff9900',
                features: ['FBA Services', 'Product Listing', 'Order Fulfillment', 'Customer Service']
              },
              { 
                icon: '🛍️', 
                title: 'Flipkart', 
                desc: 'Flipkart marketplace presence',
                color: '#2874f0',
                features: ['Seller Account', 'Product Catalog', 'Logistics', 'Marketing']
              },
              { 
                icon: '👗', 
                title: 'Meesho', 
                desc: 'Meesho social commerce',
                color: '#ff6b6b',
                features: ['Social Selling', 'Reseller Network', 'Commission Model', 'Growth Support']
              }
            ].map((marketplace, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '30px 25px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(255, 107, 53, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(255, 107, 53, 0.1)';
              }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '20px'
                }}>
                  {marketplace.icon}
                </div>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: '#0f172a'
                }}>
                  {marketplace.title}
                </h4>
                <p style={{
                  color: '#64748b',
                  marginBottom: '20px',
                  fontSize: '1rem'
                }}>
                  {marketplace.desc}
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {marketplace.features.map((feature, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(255, 107, 53, 0.1)',
                      color: '#0f172a',
                      padding: '8px 12px',
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      border: '1px solid rgba(255, 107, 53, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      minHeight: '32px'
                    }}>
                      {feature}
                    </div>
                  ))}
                </div>
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
              title: 'Product Assurance',
              desc: 'Rigorous quality control processes ensure only the best products reach our clients.',
              features: ['Verified Suppliers', 'Quality Inspections', 'Warranty Support', 'Product Guarantee'],
              icon: '🏆'
            },
            {
              title: 'Global Network',
              desc: 'Extensive network of suppliers and partners across multiple continents.',
              features: ['50+ Countries', '1000+ Suppliers', '24/7 Support', 'Global Logistics'],
              icon: '🌍'
            },
            {
              title: 'Competitive Pricing',
              desc: 'Best market rates through our bulk purchasing power and direct relationships.',
              features: ['Volume Discounts', 'Price Negotiation', 'Cost Optimization', 'Transparent Pricing'],
              icon: '💰'
            }
          ].map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '40px 30px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              textAlign: 'left',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(255, 107, 53, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
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
                color: '#0f172a'
              }}>
                {feature.title}
              </h4>
              <p style={{
                color: '#64748b',
                marginBottom: '20px',
                lineHeight: '1.6'
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
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
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
  );
};

export default TradingSection;