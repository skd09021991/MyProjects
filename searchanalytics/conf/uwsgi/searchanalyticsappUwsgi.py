"""
WSGI config for searchanalytics project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
import sys

base_dir = os.path.join(os.path.dirname(__file__), '..', '..')
server_dir = os.path.join(base_dir, 'server')

sys.path.append("/home/ubuntu/.local/lib/python3.6/site-packages")
sys.path.append(server_dir)

os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'
os.environ['PYTHON_EGG_CACHE'] = '/tmp/.python-eggs'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

