from django.contrib import admin
from .models import CustomUser,JobPost,JobApplication

admin.site.register(CustomUser)

admin.site.register(JobPost)
admin.site.register(JobApplication)