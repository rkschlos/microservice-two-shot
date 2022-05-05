from django.db import models
from django.urls import reverse

class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()


# Create your models here.
class Shoe(models.Model):

    model = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=50)
    color = models.CharField(max_length= 50)

    picture_url = models.URLField(null=True)

    # shoe_bin = models.ForeignKey(
    #     BinVO, 
    #     related_name = "shoes", 
    #     on_delete=models.CASCADE,
    #     null=True
    # )

    def get_api_url(self):
       return reverse("api_show_shoe", kwargs= {"pk": self.pk})
    
    def __str__(self):
        return self.model

    class Meta:
        ordering = ("model",)

