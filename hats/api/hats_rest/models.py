from django.db import models
from django.urls import reverse
# from wardrobe.api.wardrobe_api.models import Location

# Create your models here.

class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)
    # location = models.ForeignKey(
    #     Location,
    #     related_name="+",
    #     on_delete=models.CASCADE,
    # )

    def get_api_url(self):
        return reverse("api_location", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.fabric}, {self.style}, {self.color}"

    class Meta:
        ordering = ("fabric", "style", "color", "picture_url")