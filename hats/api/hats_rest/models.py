from django.db import models
from django.urls import reverse
# from wardrobe.api.wardrobe_api.models import Location

# Create your models here.

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

    def ___str__(self):
        return self.closet_name

class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style = models.CharField(max_length=100)
    color = models.CharField(max_length=100)

    picture_url = models.URLField(null=True, blank=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def get_api_url(self):
        return reverse("api_list_hats", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.fabric}, {self.style}, {self.color}"

    class Meta:
        ordering = ("fabric", "style", "color", "picture_url")