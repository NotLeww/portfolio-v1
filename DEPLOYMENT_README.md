# 🚀 Portfolio Deployment to Vercel

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click **"New repository"**
3. Repository name: `portfolio-v1` or `jayson-portfolio`
4. Make it **Public**
5. **DO NOT** initialize with README (we already have files)
6. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show commands. Run these in PowerShell:

```bash
cd C:\xampp\htdocs\PortfolioV1
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin master
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Website (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"Import Project"**
4. Connect your GitHub account
5. Select your `portfolio-v1` repository
6. Click **"Deploy"**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd C:\xampp\htdocs\PortfolioV1
vercel --prod
```

## Step 4: Get Your Live Domain

Vercel will give you a domain like:
- `https://portfolio-v1.vercel.app`
- Or connect your own custom domain

## 📁 Files Included in Deployment

- ✅ `index.html` - Main portfolio
- ✅ `styles.css` - Beautiful styling
- ✅ `script.js` - AI chatbot
- ✅ `profile.png` - Your photo
- ✅ `vercel.json` - Deployment config

## 📁 Files Excluded

- ❌ `Concord/` - Laravel system (separate hosting)
- ❌ `IAS-SMS/` - Laravel system (separate hosting)

## 🔗 Final Result

Your portfolio will be live at: `https://your-repo-name.vercel.app`

**Live Links:**
- Portfolio: Your Vercel domain
- Hospital System: https://concord-rn71.onrender.com/portal/login
- GitHub: Links in portfolio