# mysql
#CREATE DATABASE map70 CHARACTER SET utf8;
#GRANT ALL PRIVILEGES ON map70.* To 'map70'@'localhost' IDENTIFIED BY 'map70';


#DATABASES = {
#   'default': {
#        'ENGINE': 'django.db.backends.postgresql_psycopg2',
#        'NAME': 'scispherebeta',
#        'USER': 'scibeti',
#        'PASSWORD': 'betabeti789',
#	'HOST': '104.236.45.122',
#   }
#}

DATABASES = {
   'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'PM1',
        'USER': 'root',
        'PASSWORD': 'master$1',
        'HOST': 'pm1.cxqgnodhho1r.ap-southeast-1.rds.amazonaws.com',
        'PORT':'5432'
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
    'HOST': '52.74.76.111,52.74.249.80',
    'PORT': 27017,
    'NAME': 'scispheremongo',
    'USER': 'scimongo2',
    'PASSWORD': 'scimongo789'
}

