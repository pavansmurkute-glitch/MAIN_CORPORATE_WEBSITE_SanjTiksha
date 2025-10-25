# 🚀 Live Deployment Guide - SanjTiksha Corporate Website

Your website is now ready for live deployment! Here are multiple deployment options:

## 📋 Quick Deployment Options

### Option 1: GitHub Pages (Free)
1. Go to your repository: https://github.com/pavansmurkute-glitch/MAIN_CORPORATE_WEBSITE_SanjTiksha
2. Go to Settings → Pages
3. Source: Deploy from a branch
4. Branch: main
5. Folder: / (root)
6. Save
7. Your site will be available at: `https://pavansmurkute-glitch.github.io/MAIN_CORPORATE_WEBSITE_SanjTiksha`

### Option 2: Render (Recommended - Professional)
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Static Site"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18
6. Deploy!
7. Get a custom domain: `https://your-site-name.onrender.com`

### Option 3: Netlify (Easy & Fast)
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Build settings (auto-detected from netlify.toml):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy!
6. Get a custom domain: `https://your-site-name.netlify.app`

### Option 4: Vercel (Developer-Friendly)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Framework: Vite
4. Deploy!
5. Get a custom domain: `https://your-site-name.vercel.app`

## 🔧 Custom Domain Setup

### For Render/Netlify/Vercel:
1. In your hosting dashboard, go to "Custom Domains"
2. Add your domain (e.g., `www.sanjtiksha.com`)
3. Update your DNS records:
   - **CNAME**: `www` → `your-site-name.onrender.com`
   - **A Record**: `@` → `76.76.19.61` (for root domain)

### DNS Configuration:
```
Type    Name    Value
CNAME   www     your-site-name.onrender.com
A       @       76.76.19.61
```

## 📧 Email Configuration (Optional)

To enable the contact form:

1. **Sign up for EmailJS**: https://emailjs.com
2. **Create a service** (Gmail, Outlook, etc.)
3. **Create an email template**
4. **Get your credentials**:
   - Service ID
   - Template ID
   - Public Key
5. **Update the configuration** in `src/config.js`

## 🔒 Admin Panel Access

- **URL**: `https://your-domain.com/admin`
- **Default Password**: `sanjtiksha2025`
- **Change Password**: Update `src/config.js`

## 📱 Mobile Optimization

Your website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## 🚀 Performance Features

- **Fast Loading**: Optimized build with Vite
- **SEO Ready**: Meta tags and Open Graph
- **Modern Design**: Clean, professional layout
- **Smooth Animations**: Framer Motion integration

## 🔄 Updates and Maintenance

### Content Updates:
1. **Via Admin Panel**: Login to `/admin` and make changes
2. **Via Code**: Edit JSON files in `/src/data/` and push to GitHub

### Automatic Deployment:
- Any push to the `main` branch will trigger automatic deployment
- GitHub Actions will build and deploy your site

## 📊 Analytics (Optional)

Add Google Analytics:
1. Get your GA4 tracking ID
2. Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🆘 Troubleshooting

### Build Issues:
- Ensure Node.js 18+ is installed
- Run `npm install` before building
- Check for syntax errors in console

### Domain Issues:
- DNS propagation can take 24-48 hours
- Verify CNAME/A records are correct
- Check SSL certificate status

### Admin Panel Issues:
- Clear browser cache
- Check password is correct
- Ensure localStorage is enabled

## 📞 Support

- **GitHub Repository**: https://github.com/pavansmurkute-glitch/MAIN_CORPORATE_WEBSITE_SanjTiksha
- **Documentation**: Check README.md and DEPLOYMENT.md
- **Issues**: Create GitHub issues for bugs/features

## 🎉 Success!

Your SanjTiksha Corporate Website is now live and ready to showcase your business!

**Next Steps:**
1. Choose your preferred hosting platform
2. Set up your custom domain
3. Configure email (optional)
4. Test all functionality
5. Share your live website!

---

**SanjTiksha Roots & Wings** - Where Commerce Meets Technology
