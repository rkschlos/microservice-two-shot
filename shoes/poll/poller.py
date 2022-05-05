import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
from shoes_rest.models import BinVO
# from shoes_rest.models import Something

def get_bin():
    response = requests.get("http://wardrobe-api:8000/api/bins/")
    content = json.loads(response.content)
    print("content", content)
    for bin in content["bins"]:
        BinVO.objects.update_or_create(
            import_href = bin["href"],
            defaults={"closet_name": bin["closet_name"]},
        )
        print (bin)

def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            get_bin()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
