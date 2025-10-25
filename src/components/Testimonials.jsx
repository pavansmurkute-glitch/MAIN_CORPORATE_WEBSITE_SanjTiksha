const Testimonials = ({ data }) => {
  return (
    <section style={{
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e6f3ff 50%, #f0f8ff 100%)',
      color: '#1e293b',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          What Our Clients Say
        </h2>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '60px',
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto 60px'
        }}>
          Don't just take our word for it. Here's what our satisfied clients have to say about our services.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {[
            { 
              name: 'Rajesh Manjarekar', 
              company: 'Ajay Sea Foods',
              text: 'SanjTiksha transformed our business operations with their innovative solutions. The team is professional, reliable, and delivers exceptional results.',
              rating: 5
            },
            { 
              name: 'Vikram Jadhav', 
              company: 'Devraj Enterprises',
              text: 'Outstanding service and support. They helped us streamline our supply chain and increase efficiency by 40%. Highly recommended!',
              rating: 5
            },
            { 
              name: 'Mandar Kulkarni', 
              company: 'Digital Solutions Ltd.',
              text: 'The custom software they developed for us exceeded all expectations. Their technical expertise and attention to detail is remarkable.',
              rating: 5
            }
          ].map((testimonial, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '40px 30px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              textAlign: 'left',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: '#f59e0b'
              }}>
                {'★'.repeat(testimonial.rating)}
              </div>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontStyle: 'italic',
                color: '#374151'
              }}>
                "{testimonial.text}"
              </p>
              <div>
                <div style={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  marginBottom: '5px',
                  color: '#1e293b'
                }}>
                  {testimonial.name}
                </div>
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.9rem'
                }}>
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;