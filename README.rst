SciSphere
=======


Installation
------------

Install system libraries and start services:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: sh

    $ sudo apt-get update
    $ sudo apt-get upgrade
    $ sudo apt-get install default-jre gcc git python-dev python-virtualenv libjpeg-dev libfreetype6-dev zlib1g-dev rabbitmq-server


Set up a new virtual environment:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: sh

    $ mkdir ~/virtual_environments
    $ cd ~/virtual_environments
    $ virtualenv --no-site-packages scisphere
    $ source scisphere/bin/activate

Make directory structure and clone scisphere:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: sh

    $ mkdir -p ~/scisphere
    $ cd ~/scisphere
    $ git clone git://github.com/rjawahar/scisphere-web.git
    $ git submodule init
    $ git submodule update

Install requirements:
^^^^^^^^^^^^^^^^^^^^^

(NB: there is a known bug that prevents numpy from installing correctly when in requirements.pip file)

.. code-block:: sh

    $ pip install numpy  --use-mirrors
    $ pip install -r requirements.pip

(NB: PIL under virtualenv usually does not have some codecs compiled| to make sure jpeg codec is included)

.. code-block:: sh

    $ sudo ln -s /usr/lib/x86_64-linux-gnu/libfreetype.so /usr/lib/
    $ sudo ln -s /usr/lib/x86_64-linux-gnu/libz.so /usr/lib/
    $ sudo ln -s /usr/lib/x86_64-linux-gnu/libjpeg.so /usr/lib/
    $ pip install -r requirements.pip

(OPTIONAL) For MySQL, s3, ses:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: sh

    # apt-get install libmysqlclient-dev mysql-server
    $ pip install -r requirements-mysql.pip

NOTE: If you inted to use special characters from other languages within your forms, or are unsure if you will, you shoud ensure your databse uses the utf-8 characterset by default e.g. for mysql

.. code-block:: sh

    $ mysql> CREATE DATABASE scisphere CHARACTER SET utf8;
    $ pip install -r requirements-s3.pip
    $ pip install -r requirements-ses.pip

Create a database and start server:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    create or update your local_settings.py file

.. code-block:: sh

    $ python manage.py syncdb --noinput
    $ python manage.py migrate


    optional: create a super user

.. code-block:: sh

    $ python manage.py createsuperuser


(OPTIONAL) Apache and system administration tools:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: sh

    $ sudo apt-get install apache libapache2-mode-wsgi
    $ sudo apt-get install htop monit

And now you should be ready to run the server:

.. code-block:: sh

    $ python manage.py runserver

Running Tests
-------------

To run all tests enter the following:

.. code-block:: sh

    $ python manage.py test

To run the tests for a specific app, e.g. main, enter:

.. code-block:: sh

    $ python manage.py test main

To run the test for a specific class in a specific app, e.g. the class ``TestFormErrors`` in main, enter:

.. code-block:: sh

    python manage.py test main.TestFormErrors

To run the test for a specific method in a specific class in a specific app, e.g. the method ``test_submission_deactivated`` in the class ``TestFormErrors`` in main, enter:

.. code-block:: sh

    $ python manage.py test main.TestFormErrors.test_submission_deactivated

To run javascript tests enter the following, NOTE that the testDir and configFile paths are relative to the js_tests/EnvJasmine directory:

.. code-block:: sh

    $ ./js_tests/EnvJasmine/bin/run_all_tests.sh --testDir=../ --configFile=../env_jasmine.conf.js

