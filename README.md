# MOMENTUM

How to install:

```

Depending on the python installed on your computer, python may be used by one of these names
"python", "py", "python3". We are going to use "python" in this readme.

cd to/my/folder

git clone https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-42.git


----BACKEND----

cd backend

#Install and start virtual environment

pip install virtualenv
or
python -m pip install virtualenv

virtualenv env

Windows: source env/Scripts/activate
Mac/Linux: source env/bin/activate


#Install required python libraries

pip install -r requirements.txt
or
python -m pip install -r requirements.txt

#Handle migratiosn in database

python manage.py makemigrations
python manage.py migrate

#Start server

python manage.py runserver


----FRONTEND----
Open another terminal

cd frontend

npm install

#start server

npm start

```

----TESTING----
#Running tests locally

Open terminal

cd backend

python manage.py test

#Running tests on gitlab

Make sure you have active runners installed in gitlab, either by setting them up manually or using the shared runners

On gitlab, go to settings -> CI/CD, click expand on runners

Check if you have any active shared runners
I
If you do you're all set and if you don't you'll have to manually set up a runner by following the instructions given on gitlab

The tests will automatically run on the available runners every time a commit is pushed to gitlab