# accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.contrib.auth import login as auth_login
from .models import CustomUser
from django.http import FileResponse, Http404
import os
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm
from rest_framework import status
from django.contrib.auth import authenticate 
from django.contrib.auth import logout
from .models import JobApplication
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from .profile import ProfileUpdateForm
from .permission import IsStudent,IsInterviewer
from .serializers import JobApplicationSerializer
from .models import JobPost
from django.contrib.auth import authenticate, login

User = get_user_model()
 


@method_decorator(csrf_exempt, name='dispatch')
class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        re_password = data.get('re_password')

        # Basic validation
        if not email or not password or not username or not re_password:
            return Response({'error': 'Email, username, and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        if password != re_password:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Create a new user
            user = User.objects.create_user(username=username, email=email, password=password)
            user.is_student = True
            user.save()
            

            return Response({'message': 'Account created successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Error creating user: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        
        data = request.data
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        
        response_data = {
                'message': 'Login successful as student',
                'role': 'student',
                'access': str(RefreshToken.for_user(user).access_token),
                'refresh': str(RefreshToken.for_user(user)),
        }
        return Response(response_data, status=status.HTTP_200_OK)
    
        
            

class LogutUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    
class UserView(APIView):
    
    permission_classes= [IsStudent]

    def get(self, request):
        user = request.user
        data = {'username': user.username, 'email': user.email,'first_name':user.first_name,"contact_number":user.contact_number,"gender":user.gender,'last_name':user.last_name,'skills':user.skills,'score':user.score} 
        return Response(data) 
    
@method_decorator(csrf_exempt, name='dispatch')
class UpdateProfile(APIView):
    permission_classes = [IsStudent]

    def put(self, request):
        user = request.user

        # Get new values from request or keep the existing ones
        contact_number = request.data.get('contact_number', user.contact_number)
        gender = request.data.get('gender', user.gender)
        first_name = request.data.get('first_name', user.first_name)
        last_name = request.data.get('last_name', user.last_name)
        skills = request.data.get('skills', user.skills)
        score = request.data.get('score', user.score)

        # Update user fields with new values
        user.contact_number = contact_number
        user.gender = gender
        user.first_name = first_name
        user.last_name = last_name
        user.skills = skills
        user.score = score

        # Save the updated user object
        user.save()

        # Prepare the updated data to return in the response
        data = {
            'username': user.username,
            'email': user.email,
            'contact_number': user.contact_number,
            'gender': user.gender,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'skills': user.skills,
            'score': user.score
        }

        print(data)  # Log updated data (for debugging)

        return Response({
            'message': 'Profile updated successfully!',
            'user': data
        }, status=status.HTTP_200_OK)
  



class PostJob(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

        if not request.user.is_interviewer:
            return Response({'error': 'Only interviewers can post jobs.'}, status=status.HTTP_403_FORBIDDEN)
        jobs=JobPost.objects.all()
        job_list=[]
        for job in jobs:
            job_data = {
                    'id': job.id,
                    'companyname': job.companyname,
                    'title': job.title,
                    'requirements': job.requirements,
                    'description': job.description,
                    'location': job.location,
                    'skills': job.skills,
                    'created_by': job.created_by.username, 
                }
            job_list.append(job_data)
        return Response(job_list)



    def post(self, request):
        # Log user information for debugging
        print(f"User: {request.user}")
        print(f"Is Interviewer: {getattr(request.user, 'is_interviewer', 'Attribute not found')}")

        # Ensure the user is authenticated and is an interviewer
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)

        if not request.user.is_interviewer:
            return Response({'error': 'Only interviewers can post jobs.'}, status=status.HTTP_403_FORBIDDEN)

        # Get data from request
        company_name = request.data.get('company_name',"")  # This field is now being retrieved
        title = request.data.get('job_title',"")
        description = request.data.get('job_description',"")
        requirements = request.data.get('requirements',"")
        skills = request.data.get('skills_required',"")
        location = request.data.get('location', "")  # Default to an empty string if not provided

        # Validate required fields
        errors = {}
        if not company_name:
            errors['company_name'] = "This field is required."
        if not title:
            errors['title'] = "This field is required."
        if not description:
            errors['description'] = "This field is required."
        if not requirements:
            errors['requirements'] = "This field is required."
        if not skills:
            errors['skills'] = "This field is required."

        # If there are validation errors, return them
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)
        print(company_name,title,description,requirements,location,skills,request.user)
        try:
            # Create the job post and associate it with the current interviewer
            job = JobPost.objects.create(
                companyname=company_name,  # Correct field name (with underscore)
    title=title,
    description=description,
    requirements=requirements,
    skills=skills,
    location=location,
    created_by=request.user  # Associate the job post with the logged-in interviewer
            )

            # Return success message if the job is created
            return Response({"success": "Job posted successfully."}, status=status.HTTP_201_CREATED)

        
        
        except Exception as e:
            # Handle any other errors that might occur
            return Response({'error': f'Error posting job: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





class InterviewLogin(APIView):
    def post(self, request):
        if request.method == 'POST':
            # Retrieve the form data
            data = request.data
            username = data.get('username')
            password = data.get('password')
            print(username,password)
            # Authenticate the user
            user = authenticate(request, username=username, password=password)

            # Check if the user is valid
            if user is not None and user.is_interviewer:
                # Log the user in
                login(request, user)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
        
                response_data = {
                        'message': 'Login successful as Interviewer',
                        'access': str(RefreshToken.for_user(user).access_token),
                        'refresh': str(RefreshToken.for_user(user)),
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                # Return JSON response for failure
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class FacultyLogin(APIView):
    
    def post(self, request):
        if request.method == 'POST':
            
            data = request.data
            username = data.get('username')
            password = data.get('password')
            
            # Authenticate the user
            user = authenticate(request, username=username, password=password)
            
            # Check if the user is valid
            if user is not None and user.is_faculty:
                
                login(request, user)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
        
                response_data = {
                        'message': 'Login successful as Interviewer',
                        'access': str(RefreshToken.for_user(user).access_token),
                        'refresh': str(RefreshToken.for_user(user)),
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                # Return JSON response for failure
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request):
        if request.user.is_faculty:
            job_applicants = JobApplication.objects.all()  # Fetch all applications
            job_applied=[]
            for application in job_applicants:
                job = application.job  
                student = application.student  
                student_data = {
                    'username': student.username,
                    'first_name':student.first_name,
                    'last_name':student.last_name,
                
                'contact_number': student.contact_number,
                'gender': student.gender,
                
                
                
                        
                }

                application_data = {
                    'application_id': application.id,
                    'student': student_data,  
                    'job_title': job.title,
                    'companyname': job.companyname,
                    'status': application.status,
                }
                job_applied.append(application_data)
            return Response(job_applied, status=200)
        else:
            return Response("login as staff to access")



class GetJobs(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        if request.user.is_student:
            jobs=JobPost.objects.all()
            applied_jobs = JobApplication.objects.filter(student=request.user).values_list('job', flat=True)
            non_applied_jobs = jobs.exclude(id__in=applied_jobs)
            job_list = []
            
            for job in non_applied_jobs:
                job_data = {
                    'id': job.id,
                    'companyname': job.companyname,
                    'title': job.title,
                    'requirements': job.requirements,
                    'description': job.description,
                    'location': job.location,
                    'skills': job.skills,
                    'created_by': job.created_by.username, 
                    
                }
                job_list.append(job_data)
            return Response(job_list)
        else:
            return("erorr")








class AppliedJobs(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request, job_id):
        if request.user.is_student:
            try:
                job = JobPost.objects.get(id=job_id)  
            except JobPost.DoesNotExist:
                return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
            
            resume = request.FILES.get('resume')  # Get the uploaded resume file

            if not resume:
                return Response({"detail": "Resume is required to apply for the job."}, status=status.HTTP_400_BAD_REQUEST)

           
            application = JobApplication.objects.create(
                student=request.user, 
                job=job,
                status='Pending',
                resume=resume
            )
            
            
            serializer = JobApplicationSerializer(application)
            return Response(serializer.data, status=status.HTTP_201_CREATED)









class JobApplicationStatusUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        if request.user.is_interviewer:
            # Get all job applications
            applications = JobApplication.objects.all()
            pending_jobs = applications.filter(status='Pending')
            application_list = []
            for application in pending_jobs:
                job = application.job  # Get the job associated with the application
                student = application.student  # Get the student who applied
                
                # You can include more details from the student model here
                student_data = {
                    'username': student.username,
                'email': student.email,
                'contact_number': student.contact_number,
                'gender': student.gender,
                'first_name': student.first_name,
                'last_name': student.last_name,
                'skills': student.skills,
                'score': student.score,
                'resume':application.resume.name.split('/')[-1] if application.resume else None
                
                        
                }

                application_data = {
                    'application_id': application.id,
                    'student': student_data,  
                    'job_title': job.title,
                    'companyname': job.companyname,
                    'status': application.status,
                }
                application_list.append(application_data)

            return Response(application_list, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Not authorized to view or update applications."}, status=status.HTTP_403_FORBIDDEN)

    def put(self, request, job_id):
        
        if request.user.is_interviewer:
            try:
                application = JobApplication.objects.get(id=job_id)
            except JobApplication.DoesNotExist:
                return Response({"detail": "Job application not found."}, status=status.HTTP_404_NOT_FOUND)

            # Get the status from the request data
            appplication_Status = request.data.get('status')
            

            
            if appplication_Status not in ['Pending', 'Accepted', 'Declined']:
                return Response({"detail": "Invalid status. Valid options are 'Pending', 'Accepted', or 'Declined'."}, status=status.HTTP_400_BAD_REQUEST)

            # Update the status of the job application
            application.status = appplication_Status
            application.save()

            return Response({"detail": "Job application status updated successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Not authorized to update application status."}, status=status.HTTP_403_FORBIDDEN)


class StudentJobStatus(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        applied_jobs = JobApplication.objects.filter(student=request.user)
        serializer = JobApplicationSerializer(applied_jobs, many=True)
        return Response(serializer.data)



def serve_media(request, path):
    # The `path` variable will contain the part of the URL after `/media/`
    file_path = os.path.join(settings.MEDIA_ROOT, path)

    # Check if the file exists
    if os.path.exists(file_path):
        # Serve the file
        return FileResponse(open(file_path, 'rb'), content_type='application/octet-stream')  # Use the correct MIME type
    else:
        # If the file doesn't exist, raise a 404 error
        raise Http404("File not found.")
    

