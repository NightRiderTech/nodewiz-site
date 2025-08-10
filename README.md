# 🚀 Nodewiz.ai - AI-Powered Workflow Automation

Modern, professional website for AI automation services built with Django and featuring glassmorphism design.

## ✨ Features

- **Modern Glassmorphism Design** - Stunning visual effects with backdrop filters
- **Light/Dark Theme Toggle** - Automatic theme switching with user preference
- **Fully Responsive** - Mobile-first design that works on all devices
- **SEO Optimized** - Meta tags, structured data, and performance optimized
- **Contact Form** - Functional contact form with validation
- **Professional Branding** - Custom SVG logos and consistent design language

## 🛠️ Tech Stack

- **Backend**: Django 4.2+ with Python 3.11
- **Frontend**: Bootstrap 5, Custom CSS with CSS Variables
- **Database**: SQLite (development) / PostgreSQL (production)
- **Deployment**: Heroku-ready with WhiteNoise for static files
- **Styling**: Modern CSS with glassmorphism effects and animations

## 🚀 Quick Start

### Local Development

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd Nodewiz
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # macOS/Linux
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Setup database**:
   ```bash
   python manage.py migrate
   python manage.py collectstatic --noinput
   ```

4. **Run development server**:
   ```bash
   python manage.py runserver
   ```

5. **Visit**: http://localhost:8000

### Heroku Deployment

See `DEPLOYMENT.md` for complete deployment instructions.

## 📁 Project Structure

```
Nodewiz/
├── nodewiz/              # Django project settings
├── website/              # Main website app
├── templates/            # HTML templates
├── static/              # Static assets (CSS, JS, images)
├── staticfiles/         # Collected static files
├── requirements.txt     # Python dependencies
├── Procfile            # Heroku configuration
├── runtime.txt         # Python version for Heroku
└── DEPLOYMENT.md       # Deployment guide
```

## 🎨 Design Features

- **Glassmorphism UI** with backdrop filters and transparency
- **Smooth Animations** with CSS transitions and transforms
- **Modern Typography** using Sora and Inter fonts
- **Theme System** with CSS custom properties
- **Professional Color Palette** with gradients and modern styling

## 📱 Pages

- **Home** - Hero section with animated elements and feature showcase
- **Services** - Service offerings with pricing and process overview
- **Use Cases** - Real-world examples with metrics and success stories
- **About** - Team information and company values
- **Contact** - Functional contact form with validation
- **Testimonials** - Client success stories and reviews

## 🔧 Development

### Environment Variables

Copy `env.example` to `.env` and configure:

```bash
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

### Adding Features

1. Create new Django apps as needed
2. Update URL routing in `website/urls.py`
3. Add templates in `templates/website/`
4. Update static files and run `collectstatic`

## 🚀 Deployment

The project is Heroku-ready with:
- ✅ Procfile configured
- ✅ Requirements.txt with production dependencies
- ✅ WhiteNoise for static file serving
- ✅ Environment variable configuration
- ✅ Database configuration for PostgreSQL

## 📄 License

All rights reserved - Nodewiz.ai

---

**Built with ❤️ for modern AI automation services**