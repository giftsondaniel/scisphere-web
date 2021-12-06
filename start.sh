#!/bin/bash
set -e
DJANGODIR=/home/scimergent/scisphere-web
DJANGO_SETTINGS_MODULE=scisphere-web.settings

LOGFILE=/var/log/supervisor/rqworker.log
LOGDIR=$(dirname $LOGFILE)
#NUM_WORKERS=2
# user/group to run as
USER=scimergent
GROUP=scimergent
cd /home/scimergent/scisphere-web
source /home/scimergent/virtual_environments/scisphere-v2/bin/activate

export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

test -d $LOGDIR || mkdir -p $LOGDIR
#exec /home/scimergent/scisphere/virtual_environments/scisphere/bin/gunicorn_django -w $NUM_WORKERS \
#  --user=$USER --group=$GROUP --log-level=debug \
#  --log-file=$LOGFILE -b 0.0.0.0:8000 2>>$LOGFILE
exec python manage.py rqworker low  \
#   --user=$USER --group=$GROUP --log-level=debug \
   --log-file=$LOGFILE 2>>$LOGFILE

