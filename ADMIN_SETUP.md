# Admin Panel Setup Guide

## Overview
This admin panel allows you to manage all website content including contact information, testimonials, product categories, marketplace presence, technical expertise, messages, and footer contact information.

## Features

### 📞 Contact Information Management
- Update company address, email, and phone
- Modify business hours
- Real-time updates to the contact section

### 💬 Testimonials Management
- Add new customer testimonials
- Edit existing testimonials
- Delete testimonials
- Star rating system (1-5 stars)
- Company and customer name tracking

### 📦 Product Categories Management
- Add new product categories
- Edit category details (name, description, icon)
- Delete categories
- Organize products by type

### 🏪 Marketplace Presence Management
- Add marketplace listings (Amazon, Flipkart, etc.)
- Update marketplace URLs and descriptions
- Track where your products are available
- Add marketplace icons

### ⚙️ Technical Expertise Management
- Add technical skills and technologies
- Categorize expertise (Frontend, Backend, Database)
- Update skill descriptions
- Organize by technology type

### 📧 Messages Management
- View all contact form submissions
- See customer inquiries and details
- Track message timestamps
- Monitor customer interest

### 🔗 Footer Contact Management
- Update footer contact information
- Maintain consistency across the site
- Separate from main contact section

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Server Dependencies
```bash
npm install express cors
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Start the Backend Server (in another terminal)
```bash
npm run server
```

### 5. Access the Admin Panel
Navigate to: `http://localhost:5173/admin`

## Data Storage

### Local Development
- Data is stored in `src/data/adminData.json`
- Changes are saved to localStorage for immediate testing
- Server endpoints handle JSON file operations

### Production Deployment
- Update server endpoints to use a real database
- Replace localStorage with actual API calls
- Implement authentication for admin access

## API Endpoints

### Contact Information
- `GET /api/admin/contact` - Get contact info
- `PUT /api/admin/contact` - Update contact info

### Testimonials
- `GET /api/admin/testimonials` - Get all testimonials
- `POST /api/admin/testimonials` - Add new testimonial
- `PUT /api/admin/testimonials/:id` - Update testimonial
- `DELETE /api/admin/testimonials/:id` - Delete testimonial

### Product Categories
- `GET /api/admin/product-categories` - Get all categories
- `POST /api/admin/product-categories` - Add new category
- `PUT /api/admin/product-categories/:id` - Update category
- `DELETE /api/admin/product-categories/:id` - Delete category

### Marketplace Presence
- `GET /api/admin/marketplace-presence` - Get all marketplaces
- `POST /api/admin/marketplace-presence` - Add new marketplace
- `PUT /api/admin/marketplace-presence/:id` - Update marketplace
- `DELETE /api/admin/marketplace-presence/:id` - Delete marketplace

### Technical Expertise
- `GET /api/admin/technical-expertise` - Get all expertise
- `POST /api/admin/technical-expertise` - Add new expertise
- `PUT /api/admin/technical-expertise/:id` - Update expertise
- `DELETE /api/admin/technical-expertise/:id` - Delete expertise

### Messages
- `GET /api/admin/messages` - Get all messages
- `POST /api/admin/messages` - Add new message
- `POST /api/contact` - Public contact form submission

### Footer Contact
- `GET /api/admin/footer-contact` - Get footer contact info
- `PUT /api/admin/footer-contact` - Update footer contact info

## Usage Guide

### Adding Content
1. Navigate to the desired section in the admin panel
2. Click "Add [Item Type]" button
3. Fill in the required information
4. Click "Add [Item Type]" to save

### Editing Content
1. Find the item you want to edit
2. Click the "Edit" button
3. Modify the information
4. Click "Update [Item Type]" to save changes

### Deleting Content
1. Find the item you want to delete
2. Click the "Delete" button
3. Confirm the deletion

## Data Structure

### Testimonial Object
```json
{
  "id": 1,
  "name": "Customer Name",
  "company": "Company Name",
  "testimonial": "Customer feedback text",
  "rating": 5,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Product Category Object
```json
{
  "id": 1,
  "name": "Category Name",
  "description": "Category description",
  "icon": "📱",
  "features": ["Feature 1", "Feature 2"],
  "createdAt": "2024-01-10T09:00:00Z"
}
```

### Marketplace Presence Object
```json
{
  "id": 1,
  "name": "Marketplace Name",
  "url": "https://marketplace.com/store",
  "description": "Marketplace description",
  "icon": "🛒",
  "createdAt": "2024-01-08T08:00:00Z"
}
```

### Technical Expertise Object
```json
{
  "id": 1,
  "name": "Technology Name",
  "description": "Technology description",
  "icon": "⚛️",
  "category": "Frontend",
  "createdAt": "2024-01-05T07:00:00Z"
}
```

### Message Object
```json
{
  "id": 1,
  "name": "Sender Name",
  "email": "sender@example.com",
  "phone": "+91 98765 43210",
  "company": "Company Name",
  "service": "Service Interest",
  "message": "Message content",
  "createdAt": "2024-01-25T16:20:00Z"
}
```

## Security Considerations

### For Production Use
1. **Authentication**: Implement login system for admin access
2. **Authorization**: Restrict access to admin functions
3. **Input Validation**: Validate all form inputs
4. **Rate Limiting**: Prevent spam and abuse
5. **HTTPS**: Use secure connections
6. **Database**: Replace JSON files with proper database

### Recommended Security Measures
- JWT token authentication
- Role-based access control
- Input sanitization
- CSRF protection
- SQL injection prevention
- XSS protection

## Troubleshooting

### Common Issues
1. **Data not saving**: Check if server is running
2. **CORS errors**: Ensure CORS is properly configured
3. **File permissions**: Check JSON file write permissions
4. **Port conflicts**: Ensure ports 3001 and 5173 are available

### Debug Steps
1. Check browser console for errors
2. Verify server is running on port 3001
3. Check network tab for API call failures
4. Verify JSON file permissions

## Future Enhancements

### Planned Features
- User authentication system
- Role-based permissions
- Bulk operations (import/export)
- Content versioning
- Audit logs
- Email notifications
- Advanced search and filtering
- Content scheduling
- Multi-language support

### Integration Options
- Database integration (MongoDB, PostgreSQL)
- Cloud storage (AWS S3, Google Cloud)
- Email services (SendGrid, Mailgun)
- Analytics integration
- Backup and restore functionality
