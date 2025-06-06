from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom User Model extending AbstractUser
class CustomUser(AbstractUser):
    
    is_student = models.BooleanField(default=False)
    is_interviewer = models.BooleanField(default=False)
    is_faculty=models.BooleanField(default=False)
    contact_number = models.CharField(max_length=15, null=True, blank=True)
    gender = models.CharField(max_length=15, null=True, blank=True)
    skills = models.JSONField(default=list, blank=True)  # List of skills for students
    score = models.CharField(max_length=5, null=True, blank=True)  # Score for students
    applied_jobs = models.ManyToManyField('JobPost', blank=True, related_name='applicants')
    def __str__(self):
        return self.username


# Job Post Model
class JobPost(models.Model):
    companyname = models.CharField(max_length=100,default="")  # Job title
    title= models.CharField(max_length=50,default="") # Job description
    requirements = models.TextField()
    description = models.TextField() 
    location=models.CharField(max_length=50,default="")
      # Job requirements
    skills = models.TextField() # Required skills for the job, as a list
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="posted_jobs")  # Link to Interviewer (CustomUser with is_interviewer=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Date and time the job was posted

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="applications")  
    job = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name="applications")  
    status_choices = [
        ('Pending', 'Pending'),
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected')
    ]
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    status = models.CharField(max_length=10, choices=status_choices, default='Pending')  # Status of the application

    def __str__(self):
        return f"{self.student.username} - {self.job.title} - {self.status}"