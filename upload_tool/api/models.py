from django.db import models

# video profile of a child
class Profiles(models.Model):
    clinic_no = models.CharField(max_length=50, blank=False, null=False, unique=False) # has to be unique true. for development only.
    name = models.CharField(max_length=200, blank=False, null=False)
    dob = models.DateField(auto_now=False, auto_now_add=False, blank=True, null=True)
    sex = models.CharField(max_length=20, blank=True, null=True)
    consent_doc = models.FileField(upload_to='consent_docs', max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name


# video session
class Sessions(models.Model):
    datetime = models.DateTimeField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.datetime


# cameras
class Cameras(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    resolution = models.CharField(max_length=200, blank=True, null=True)
    megapixels = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)

    def __str__(self):
        return self.name


# all uploaded videos
class Videos(models.Model):
    profile = models.ForeignKey(Profiles, on_delete=models.CASCADE, null=True, related_name='videos')
    session = models.ForeignKey(Sessions, on_delete=models.CASCADE, null=True, related_name='videos')
    camera = models.ForeignKey(Cameras, on_delete=models.CASCADE, null=True, related_name='videos')
    name = models.CharField(max_length=200, blank=False, null=False)
    description = models.CharField(max_length=1000, blank=True, null=True)
    video = models.FileField(upload_to='videos', max_length=100, blank=True, null=True)
    thumbnail_path = models.ImageField(upload_to='thumbnails')
    extension = models.CharField(max_length=50, blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    camera_angle = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name


# edited video clips
class VideoClips(models.Model):
    video_id = models.ForeignKey(Videos, on_delete=models.CASCADE, related_name='video_clips')
    name = models.CharField(max_length=200, blank=False, null=False)
    video = models.FileField(upload_to='video_clips', max_length=100, blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)

    def __str__(self):
        return self.name



