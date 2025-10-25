# SanjTiksha Roots & Wings - Main Corporate Website

A modern, responsive React website for SanjTiksha Roots & Wings, showcasing both Trading & Retail and IT Services divisions.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **JSON-Based Content**: Easy content management through JSON files
- **Admin Panel**: Password-protected admin panel for content updates
- **SEO Optimized**: Proper meta tags and Open Graph support
- **Fast Loading**: Optimized for performance

## 🏗️ Project Structure

```
/sanjtiksha-main
├── /public
│    ├── /images
│    │     ├── logo.png
│    │     ├── trading.jpg
│    │     ├── it.jpg
│    │     └── banner.jpg
│    └── index.html
├── /src
│    ├── /components
│    │     ├── Header.jsx
│    │     ├── Hero.jsx
│    │     ├── About.jsx
│    │     ├── TradingSection.jsx
│    │     ├── ITSection.jsx
│    │     ├── Contact.jsx
│    │     ├── Footer.jsx
│    │     └── AdminPanel.jsx
│    ├── /data
│    │     ├── hero.json
│    │     ├── about.json
│    │     ├── trading.json
│    │     ├── itservices.json
│    │     └── contact.json
│    ├── App.jsx
│    ├── main.jsx
│    └── index.css
└── package.json
```

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **EmailJS** - Contact form handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sanjtiksha-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📝 Content Management

### Admin Panel

Access the admin panel at `/admin` with the default password: `sanjtiksha2025`

**Features:**
- Edit hero section content
- Update about section
- Modify contact information
- Export data for backup
- Real-time preview of changes

### JSON Data Files

All content is stored in JSON files in the `/src/data` directory:

- `hero.json` - Hero section content
- `about.json` - About section content
- `trading.json` - Trading division content
- `itservices.json` - IT services content
- `contact.json` - Contact information

## 🎨 Customization

### Colors

The website uses a blue and orange color scheme:
- Primary Blue: `#007BFF`
- Primary Orange: `#FF6F00`
- Background: White/Gray

### Fonts

- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

### Images

Replace placeholder images in `/public/images/`:
- `logo.png` - Company logo
- `banner.jpg` - Hero section background
- `trading.jpg` - Trading section image
- `it.jpg` - IT services image

## 🚀 Deployment

### Render (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Set custom domain: `www.sanjtiksha.com`
5. Deploy!

### Other Platforms

The website can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 📧 Contact Form Setup

To enable the contact form:

1. Sign up for EmailJS
2. Create a service and template
3. Update the EmailJS configuration in `Contact.jsx`:
   ```javascript
   const result = await emailjs.send(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     templateParams,
     'YOUR_PUBLIC_KEY'
   );
   ```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Sections

1. Create a new component in `/src/components/`
2. Add the component to `App.jsx`
3. Create corresponding JSON data file
4. Update the admin panel to include the new section

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Security

- Admin panel is password-protected
- No sensitive data in client-side code
- Environment variables for production secrets

## 📈 Performance

- Optimized images
- Lazy loading
- Minimal bundle size
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to SanjTiksha Roots & Wings.

## 🆘 Support

For support, contact:
- Email: info@sanjtiksha.com
- Phone: +91 9876543210

---

**SanjTiksha Roots & Wings** - Where Commerce Meets Technology