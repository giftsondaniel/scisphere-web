# mysql
#CREATE DATABASE map70 CHARACTER SET utf8;
#GRANT ALL PRIVILEGES ON map70.* To 'map70'@'localhost' IDENTIFIED BY 'map70';



DATABASES = {
   'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'scispheredb',
        'USER': 'scibeti',
        'PASSWORD': 'betabeti789',
        'HOST': '172.31.4.146' #'35.154.217.4',
   }
}

MONGO_DATABASE = {
    'HOST': 'localhost',
    'PORT': 27017,
    'NAME': 'scispheremongo',
    'USER': 'scisphereUser',
    'PASSWORD': 'sciProdMonDB2022'
}
