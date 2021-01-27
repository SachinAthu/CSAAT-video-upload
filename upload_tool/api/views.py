from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Profiles, Sessions, Cameras, Videos, VideoClips
from .serializers import ProfilesSerializer, SessionsSerializer, CamerasSerializer, VideosSerializer, VideoClipsSerializer


@api_view(['GET'])
def welcome(request):
    return Response({'msg': 'API working.'})


##### profiles #####
# get all profiles
@api_view(['GET'])
def profiles(request):
    profile_list = Profiles.objects.all().order_by('clinic_no')
    serializer = ProfilesSerializer(profile_list, many=True)
    return Response(serializer.data)

# get specific profile
@api_view(['GET'])
def profile(request, pk):
    profile = Profiles.objects.get(id=pk)
    serializer = ProfilesSerializer(profile, many=False)
    return Response(serializer.data)

# add a profile
@api_view(['POST'])
def addProfile(request):
    serializer = ProfilesSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# edit a profile
@api_view(['PUT'])
def updateProfile(request, pk):
    profile = Profiles.objects.get(id=pk)
    serializer = ProfilesSerializer(data=request.data, instance=profile)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# remove a profile
@api_view(['DELETE'])
def deleteProfile(request, pk):
    profile = Profiles.objects.get(id=pk)
    profile.delete()

    return Response('Profile was deleted')

# remove all profiles
@api_view(['DELETE'])
def deleteProfiles(request):
    Profiles.objects.all().delete()

    return Response('All Profiles were deleted')


##### sessions #####



