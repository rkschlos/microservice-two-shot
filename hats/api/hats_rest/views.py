from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from .models import Hat

# Create your views here.

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style",
        "color",
        "picture_url",
    ]

@require_http_methods(["GET", "POST"])
def api_list_hats(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatListEncoder,
            safe=False,
        )
