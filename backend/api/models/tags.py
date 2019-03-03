from api.models.user import *
from django.db import models
from django.template.defaultfilters import slugify


class Tags(models.Model):
    name = models.CharField(max_length=30)
    times_used = models.IntegerField()
    color = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    #def save(self, *args, **kwargs):
    #    slug = slugify(self.name)
    #    num_existing = Company.objects.filter(slug=slug).count()
    #    if num_existing > 0:
    #        slug = "{}-{}".format(slug, num_existing + 1)
    #    self.slug = slug
    #    return super(Company, self).save(*args, **kwargs)
