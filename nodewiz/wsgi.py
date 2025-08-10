"""
WSGI config for nodewiz project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nodewiz.settings')

application = get_wsgi_application()