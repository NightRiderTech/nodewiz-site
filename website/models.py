from django.db import models
from django.core.validators import EmailValidator


class ContactSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(validators=[EmailValidator()])
    company = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"
        ordering = ["-submitted_at"]

    def __str__(self) -> str:  # noqa: D401 - simple, clear representation
        return f"{self.name} <{self.email}>"


class Testimonial(models.Model):
    RATING_CHOICES = [(i, i) for i in range(1, 6)]

    client_name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100, blank=True)
    testimonial_text = models.TextField()
    rating = models.IntegerField(choices=RATING_CHOICES, default=5)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:  # noqa: D401 - simple, clear representation
        return f"{self.client_name} ({self.company})"

