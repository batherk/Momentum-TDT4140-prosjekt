# MOMENTUM

How to install:

```

Depending on the python installed on your computer, python may be used by one of these names
"python", "py", "python3". We are going to use "python" in this readme.

cd to/my/folder

git clone https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-42.git

#Install and start virtual environment
pip install virtualenv
or
python -m pip install virtualenv

virtualenv env
Windows: source env/Scripts/activate
Mac/Linux: source env/bin/activate

----BACKEND----

cd backend

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