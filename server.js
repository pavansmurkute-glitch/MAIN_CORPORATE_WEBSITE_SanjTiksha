import express from 'express';
import cors from 'cors';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Session storage (in production, use Redis or a proper session store)
const sessions = new Map();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(express.static('public'));

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const session = sessions.get(token);
  
  if (!session || !session.isAuthenticated) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
  
  // Check if session is expired (24 hours)
  const now = new Date();
  const sessionAge = now - new Date(session.createdAt);
  const hoursDiff = sessionAge / (1000 * 60 * 60);
  
  if (hoursDiff > 24) {
    sessions.delete(token);
    return res.status(401).json({ error: 'Session expired' });
  }
  
  req.session = session;
  next();
};

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Default admin credentials (in production, use a database with hashed passwords)
    const ADMIN_CREDENTIALS = {
      username: 'admin',
      password: 'sanjtiksha2024'
    };
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Generate session token
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Store session
      sessions.set(token, {
        isAuthenticated: true,
        createdAt: new Date().toISOString(),
        username: username
      });
      
      res.json({ 
        success: true, 
        token: token,
        message: 'Login successful' 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to process login' });
  }
});

// Admin logout endpoint
app.post('/api/admin/logout', authenticateAdmin, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  sessions.delete(token);
  res.json({ success: true, message: 'Logout successful' });
});

// Check authentication status
app.get('/api/admin/check-auth', authenticateAdmin, (req, res) => {
  res.json({ 
    success: true, 
    authenticated: true,
    username: req.session.username 
  });
});

// Admin API Routes
const adminDataPath = path.join(__dirname, 'src', 'data', 'adminData.json');
const websiteDataPath = path.join(__dirname, 'src', 'data', 'websiteData.json');

// Get all admin data
app.get('/api/admin/data', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading admin data:', error);
    res.status(500).json({ error: 'Failed to read admin data' });
  }
});

// Update admin data
app.put('/api/admin/data', authenticateAdmin, async (req, res) => {
  try {
    await fs.writeFile(adminDataPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating admin data:', error);
    res.status(500).json({ error: 'Failed to update admin data' });
  }
});

// Website Data API Routes
app.get('/api/admin/website-data', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(websiteDataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading website data:', error);
    res.status(500).json({ error: 'Failed to read website data' });
  }
});

app.put('/api/admin/website-data', authenticateAdmin, async (req, res) => {
  try {
    await fs.writeFile(websiteDataPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Website data updated successfully' });
  } catch (error) {
    console.error('Error updating website data:', error);
    res.status(500).json({ error: 'Failed to update website data' });
  }
});

// Contact Information Routes
app.get('/api/admin/contact', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    res.json(adminData.contact);
  } catch (error) {
    console.error('Error reading contact data:', error);
    res.status(500).json({ error: 'Failed to read contact data' });
  }
});

// Testimonials Routes
app.get('/api/admin/testimonials', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    res.json(adminData.testimonials);
  } catch (error) {
    console.error('Error reading testimonials:', error);
    res.status(500).json({ error: 'Failed to read testimonials' });
  }
});

app.post('/api/admin/testimonials', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    const newTestimonial = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    adminData.testimonials.push(newTestimonial);
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json(newTestimonial);
  } catch (error) {
    console.error('Error adding testimonial:', error);
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
});

app.put('/api/admin/testimonials/:id', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    const index = adminData.testimonials.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
      adminData.testimonials[index] = { ...adminData.testimonials[index], ...req.body };
      await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
      res.json(adminData.testimonials[index]);
    } else {
      res.status(404).json({ error: 'Testimonial not found' });
    }
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

app.delete('/api/admin/testimonials/:id', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    adminData.testimonials = adminData.testimonials.filter(t => t.id !== parseInt(req.params.id));
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// Product Categories Routes
app.get('/api/admin/product-categories', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    res.json(adminData.productCategories);
  } catch (error) {
    console.error('Error reading product categories:', error);
    res.status(500).json({ error: 'Failed to read product categories' });
  }
});

app.post('/api/admin/product-categories', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    const newCategory = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    adminData.productCategories.push(newCategory);
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json(newCategory);
  } catch (error) {
    console.error('Error adding product category:', error);
    res.status(500).json({ error: 'Failed to add product category' });
  }
});

app.put('/api/admin/product-categories/:id', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    const index = adminData.productCategories.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
      adminData.productCategories[index] = { ...adminData.productCategories[index], ...req.body };
      await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
      res.json(adminData.productCategories[index]);
    } else {
      res.status(404).json({ error: 'Product category not found' });
    }
  } catch (error) {
    console.error('Error updating product category:', error);
    res.status(500).json({ error: 'Failed to update product category' });
  }
});

app.delete('/api/admin/product-categories/:id', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    adminData.productCategories = adminData.productCategories.filter(c => c.id !== parseInt(req.params.id));
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting product category:', error);
    res.status(500).json({ error: 'Failed to delete product category' });
  }
});

// Marketplace Presence Routes
app.get('/api/admin/marketplace-presence', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    res.json(adminData.marketplacePresence);
  } catch (error) {
    console.error('Error reading marketplace presence:', error);
    res.status(500).json({ error: 'Failed to read marketplace presence' });
  }
});

app.post('/api/admin/marketplace-presence', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    const newMarketplace = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    adminData.marketplacePresence.push(newMarketplace);
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json(newMarketplace);
  } catch (error) {
    console.error('Error adding marketplace presence:', error);
    res.status(500).json({ error: 'Failed to add marketplace presence' });
  }
});

