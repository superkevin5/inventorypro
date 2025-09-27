# EmailJS Setup Guide for Static S3 Site

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Follow the setup instructions
5. **Copy your Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

**Subject:** New Contact Form Submission - {{interest}}

**Body:**
```
Hello,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Interest: {{interest}}

Message:
{{message}}

---
This email was sent from your Inventory Pro website.
```

4. **Copy your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key** (e.g., `user_abcdef123456`)

### Step 5: Update Your Code
1. Open `script.js`
2. Find the `EMAILJS_CONFIG` section (around line 1390)
3. Replace the placeholder values:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'service_abc123', // Your Service ID
    templateId: 'template_xyz789', // Your Template ID
    publicKey: 'user_abcdef123456' // Your Public Key
};
```

### Step 6: Deploy to S3
1. Upload your files to S3
2. Make sure `index.html` is set as the index document
3. Enable static website hosting
4. Test the contact form!

## ✅ Features Included

- **Real-time email delivery** to inventorypro55@gmail.com
- **Loading states** with spinner animation
- **Success/error messages** with smooth animations
- **Form validation** and user feedback
- **Mobile responsive** design
- **No server required** - works entirely client-side

## 🔧 Troubleshooting

### Emails not sending?
1. Check browser console for errors
2. Verify all IDs are correct in `EMAILJS_CONFIG`
3. Make sure your email service is properly connected
4. Check if your domain is verified in EmailJS

### Template variables not working?
- Make sure template variables match exactly: `{{from_name}}`, `{{from_email}}`, etc.
- Check that the template is saved and published

### Still having issues?
- EmailJS has excellent documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Free tier includes 200 emails/month
- Upgrade for more emails if needed

## 🎉 You're Done!

Your static S3 site now has fully functional email capabilities without any server setup!
