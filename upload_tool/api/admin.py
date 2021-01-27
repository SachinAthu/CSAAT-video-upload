from django.contrib import admin

from .models import Profiles, Sessions, Cameras, Videos, VideoClips

admin.site.register(Profiles)
admin.site.register(Sessions)
admin.site.register(Cameras)
admin.site.register(Videos)
admin.site.register(VideoClips)
