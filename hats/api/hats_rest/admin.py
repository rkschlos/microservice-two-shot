from django.contrib import admin

from .models import Hat

# Register your models here.

class HatAdmin(admin.ModelAdmin):
    pass

admin.site.register(Hat, HatAdmin)