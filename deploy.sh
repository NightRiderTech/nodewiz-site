#!/bin/bash

# Relaymatic Website Deployment Script
# For production deployment on Ubuntu/Debian servers

set -e

echo "🚀 Relaymatic Production Deployment"
echo "===================================="

# Update system packages
echo "📦 Updating system packages..."
sudo apt update
sudo apt upgrade -y

# Install required system packages
echo "📦 Installing system dependencies..."
sudo apt install -y python3 python3-pip python3-venv nginx postgresql postgresql-contrib supervisor git

# Create application directory
APP_DIR="/var/www/relaymatic"
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR

# Clone or update repository
if [ -d "$APP_DIR/.git" ]; then
    echo "📥 Updating repository..."
    cd $APP_DIR
    git pull origin main
else
    echo "📥 Cloning repository..."
    cd /var/www
    git clone <your-repo-url> relaymatic
    cd relaymatic
fi

# Create virtual environment
echo "🐍 Setting up Python environment..."
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
echo "📦 Installing Python packages..."
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn psycopg2-binary

# Set up environment variables
echo "⚙️ Configuring environment..."
if [ ! -f .env ]; then
    cp .env.example .env 2>/dev/null || true
    echo "📝 Please update .env file with production settings"
fi

# Set up database
echo "🗄️ Setting up PostgreSQL database..."
sudo -u postgres psql -c "CREATE DATABASE relaymatic_db;" || true
sudo -u postgres psql -c "CREATE USER relaymatic_user WITH PASSWORD 'secure_password';" || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE relaymatic_db TO relaymatic_user;" || true

# Run Django setup
echo "🔧 Running Django setup..."
python manage.py collectstatic --noinput
python manage.py migrate

# Create superuser (optional)
echo "👤 Create superuser? (Press Enter to skip)"
python manage.py createsuperuser --noinput || true

# Set up Gunicorn
echo "🔧 Configuring Gunicorn..."
cat > gunicorn.conf.py << EOF
bind = "127.0.0.1:8000"
workers = 3
worker_class = "sync"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 100
timeout = 30
keepalive = 2
user = "$USER"
group = "$USER"
daemon = False
pidfile = "/var/run/gunicorn/gunicorn.pid"
accesslog = "/var/log/gunicorn/access.log"
errorlog = "/var/log/gunicorn/error.log"
loglevel = "info"
EOF

# Create log directories
sudo mkdir -p /var/log/gunicorn
sudo mkdir -p /var/run/gunicorn
sudo chown $USER:$USER /var/log/gunicorn
sudo chown $USER:$USER /var/run/gunicorn

# Set up Supervisor for Gunicorn
echo "👁️ Configuring Supervisor..."
sudo tee /etc/supervisor/conf.d/relaymatic.conf > /dev/null << EOF
[program:relaymatic]
command=$APP_DIR/venv/bin/gunicorn relaymatic.wsgi:application -c gunicorn.conf.py
directory=$APP_DIR
user=$USER
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/gunicorn/supervisor.log
environment=PATH="$APP_DIR/venv/bin"
EOF

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/relaymatic > /dev/null << EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    client_max_body_size 50M;
    
    location /static/ {
        alias $APP_DIR/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /media/ {
        alias $APP_DIR/media/;
        expires 1y;
        add_header Cache-Control "public";
    }
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/relaymatic /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Start services
echo "🚀 Starting services..."
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start relaymatic
sudo systemctl restart nginx
sudo systemctl enable nginx
sudo systemctl enable supervisor

# Set up SSL with Let's Encrypt (optional)
echo "🔒 Set up SSL certificate? (y/n)"
read -r setup_ssl
if [ "$setup_ssl" = "y" ]; then
    sudo apt install -y certbot python3-certbot-nginx
    echo "📝 Please run: sudo certbot --nginx -d your-domain.com -d www.your-domain.com"
fi

# Set up firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw --force enable

# Set up log rotation
echo "📄 Setting up log rotation..."
sudo tee /etc/logrotate.d/relaymatic > /dev/null << EOF
/var/log/gunicorn/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0644 $USER $USER
    postrotate
        supervisorctl restart relaymatic
    endscript
}
EOF

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your website should be available at: http://your-domain.com"
echo "🔧 Admin interface: http://your-domain.com/admin"
echo ""
echo "📋 Post-deployment checklist:"
echo "1. Update .env file with production settings"
echo "2. Update ALLOWED_HOSTS in settings.py"
echo "3. Set up SSL certificate with certbot"
echo "4. Configure domain DNS to point to this server"
echo "5. Test all functionality"
echo ""
echo "🔧 Useful commands:"
echo "- Check status: sudo supervisorctl status relaymatic"
echo "- Restart app: sudo supervisorctl restart relaymatic"
echo "- View logs: tail -f /var/log/gunicorn/supervisor.log"
echo "- Nginx status: sudo systemctl status nginx"