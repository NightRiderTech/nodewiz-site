#!/usr/bin/env python
"""
Generate a secure Django secret key for production use.
Run this script to get a new secret key for your Heroku environment variables.
"""

from django.core.management.utils import get_random_secret_key

if __name__ == "__main__":
    secret_key = get_random_secret_key()
    print("🔑 Your new Django secret key:")
    print(f"SECRET_KEY={secret_key}")
    print("\n💡 Use this in your Heroku config:")
    print(f"heroku config:set SECRET_KEY=\"{secret_key}\"")
    print("\n⚠️  Keep this secret and never commit it to version control!")