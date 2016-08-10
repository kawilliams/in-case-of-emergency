import sys
import os
home = '/var/www/html/hellolh'



if home not in sys.path:
    sys.path.append(home)

    
from show_db import app as application

