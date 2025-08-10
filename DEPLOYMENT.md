# 🚀 Heroku Deployment Guide for Nodewiz.ai

## Prerequisites
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
- Git installed and configured
- Heroku account created

## Quick Deployment Steps

### 1. Install Production Dependencies
```bash
pip install -r requirements.txt
```

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create Heroku App
```bash
heroku create nodewiz-ai
# Or choose your own app name:
# heroku create your-app-name
```

### 4. Set Environment Variables
```bash
# Required: Set a strong secret key
heroku config:set SECRET_KEY="your-super-secret-production-key-here"

# Required: Disable debug mode
heroku config:set DEBUG=False

# Optional: Set custom domain (if you have one)
# heroku config:set ALLOWED_HOSTS="yourdomain.com,www.yourdomain.com"
```

### 5. Add Heroku PostgreSQL Database
```bash
heroku addons:create heroku-postgresql:mini
```

### 6. Deploy to Heroku
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Ready for Heroku deployment - Nodewiz.ai"

# Add Heroku remote
heroku git:remote -a your-app-name

# Deploy
git push heroku main
```

### 7. Run Database Migrations
```bash
heroku run python manage.py migrate
```

### 8. Collect Static Files
```bash
heroku run python manage.py collectstatic --noinput
```

### 9. Create Superuser (Optional)
```bash
heroku run python manage.py createsuperuser
```

### 10. Open Your App
```bash
heroku open
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `SECRET_KEY` | Django secret key for security | ✅ |
| `DEBUG` | Debug mode (should be False in production) | ✅ |
| `DATABASE_URL` | PostgreSQL database URL (auto-provided by Heroku) | ✅ |
| `ALLOWED_HOSTS` | Custom domains (optional) | ❌ |

## Troubleshooting

### Check Logs
```bash
heroku logs --tail
```

### Common Issues

1. **Static files not loading:**
   ```bash
   heroku run python manage.py collectstatic --noinput
   ```

2. **Database errors:**
   ```bash
   heroku run python manage.py migrate
   ```

3. **App not starting:**
   - Check your `Procfile` exists
   - Verify `requirements.txt` has all dependencies
   - Check logs with `heroku logs --tail`

### Custom Domain Setup (Optional)
```bash
# Add your domain
heroku domains:add yourdomain.com
heroku domains:add www.yourdomain.com

# Get DNS target
heroku domains
```

## App Features
- ✅ Glassmorphism design with light/dark theme
- ✅ Contact form with validation
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Modern animations
- ✅ Professional branding

## Post-Deployment
1. Test all pages and functionality
2. Test contact form submission
3. Test theme switching
4. Verify responsive design on mobile
5. Check Google PageSpeed insights

Your Nodewiz.ai website will be live at: `https://your-app-name.herokuapp.com`

---
**Need help?** Check the [Heroku Django deployment docs](https://devcenter.heroku.com/articles/deploying-python)