from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm
from .models import Testimonial


def home(request):
    """Homepage view"""
    return render(request, 'website/home.html')


def services(request):
    """Services page view"""
    return render(request, 'website/services.html')


def use_cases(request):
    """Use cases page view"""
    return render(request, 'website/use_cases.html')


def about(request):
    """About page view"""
    return render(request, 'website/about.html')


def contact(request):
    """Contact page view with form handling"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Save the form
            contact_submission = form.save()
            
            # Send email notification (optional)
            try:
                send_mail(
                    subject=f'New Contact Form Submission from {contact_submission.name}',
                    message=f"""
                    New contact form submission:
                    
                    Name: {contact_submission.name}
                    Email: {contact_submission.email}
                    Company: {contact_submission.company}
                    Message: {contact_submission.message}
                    """,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=['contact@nodewiz.ai'],
                    fail_silently=True,
                )
            except Exception:
                pass  # Don't let email failures break the form submission
            
            messages.success(request, 
                'Thank you for your message! We\'ll get back to you within 24 hours.')
            return redirect('contact')
    else:
        form = ContactForm()
    
    return render(request, 'website/contact.html', {'form': form})


def testimonials_view(request):
    """Testimonials page view"""
    testimonials = Testimonial.objects.filter(is_featured=True)[:6]
    return render(request, 'website/testimonials.html', {'testimonials': testimonials})