# Deployment Guide - SanjTiksha Main Website

## 🚀 Deploying to Render (Recommended)

### Step 1: Prepare Your Repository

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository
2. **Verify Structure**: Ensure all files are in place:
   ```
   ├── src/
   ├── public/
   ├── package.json
   ├── tailwind.config.js
   ├── postcss.config.js
   └── render.yaml
   ```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### Step 3: Configure Render Service

1. **Create New Web Service**:
   - Connect your GitHub repository
   - Choose "Static Site" as the service type

2. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18

3. **Environment Variables** (Optional):
   - `NODE_ENV`: `production`
   - `REACT_APP_ADMIN_PASSWORD`: `your-secure-password`

### Step 4: Custom Domain Setup

1. **In Render Dashboard**:
   - Go to your service settings
   - Click "Custom Domains"
   - Add `www.sanjtiksha.com`

2. **In Your DNS Provider** (GoDaddy, etc.):
   - Create a CNAME record:
     - **Name**: `www`
     - **Value**: `sanjtiksha-site.onrender.com`
   - Create an A record for the root domain:
     - **Name**: `@`
     - **Value**: `76.76.19.61` (Render's IP)

### Step 5: SSL Certificate

- Render automatically provides SSL certificates
- Your site will be available at `https://www.sanjtiksha.com`

## 🔧 Alternative Deployment Options

### Netlify

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

3. **Custom Domain**:
   - Add custom domain in Netlify dashboard
   - Update DNS records as instructed

### Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Custom Domain**:
   - Add domain in Vercel dashboard
   - Update DNS records

## 📧 Email Configuration

### EmailJS Setup

1. **Create EmailJS Account**:
   - Go to [emailjs.com](https://emailjs.com)
   - Sign up for a free account

2. **Create Service**:
   - Add your email service (Gmail, Outlook, etc.)
   - Note down the Service ID

3. **Create Template**:
   - Create an email template
   - Note down the Template ID

4. **Get Public Key**:
   - Go to Account > API Keys
   - Copy your Public Key

5. **Update Configuration**:
   - Update `src/config.js` with your EmailJS credentials
   - Or set environment variables in Render

## 🔒 Security Considerations

### Admin Panel Security

1. **Change Default Password**:
   - Update the password in `src/config.js`
   - Use a strong, unique password

2. **Environment Variables**:
   - Store sensitive data in environment variables
   - Never commit passwords to version control

3. **HTTPS Only**:
   - Ensure your site is served over HTTPS
   - Render provides this automatically

## 📊 Performance Optimization

### Image Optimization

1. **Replace Placeholder Images**:
   - Add actual company images to `/public/images/`
   - Optimize images for web (WebP format recommended)

2. **Image Sizes**:
   - Logo: 200x200px
   - Banner: 1920x1080px
   - Section images: 800x600px

### Build Optimization

1. **Production Build**:
   ```bash
   npm run build
   ```

2. **Verify Build**:
   - Check the `dist` folder
   - Ensure all assets are included

## 🧪 Testing Before Deployment

### Local Testing

1. **Build Test**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Admin Panel Test**:
   - Visit `http://localhost:5173/admin`
   - Test login with password
   - Verify all forms work

3. **Responsive Test**:
   - Test on mobile, tablet, desktop
   - Check all animations work

### Production Testing

1. **After Deployment**:
   - Test all pages load correctly
   - Verify admin panel works
   - Test contact form (if configured)
   - Check all external links

## 🔄 Updates and Maintenance

### Content Updates

1. **Via Admin Panel**:
   - Login to `/admin`
   - Make changes
   - Save changes

2. **Via Code Updates**:
   - Edit JSON files in `/src/data/`
   - Push to GitHub
   - Render will auto-deploy

### Monitoring

1. **Render Dashboard**:
   - Monitor service health
   - Check deployment logs
   - Monitor performance

2. **Analytics**:
   - Add Google Analytics if needed
   - Monitor user behavior

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (use 18)
   - Verify all dependencies are installed
   - Check for syntax errors

2. **Domain Issues**:
   - Verify DNS propagation (can take 24-48 hours)
   - Check CNAME/A records are correct
   - Ensure SSL certificate is active

3. **Admin Panel Issues**:
   - Clear browser cache
   - Check password is correct
   - Verify localStorage is enabled

### Support

- **Render Support**: [help.render.com](https://help.render.com)
- **EmailJS Support**: [emailjs.com/support](https://emailjs.com/support)
- **SanjTiksha Support**: info@sanjtiksha.com

---

**Note**: This deployment guide assumes you have basic knowledge of web development and DNS management. For complex setups, consider hiring a developer or DevOps specialist.
