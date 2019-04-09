# MOMENTUM

This project is a website where startups and job applicants can connect, and
this document describes how to get the website up and running.


Depending on the python installed on your computer, python may be used by one of these names
"python", "py", "python3". We are going to use "python" in this readme. However a python 
version of at least 3.7.0 is required

## How to download this project


Open a terminal

```
cd to/my/folder

git clone https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-42.git

```

## How to install backend (required)
In the same terminal

```
cd backend
```

Install and start virtual environment
```
pip install virtualenv
or
python -m pip install virtualenv

virtualenv env

Windows: source env/Scripts/activate
Mac/Linux: source env/bin/activate
```

Install required python libraries

```
pip install -r requirements.txt
or
python -m pip install -r requirements.txt
```

Handle migrations in database

```
python manage.py makemigrations
python manage.py migrate
```

Start server
```
python manage.py runserver
```

Backend is now running on http://localhost:8000/. Visit this page to play around with the api

Visit http://localhost:8000/admin to open the admin panel

## How to install frontend (required)

Open another terminal
```
cd to/my/folder/frontend

npm install
```
Start server
```
npm start
```

Frontend is now running on http://localhost:3000/. Visit this page to see the actual website

## How to run tests (optional)


