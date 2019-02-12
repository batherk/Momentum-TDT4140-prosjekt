from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    info = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Position(models.Model):
    name = models.CharField(max_length=50)
    company = models.ForeignKey(Company, related_name='positions', on_delete=models.CASCADE)
    description = models.CharField(max_length=300)

    def __str__(self):
        return self.name


