#!/usr/bin/env python3
"""
Relaymatic Website Setup Script
Automated setup for development and production environments
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path

def run_command(command, shell=True):
    """Run a command and handle errors"""
    try:
        result = subprocess.run(command, shell=shell, check=True, capture_output=True, text=True)
        print(f"✅ {command}")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running: {command}")
        print(f"Error: {e.stderr}")
        return None

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        sys.exit(1)
    print(f"✅ Python {sys.version.split()[0]} detected")

def setup_virtual_environment():
    """Create and activate virtual environment"""
    if not os.path.exists('venv'):
        print("📦 Creating virtual environment...")
        run_command(f"{sys.executable} -m venv venv")
    else:
        print("✅ Virtual environment already exists")

def install_dependencies():
    """Install Python dependencies"""
    print("📦 Installing dependencies...")
    
    # Determine pip path based on OS
    if os.name == 'nt':  # Windows
        pip_path = 'venv\\Scripts\\pip'
        python_path = 'venv\\Scripts\\python'
    else:  # macOS/Linux
        pip_path = 'venv/bin/pip'
        python_path = 'venv/bin/python'
    
    # Upgrade pip first
    run_command(f"{pip_path} install --upgrade pip")
    
    # Install requirements
    run_command(f"{pip_path} install -r requirements.txt")
    
    return python_path

def setup_database(python_path):
    """Set up Django database"""
    print("🗄️ Setting up database...")
    
    # Run migrations
    run_command(f"{python_path} manage.py makemigrations")
    run_command(f"{python_path} manage.py migrate")
    
    print("✅ Database setup complete")

def collect_static_files(python_path):
    """Collect static files for production"""
    print("📁 Collecting static files...")
    run_command(f"{python_path} manage.py collectstatic --noinput")

def create_superuser(python_path):
    """Create Django superuser"""
    response = input("🔐 Create superuser account? (y/n): ").lower().strip()
    if response == 'y':
        print("Creating superuser...")
        try:
            subprocess.run([python_path, 'manage.py', 'createsuperuser'], check=True)
        except subprocess.CalledProcessError:
            print("❌ Error creating superuser")

def create_env_file():
    """Create .env file template"""
    env_template = """# Relaymatic Environment Configuration
# Copy this file to .env and update with your settings

# Django Settings
DEBUG=True
SECRET_KEY=django-insecure-change-this-in-production
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (for production)
# DATABASE_URL=postgres://user:pass@localhost:5432/dbname

# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@relaymatic.com

# Security (for production)
SECURE_SSL_REDIRECT=False
SECURE_HSTS_SECONDS=0
SECURE_HSTS_INCLUDE_SUBDOMAINS=False
SECURE_HSTS_PRELOAD=False
"""
    
    if not os.path.exists('.env'):
        with open('.env', 'w') as f:
            f.write(env_template)
        print("✅ Created .env template file")
    else:
        print("✅ .env file already exists")

def run_tests(python_path):
    """Run Django tests"""
    response = input("🧪 Run tests? (y/n): ").lower().strip()
    if response == 'y':
        print("Running tests...")
        run_command(f"{python_path} manage.py test")

def start_development_server(python_path):
    """Start Django development server"""
    response = input("🚀 Start development server? (y/n): ").lower().strip()
    if response == 'y':
        print("Starting development server...")
        print("Access the website at: http://127.0.0.1:8000")
        print("Admin interface at: http://127.0.0.1:8000/admin")
        print("Press Ctrl+C to stop the server")
        
        try:
            subprocess.run([python_path, 'manage.py', 'runserver'], check=True)
        except KeyboardInterrupt:
            print("\n👋 Server stopped")

def main():
    """Main setup function"""
    print("🚀 Relaymatic Website Setup")
    print("=" * 50)
    
    # Check requirements
    check_python_version()
    
    # Setup steps
    setup_virtual_environment()
    python_path = install_dependencies()
    create_env_file()
    setup_database(python_path)
    collect_static_files(python_path)
    
    # Optional steps
    create_superuser(python_path)
    run_tests(python_path)
    
    print("\n✅ Setup complete!")
    print("\nNext steps:")
    print("1. Activate virtual environment:")
    if os.name == 'nt':
        print("   venv\\Scripts\\activate")
    else:
        print("   source venv/bin/activate")
    print("2. Update .env file with your settings")
    print("3. Run: python manage.py runserver")
    print("\n📚 Check README.md for detailed documentation")
    
    # Start server
    start_development_server(python_path)

if __name__ == "__main__":
    main()