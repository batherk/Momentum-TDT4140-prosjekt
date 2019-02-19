from django.db import models
from .company import Company


class Position(models.Model):
    name = models.CharField(max_length=50)
    company = models.ForeignKey(Company, related_name='positions', on_delete=models.CASCADE)
    description = models.CharField(max_length=300)

    def __str__(self):
        return self.name