app.put('/api/admin/marketplace-presence/:id', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    const index = adminData.marketplacePresence.findIndex(m => m.id === parseInt(req.params.id));
    if (index !== -1) {
      adminData.marketplacePresence[index] = { ...adminData.marketplacePresence[index], ...req.body };
      await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
      res.json(adminData.marketplacePresence[index]);
    } else {
      res.status(404).json({ error: 'Marketplace presence not found' });
    }
  } catch (error) {
    console.error('Error updating marketplace presence:', error);
    res.status(500).json({ error: 'Failed to update marketplace presence' });
  }
});

app.delete('/api/admin/marketplace-presence/:id', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    adminData.marketplacePresence = adminData.marketplacePresence.filter(m => m.id !== parseInt(req.params.id));
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting marketplace presence:', error);
    res.status(500).json({ error: 'Failed to delete marketplace presence' });
  }
});

// Technical Expertise Routes
app.get('/api/admin/technical-expertise', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    res.json(adminData.technicalExpertise);
  } catch (error) {
    console.error('Error reading technical expertise:', error);
    res.status(500).json({ error: 'Failed to read technical expertise' });
  }
});

app.post('/api/admin/technical-expertise', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    const newExpertise = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    adminData.technicalExpertise.push(newExpertise);
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json(newExpertise);
  } catch (error) {
    console.error('Error adding technical expertise:', error);
    res.status(500).json({ error: 'Failed to add technical expertise' });
  }
});

app.put('/api/admin/technical-expertise/:id', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    const index = adminData.technicalExpertise.findIndex(e => e.id === parseInt(req.params.id));
    if (index !== -1) {
      adminData.technicalExpertise[index] = { ...adminData.technicalExpertise[index], ...req.body };
      await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
      res.json(adminData.technicalExpertise[index]);
    } else {
      res.status(404).json({ error: 'Technical expertise not found' });
    }
  } catch (error) {
    console.error('Error updating technical expertise:', error);
    res.status(500).json({ error: 'Failed to update technical expertise' });
  }
});

app.delete('/api/admin/technical-expertise/:id', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    adminData.technicalExpertise = adminData.technicalExpertise.filter(e => e.id !== parseInt(req.params.id));
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting technical expertise:', error);
    res.status(500).json({ error: 'Failed to delete technical expertise' });
  }
});

// Messages Routes
app.get('/api/admin/messages', authenticateAdmin, async (req, res) => {
  try {
    const messagesPath = path.join(__dirname, 'src', 'data', 'messages.json');
    
    // Try to read from messages.json first
    try {
      const data = await fs.readFile(messagesPath, 'utf8');
      const messages = JSON.parse(data);
      res.json(messages);
      return;
    } catch (error) {
      console.log('Messages.json not found, trying adminData.json');
    }
    
    // Fallback to adminData.json
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    res.json(adminData.messages || []);
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({ error: 'Failed to read messages' });
  }
});

app.post('/api/admin/messages', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    const newMessage = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    adminData.messages.push(newMessage);
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json(newMessage);
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// Footer Contact Routes
app.get('/api/admin/footer-contact', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    res.json(adminData.footerContact);
  } catch (error) {
    console.error('Error reading footer contact:', error);
    res.status(500).json({ error: 'Failed to read footer contact' });
  }
});

app.put('/api/admin/footer-contact', authenticateAdmin, async (req, res) => {
  try {
    const data = await fs.readFile(adminDataPath, 'utf8');
    const adminData = JSON.parse(data);
    adminData.footerContact = { ...adminData.footerContact, ...req.body };
    await fs.writeFile(adminDataPath, JSON.stringify(adminData, null, 2));
    res.json(adminData.footerContact);
  } catch (error) {
    console.error('Error updating footer contact:', error);
    res.status(500).json({ error: 'Failed to update footer contact' });
  }
});

// Update actual website files - Contact
app.put('/api/admin/contact', authenticateAdmin, async (req, res) => {
  try {
    const contactFilePath = path.join(__dirname, 'src', 'data', 'contact.json');
    await fs.writeFile(contactFilePath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Contact data updated successfully' });
  } catch (error) {
    console.error('Error updating contact data:', error);
    res.status(500).json({ error: 'Failed to update contact data' });
  }
});

app.put('/api/admin/testimonials', authenticateAdmin, async (req, res) => {
  try {
    const testimonialsFilePath = path.join(__dirname, 'src', 'data', 'testimonials.json');
    await fs.writeFile(testimonialsFilePath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Testimonials data updated successfully' });
  } catch (error) {
    console.error('Error updating testimonials data:', error);
    res.status(500).json({ error: 'Failed to update testimonials data' });
  }
});

// Contact Form Submission (for public use)
app.post('/api/contact', async (req, res) => {
  try {
    const messagesPath = path.join(__dirname, 'src', 'data', 'messages.json');
    
    // Read existing messages
    let messages = [];
    try {
      const data = await fs.readFile(messagesPath, 'utf8');
      messages = JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, start with empty array
      if (process.env.NODE_ENV !== 'production') {
        console.log('Messages file not found, creating new one');
      }
    }
    
    // Create new message with timestamp
    const newMessage = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    
    // Add to messages array
    messages.push(newMessage);
    
    // Save to messages.json file
    await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2));
    
    // Also save to adminData.json for backward compatibility
    try {
      const adminData = await fs.readFile(adminDataPath, 'utf8');
      const adminDataObj = JSON.parse(adminData);
      if (!adminDataObj.messages) {
        adminDataObj.messages = [];
      }
      adminDataObj.messages.push(newMessage);
      await fs.writeFile(adminDataPath, JSON.stringify(adminDataObj, null, 2));
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Could not save to adminData.json:', error);
      }
    }
    
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to submit message' });
  }
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin panel available at: http://localhost:${PORT}/admin`);
});
