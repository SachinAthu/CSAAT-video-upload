from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Videos, Sessions
from api.serializers import VideosSerializer

# get all videos for a session
@api_view(['GET'])
def sessionVideos(request, pk):
    session = Sessions.objects.get(id=pk)
    video_list = Videos.objects.filter(session__exact=session)
    serializer = VideosSerializer(video_list, many=True)
    return Response(serializer.data)

# add video
@api_view(['POST'])
def addVideo(request):
    serializer = VideosSerializer(data=request.data)

    if serializer.is_valid():
        # should create a thumbnail before save
        ##
        serializer.save()

    return Response(serializer.data)

# edit a video
@api_view(['PUT'])
def updateVideo(request, pk):
    video = Videos.objects.get(id=pk)
    serializer = VideosSerializer(data=request.data, instance=video)

    if serializer.is_valid():
        # should create a thumbnail before save if video changed
        ##
        serializer.save()

    return Response(serializer.data)

# delete a video
@api_view(['DELETE'])
def deleteVideo(request, pk):
    video = Videos.objects.get(id=pk)
    video.delete()

    return Response('Video was deleted')

# delete all videos
@api_view(['DELETE'])
def deleteVideos(request):
    Videos.objects.all().delete()

    return Response('All Videos were deleted')