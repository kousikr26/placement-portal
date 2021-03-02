

#!/bin/bash

NAME="placement-portal"                                  # Name of the application
DJANGODIR=/webapps/placement-portal/             # Django project directory
SOCKFILE=/webapps/placement-portal/run/gunicorn.sock  # we will communicte using this unix socket
USER=swc                                        # the user to run as
GROUP=swc                                     # the group to run as
NUM_WORKERS=10
DJANGO_SETTINGS_MODULE=placement.settings             # which settings file should Django use
DJANGO_WSGI_MODULE=placement.wsgi                     # WSGI module name

echo "Starting $NAME as $USER"

# Activate the virtual environment
cd $DJANGODIR
source ./pp-env/bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec ./pp-env/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER --group=$GROUP \
  --bind=unix:$SOCKFILE \
  --log-level=debug \
  --log-file=-
