from django.contrib import admin

# Register your models here.
from .models import Shoe, BinVO

@admin.register(Shoe)
class ShoesAdmin(admin.ModelAdmin):
    pass

@admin.register(BinVO)
class BinVOAdmin(admin.ModelAdmin):
    pass