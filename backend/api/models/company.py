from django.db import models
from api.models.user import *
from django.template.defaultfilters import slugify


class Company(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    #slug = models.SlugField()
    owner = models.ForeignKey(User, on_delete=models.SET(None),related_name='company',null=True)
    info = models.TextField(max_length=500)

    def __str__(self):
        return self.name

    #def save(self, *args, **kwargs):
     #   self.slug = slugify(self.name)
     #   super(Company, self).save(*args, **kwargs)


