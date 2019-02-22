from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name
    @property
    def is_business_owner(self):
        return self.name == "Business Owner"

    @property
    def is_investor(self):
        return self.name == "Investor"

    @property
    def is_applicant(self):
        return self.name == "Applicant"

