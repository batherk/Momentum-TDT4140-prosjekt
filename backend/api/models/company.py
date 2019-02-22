from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    info = models.CharField(max_length=500)

    def __str__(self):
        return self.name



