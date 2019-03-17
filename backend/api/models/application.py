from django.db import models
from .position import Position
from .user import User


class Application(models.Model):
    text = models.CharField(max_length=1000)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "Søker: " + str(self.user) + ", Stilling: " + str(self.position)
