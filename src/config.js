// Configuration file for SanjTiksha website
export const config = {
  // Admin panel settings
  admin: {
    password: 'sanjtiksha2025', // In production, use environment variables
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  },
  
  // EmailJS configuration (replace with your actual values)
  emailjs: {
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY',
  },
  
  // External links
  links: {
    trading: 'https://shop.sanjtiksha.com',
    itservices: 'https://it.sanjtiksha.com',
    main: 'https://www.sanjtiksha.com',
  },
  
  // Social media links
  social: {
    linkedin: 'https://linkedin.com/company/sanjtiksha',
    twitter: 'https://twitter.com/sanjtiksha',
    facebook: 'https://facebook.com/sanjtiksha',
    instagram: 'https://instagram.com/sanjtiksha',
  },
  
  // Company information
  company: {
    name: 'SanjTiksha Roots & Wings',
    tagline: 'Where Commerce Meets Technology',
    email: 'info@sanjtiksha.com',
    phone: '+91 9876543210',
    address: 'Pune, Maharashtra, India',
  }
};
