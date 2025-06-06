'''from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.hashers import make_password
from .models import CustomUser, JobPost, Interviewer

# Student SignUp Form
class StudentSignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)
    contact_number = forms.CharField(required=False)
    gender = forms.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], required=False)
    
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password1', 'password2', 'contact_number', 'gender']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_student = True  # Ensure the user is marked as a student
        if commit:
            user.save()
        return user

# Job Post Form
class JobPostForm(forms.ModelForm):
    class Meta:
        model = JobPost
        fields = ['title', 'description', 'requirements', 'skills']

    def save(self, interviewer, commit=True):
        job = super().save(commit=False)
        job.created_by = interviewer  # Automatically assign the interviewer
        if commit:
            job.save()
        return job

# Interviewer Form
class InterviewerForm(forms.ModelForm):
    class Meta:
        model = Interviewer
        fields = ['username', 'password', 'is_interviewer']

    def save(self, commit=True):
        interviewer = super().save(commit=False)
        # Hash the password before saving it
        interviewer.password = make_password(self.cleaned_data['password'])
        if commit:
            interviewer.save()
        return interviewer
'''