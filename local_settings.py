# mysql
#CREATE DATABASE map70 CHARACTER SET utf8;
#GRANT ALL PRIVILEGES ON map70.* To 'map70'@'localhost' IDENTIFIED BY 'map70';


DATABASES = {
   'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'scispheredb',
        'USER': 'scibeti',
        'PASSWORD': 'betabeti789',
        'HOST': '159.89.166.217',
   }
}



# sqlite
#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': 'db.sqlite3',
#    }
#}

#TOUCHFORMS_URL = 'http://localhost:9000/'

MONGO_DATABASE = {
    'HOST': '139.59.34.92',
    'PORT': 27017,
    'NAME': 'scispheremongo',
    'USER': 'scisphereUser',
    'PASSWORD': 'sciProdMonDB'
}

