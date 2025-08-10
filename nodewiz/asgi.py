"""
ASGI config for nodewiz project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nodewiz.settings')

application = get_asgi_application()