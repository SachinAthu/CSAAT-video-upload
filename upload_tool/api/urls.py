from django.urls import path

from .views import welcome, profiles, profile, addProfile, updateProfile, deleteProfile, deleteProfiles

urlpatterns = [
    path('', welcome, name='welcome'),

    path('profiles/', profiles, name='profiles'),
    path('profile/<str:pk>/', profile, name='profile'),
    path('add-profile/', addProfile, name='add-profile'),
    path('update-profile/<str:pk>/', updateProfile, name='update-profile'),
    path('delete-profile/<str:pk>/', deleteProfile, name='delete-profile'),
    path('delete-profiles/', deleteProfiles, name='delete-profiles'),
]