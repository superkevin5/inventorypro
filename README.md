# SupplyChain ERP Marketing Website

A modern, responsive marketing website for a comprehensive ERP supply chain management system. This static website showcases all 16 modules of the ERP system with beautiful animations and interactive features.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, modal dialogs, and smooth scrolling
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Fast Loading**: Optimized for performance and quick loading times

## Website Sections

1. **Hero Section**: Eye-catching introduction with animated module grid
2. **Features**: Six key benefits of the ERP system
3. **Modules**: Detailed showcase of all 16 ERP modules:
   - Client Company Management
   - Equipment Management
   - Inventory Management
   - Inventory Search
   - Inbound Management
   - Inbound Inventory Search
   - Outbound Management
   - Outbound Inventory Search
   - Procurement Management
   - Procurement Data Management
   - Product Management
   - Repairment Management
   - Sales Data Management
   - Sales Management
   - Supply Company Management
   - User Management
4. **Pricing**: Three-tier pricing structure
5. **Contact**: Contact form and company information
6. **Footer**: Links and social media

## File Structure

```
supplychain-market/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Hosting on Amazon S3

### Prerequisites

1. AWS Account
2. AWS CLI installed and configured
3. Domain name (optional but recommended)

### Step 1: Create S3 Bucket

1. Go to AWS S3 Console
2. Click "Create bucket"
3. Choose a unique bucket name (e.g., `your-erp-website`)
4. Select your preferred region
5. **Important**: Uncheck "Block all public access" (we need public access for website hosting)
6. Click "Create bucket"

### Step 2: Configure Bucket for Static Website Hosting

1. Select your bucket
2. Go to "Properties" tab
3. Scroll down to "Static website hosting"
4. Click "Edit"
5. Select "Enable"
6. Set "Index document" to `index.html`
7. Set "Error document" to `index.html` (for SPA behavior)
8. Click "Save changes"

### Step 3: Set Bucket Policy for Public Access

1. Go to "Permissions" tab
2. Click "Bucket policy"
3. Add the following policy (replace `your-bucket-name` with your actual bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

### Step 4: Upload Files

#### Option A: Using AWS CLI

1. Open terminal/command prompt
2. Navigate to your project directory
3. Run the following commands:

```bash
# Upload all files to S3
aws s3 sync . s3://your-bucket-name --exclude "README.md"

# Set cache headers for better performance
aws s3 cp index.html s3://your-bucket-name/ --cache-control "max-age=3600"
aws s3 cp styles.css s3://your-bucket-name/ --cache-control "max-age=86400"
aws s3 cp script.js s3://your-bucket-name/ --cache-control "max-age=86400"
```

#### Option B: Using AWS Console

1. Go to your S3 bucket
2. Click "Upload"
3. Drag and drop all files (index.html, styles.css, script.js)
4. Click "Upload"

### Step 5: Access Your Website

Your website will be available at:
```
http://your-bucket-name.s3-website-your-region.amazonaws.com
```

### Step 6: Custom Domain (Optional)

1. **Register a domain** (if you don't have one)
2. **Create a CloudFront distribution**:
   - Go to CloudFront console
   - Create distribution
   - Set origin to your S3 bucket
   - Configure your custom domain
3. **Update DNS records** to point to CloudFront

## Cost Optimization

### S3 Costs (Very Low)
- **Storage**: ~$0.023 per GB per month
- **Requests**: ~$0.0004 per 1,000 GET requests
- **Data Transfer**: Free for first 1GB per month

### Estimated Monthly Cost
For a typical marketing website:
- **Storage**: ~$0.01/month (files are very small)
- **Requests**: ~$0.01-0.10/month (depending on traffic)
- **Total**: **$0.02-0.11/month** (extremely cheap!)

### CloudFront (Optional but Recommended)
- **Free tier**: 1TB data transfer, 10,000 requests per month
- **Additional**: ~$0.085 per GB, $0.0075 per 10,000 requests

## Performance Optimization

### Enable Compression
Add to your S3 bucket:
1. Go to bucket properties
2. Enable "Server-side encryption"
3. Set "Compression" to enabled

### Use CloudFront (Recommended)
1. Creates edge locations worldwide
2. Reduces latency
3. Provides HTTPS
4. Includes DDoS protection

## Security Best Practices

1. **HTTPS**: Use CloudFront for automatic HTTPS
2. **CORS**: Configure if needed for API calls
3. **Monitoring**: Set up CloudWatch alarms
4. **Backup**: Enable versioning on S3 bucket

## Maintenance

### Updates
1. Upload new files to S3
2. Invalidate CloudFront cache (if using CloudFront)
3. Test the website

### Monitoring
- Set up CloudWatch for monitoring
- Use AWS Cost Explorer to track expenses
- Monitor S3 access logs

## Troubleshooting

### Common Issues

1. **Website not loading**:
   - Check bucket policy allows public access
   - Verify static website hosting is enabled
   - Check file names match exactly

2. **CSS/JS not loading**:
   - Verify all files are uploaded
   - Check file paths in HTML
   - Clear browser cache

3. **Mobile menu not working**:
   - Check JavaScript console for errors
   - Verify script.js is loaded

### Performance Issues

1. **Slow loading**:
   - Enable CloudFront
   - Optimize images (if added)
   - Enable compression

2. **High costs**:
   - Monitor CloudWatch metrics
   - Check for excessive requests
   - Use CloudFront caching

## Customization

### Colors and Branding
Edit `styles.css` to change:
- Primary color: `#2563eb`
- Gradient colors in hero section
- Button styles
- Typography

### Content
Edit `index.html` to update:
- Company information
- Module descriptions
- Pricing
- Contact details

### Functionality
Edit `script.js` to modify:
- Form handling
- Animations
- Interactive features

## Support

For technical support or customization requests, contact your development team.

---

**Total Estimated Cost**: $0.02-0.11/month for basic hosting
**Recommended Setup**: S3 + CloudFront for optimal performance and security 