# 🚀 AWS SES + Lambda Deployment Guide

## 📋 **Prerequisites**
- AWS Account
- Basic knowledge of AWS Console
- Your website files ready

## 🔧 **Step 1: AWS SES Setup**

### 1.1 Enable SES
1. Go to **AWS Console** → **SES (Simple Email Service)**
2. Click **Get Started**
3. Select **Production Access** (recommended) or stay in sandbox

### 1.2 Verify Your Email
1. In SES Console, go to **Verified Identities**
2. Click **Create Identity**
3. Select **Email Address**
4. Enter: `kevin.luminghu@gmail.com`
5. Click **Create Identity**
6. Check your email and click the verification link

## ⚡ **Step 2: Create Lambda Function**

### 2.1 Create Function
1. Go to **AWS Console** → **Lambda**
2. Click **Create Function**
3. Choose **Author from scratch**
4. **Function name**: `inventory-pro-contact-form`
5. **Runtime**: Node.js 18.x
6. **Architecture**: x86_64
7. Click **Create Function**

### 2.2 Upload Code
1. Copy the code from `lambda-function.js`
2. In Lambda console, replace the default code
3. Click **Deploy**

### 2.3 Configure Environment
1. In **Configuration** tab → **Environment variables**
2. Add: `AWS_REGION` = `us-east-1` (or your preferred region)

### 2.4 Set Permissions
1. In **Configuration** tab → **Permissions**
2. Click on the **Execution role**
3. In IAM console, attach this policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
```

## 🌐 **Step 3: Create API Gateway**

### 3.1 Create API
1. Go to **AWS Console** → **API Gateway**
2. Click **Create API**
3. Choose **REST API** → **Build**
4. **API name**: `inventory-pro-api`
5. Click **Create API**

### 3.2 Create Resource
1. Click **Actions** → **Create Resource**
2. **Resource Name**: `contact`
3. Click **Create Resource**

### 3.3 Create Method
1. Click **Actions** → **Create Method**
2. Select **POST**
3. Click the checkmark
4. **Integration type**: Lambda Function
5. **Lambda Function**: `inventory-pro-contact-form`
6. Click **Save**

### 3.4 Enable CORS
1. Select the **POST** method
2. Click **Actions** → **Enable CORS**
3. Click **Enable CORS and replace existing CORS headers**

### 3.5 Deploy API
1. Click **Actions** → **Deploy API**
2. **Stage name**: `prod`
3. Click **Deploy**
4. Copy the **Invoke URL** (you'll need this)

## 📧 **Step 4: Update Your Website**

### 4.1 Update JavaScript
1. Open `script.js`
2. Find: `const lambdaUrl = 'YOUR_LAMBDA_FUNCTION_URL_HERE';`
3. Replace with your actual API Gateway URL + `/contact`
   - Example: `https://abc123.execute-api.us-east-1.amazonaws.com/prod/contact`

### 4.2 Test the Form
1. Upload your files to S3
2. Test the contact form
3. Check your email for submissions

## 💰 **Cost Breakdown**

### **Monthly Costs (Typical Usage)**
- **SES**: $0.10 per 1,000 emails = ~$0.10/month
- **Lambda**: 1M free requests/month = $0/month
- **S3**: $0.023 per GB = ~$0.05/month
- **CloudFront**: First 10TB free = $0/month
- **API Gateway**: 1M free requests/month = $0/month

**Total: ~$0.15/month** for typical usage!

## 🚨 **Important Notes**

### **SES Sandbox Limitations**
- If you stay in sandbox mode:
  - Can only send to verified emails
  - Limited to 200 emails/day
  - Request production access for unlimited emails

### **Security**
- API Gateway URL is public
- Consider adding rate limiting
- Monitor Lambda execution logs

### **Testing**
- Test with small data first
- Check CloudWatch logs for errors
- Verify email delivery

## 🎯 **Next Steps**

1. **Follow the guide step by step**
2. **Test the form locally first**
3. **Deploy to S3 when ready**
4. **Monitor costs in AWS Billing**

## 📞 **Need Help?**

- Check **CloudWatch logs** for Lambda errors
- Verify **SES email verification**
- Ensure **API Gateway CORS** is enabled
- Check **Lambda permissions** for SES

---

**Your contact form will be professional, reliable, and super cheap! 🎉**
