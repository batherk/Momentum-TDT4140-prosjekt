from api.models.user import *
from django.db import models
from django.template.defaultfilters import slugify


class Company(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    slug = models.SlugField(unique=True,editable=False)
    owner = models.ForeignKey(User, on_delete=models.SET(None), related_name='company', null=True)
    certified = models.BooleanField(default=False,null=False)
    info = models.TextField(max_length=500)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        slug = slugify(self.name)
        num_existing = Company.objects.filter(slug=slug).count()
        if num_existing > 0:
            slug = "{}-{}".format(slug, num_existing + 1)
        self.slug = slug
        return super(Company, self).save(*args, **kwargs)
