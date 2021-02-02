from django.db import models
from django.contrib.auth.models import User

# video profile of a child


class Profiles(models.Model):
    # has to be unique true. for development only.
    clinic_no = models.CharField(
        max_length=50, blank=False, null=False, unique=False)
    name = models.CharField(max_length=200, blank=False, null=False)
    dob = models.DateField(
        auto_now=False, auto_now_add=False, blank=True, null=True)
    sex = models.CharField(max_length=20, blank=True, null=True)
    consent_doc = models.FileField(
        upload_to='consent_docs', max_length=100, blank=True, null=True)
    consent_doc_name = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name


# video session
class Sessions(models.Model):
    datetime = models.DateTimeField(
        auto_now=False, auto_now_add=False, blank=True, null=True)
    profile = models.ForeignKey(
        Profiles, on_delete=models.CASCADE, null=True, related_name='sessions')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True, related_name='sessions')

    def __str__(self):
        return str(self.datetime)


# cameras
class Cameras(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    resolution = models.CharField(max_length=200, blank=True, null=True)
    megapixels = models.DecimalField(
        max_digits=10, decimal_places=0, blank=True, null=True)

    def __str__(self):
        return self.name


# camera angles
class CameraAngles(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)

    def __str__(self):
        return self.name


# all uploaded videos
class Videos(models.Model):
    profile = models.ForeignKey(
        Profiles, on_delete=models.CASCADE, null=False, related_name='videos', default='')
    session = models.ForeignKey(
        Sessions, on_delete=models.CASCADE, null=False, related_name='videos', default='')
    camera = models.ForeignKey(
        Cameras, on_delete=models.CASCADE, null=True, related_name='videos')
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.CharField(max_length=1000, blank=True, null=True)
    video = models.FileField(
        upload_to='videos', max_length=100, blank=True, null=True)
    thumbnail = models.ImageField(
        upload_to='thumbnails', blank=True, null=True)
    extension = models.CharField(max_length=50, blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    camera_angle = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name


# edited video clips
class VideoClips(models.Model):
    video_id = models.ForeignKey(
        Videos, on_delete=models.CASCADE, related_name='video_clips')
    name = models.CharField(max_length=200, blank=False, null=False)
    video = models.FileField(upload_to='video_clips',
                             max_length=100, blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)

    def __str__(self):
        return self.name
