from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Sessions
from api.serializers import SessionsSerializer

# get all sessions for a profile
@api_view(['GET'])
def sessions(request, pk):
    session_list = Sessions.objects.filter(profile=pk).order_by('-datetime')
    serializer = SessionsSerializer(session_list, many=True)
    return Response(serializer.data)

# get a specific session
@api_view(['GET'])
def session(request, pk):
    session = Sessions.objects.get(id=pk)
    serializer = SessionsSerializer(session, many=False)
    return Response(serializer.data)

# add a session
@api_view(['POST'])
def addSession(request):
    serializer = SessionsSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# delete a session
@api_view(['DELETE'])
def deleteSession(request, pk):
    session = Sessions.objects.get(id=pk)
    session.delete()

    return Response('Session was deleted')

# delete all sessions
@api_view(['DELETE'])
def deleteSessions(request):
    Sessions.objects.all().delete()

    return Response('All Sessions were deleted')


