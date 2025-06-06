from django.urls import path,re_path
from .views import RegisterUserView,LoginUserView,LogutUserView,UserView,UpdateProfile,PostJob,InterviewLogin,GetJobs,AppliedJobs,JobApplicationStatusUpdate,StudentJobStatus,FacultyLogin
from django.conf.urls.static import static
from django.conf import settings
from .views import serve_media

urlpatterns = [
    path('signup', RegisterUserView.as_view(), name='register_user'),
    path('login',LoginUserView.as_view(),name='login_user'),
    path('logout',LogutUserView.as_view(),name='logout_user'),
    path('user',UserView.as_view(),name='user_view'),
    path('profile',UpdateProfile.as_view(),name='profile-update'),
    path('jobpost',PostJob.as_view(),name='for Job posting'),
    path('jobposted',PostJob.as_view(),name='for Job posting'),
    path('interview-login',InterviewLogin.as_view(),name='interview login'),
    path('faculty-login',FacultyLogin.as_view(),name="Faculty to login"),
    path('getjobs',GetJobs.as_view(),name="Jobdata"),
    path('apply/<int:job_id>',AppliedJobs.as_view(),name="handleappliedjobs"),
    path('applicants',JobApplicationStatusUpdate.as_view(),name="handlejobapplication"),
    path('applicants/<int:job_id>/status',JobApplicationStatusUpdate.as_view(),name="handlejobapplication"),
    path('student-application-status',StudentJobStatus.as_view(),name="returns status of jobs"),
     re_path(r'^media/(?P<path>.*)$', serve_media, name='serve_media'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)