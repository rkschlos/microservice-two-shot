from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.shortcuts import render
from common.json import ModelEncoder
from .models import Shoe
#BinVO

# Create your views here.
#making encoders to use in view functions
# class BinVOEncoder(ModelEncoder):
#     model= BinVO
#     properties = ["id"]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model", "color", "manufacturer"]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model",
        "manufacturer",
        "color",
        "picture_url",
        # "shoe_bin",
    ]
    # encoders = {
    #     "shoe_bin": BinVOEncoder(),
    # }

@require_http_methods(["GET", "POST"])
def api_list_shoes(request):

    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes}, 
            encoder=ShoeListEncoder,
        )
    else:  # POST
        content = json.loads(request.body)

        #Get the shoe object and put it in the content dict
        # try: 
        #     shoe_bin = BinVO.objects.get(id=content["shoe_bin"])
        #     print("shoe_bin")
        #     #content["shoe_bin"] = shoe_bin
        # except BinVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid bin id"}, 
        #         status = 400,
        #     )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe, 
            encoder = ShoeDetailEncoder,
            safe=False,
        )
        