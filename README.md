# MOMENTUM

How to install:

```
cd to/my/folder

git clone https://gitlab.stud.idi.ntnu.no/programvareutvikling-v19/gruppe-42.git

pip install virtualenv
virtualenv env
Windows: env/Scripts/activate
Mac/Linux: source env/bin/activate

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```