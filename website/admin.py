from django.contrib import admin
from .models import ContactSubmission, Testimonial


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'company', 'submitted_at']
    list_filter = ['submitted_at']
    search_fields = ['name', 'email', 'company']
    readonly_fields = ['submitted_at']
    ordering = ['-submitted_at']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'company', 'rating', 'is_featured', 'created_at']
    list_filter = ['rating', 'is_featured', 'created_at']
    search_fields = ['client_name', 'company']
    list_editable = ['is_featured']
    ordering = ['-created_at']