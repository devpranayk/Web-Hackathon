# Generated by Django 5.1.4 on 2025-01-06 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_customuser_is_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobpost',
            name='companyname',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='jobpost',
            name='location',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='title',
            field=models.CharField(default='', max_length=50),
        ),
    ]
