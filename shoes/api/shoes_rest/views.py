from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.shortcuts import render
from common.json import ModelEncoder
from .models import Shoe

# Create your views here.
#making encoders to use in view functions

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model", "color"]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model",
        "manufacturer",
        "color",
        "picture_url",
    ]

def api_list_shoes(request):
    shoes = Shoe.objects.all()
    return JsonResponse(
        {"shoes": shoes}, 
        encoder=ShoeListEncoder
    )