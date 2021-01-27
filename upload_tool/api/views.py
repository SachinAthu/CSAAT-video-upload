from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Profiles, Sessions, Cameras, Videos, VideoClips
from .serializers import ProfilesSerializer, SessionsSerializer, CamerasSerializer, VideosSerializer, VideoClipsSerializer

@api_view(['GET'])
def welcome(request):
    return Response({'msg': 'API working.'})


