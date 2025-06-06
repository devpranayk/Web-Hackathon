from rest_framework import serializers
from .models import JobApplication

class JobApplicationSerializer(serializers.ModelSerializer):
    
    
    title = serializers.CharField(source='job.title', read_only=True)
    company_name = serializers.CharField(source='job.companyname', read_only=True)
    
    class Meta:
        model = JobApplication
        fields = ['student', 'job', 'status', 'title', 'company_name']
        read_only_fields = ['student', 'status']
   