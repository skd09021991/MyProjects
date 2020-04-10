from django.db import models
from django_mysql.models import JSONField
from django.contrib.auth.models import AbstractUser, BaseUserManager

OAUTH_SERVER = (
    ('google', 'Google'),
    ('facebook', 'Facebook'),
)

GENDER = (
    ('male', 'Male'),
    ('female', 'Female'),
    ('others', 'Others'),
)


class IntelliaptUserManager(BaseUserManager):
    """
    Defining a model manager for our custom User model - IntelliaptUser
    This is just to make the create_super user functionality available
    """

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """

        if not email:
            raise ValueError('Email field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        if not password or extra_fields.get('is_superuser'):
            user.set_password(password)
        else:
            user.password = password
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a  IntelliaptUser with the given email and password.
        Not being used currently.
        """

        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class IntelliaptUser(AbstractUser):
    username = None
    first_name = models.CharField(max_length=60, blank=False)
    last_name = models.CharField(max_length=60, blank=True)
    email = models.EmailField(blank=False, unique=True)
    gender = models.CharField(max_length=10, blank=False, choices=GENDER)
    mobile_number = models.CharField(max_length=20, blank=True, null=True)
    activation_key = models.CharField(max_length=255, blank=True, null=True)
    password_reset_key = models.CharField(max_length=255, blank=True, null=True)
    mobile_otp = models.CharField(max_length=255, blank=True, null=True)
    is_oauth = models.BooleanField(default=False, blank=False)
    oauth_server = models.CharField(max_length=20, blank=True, null=True, choices=OAUTH_SERVER)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True, blank=False)
    phone_verified = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'is_oauth']

    objects = IntelliaptUserManager()

    def __unicode__(self):
        return "%s, %s" % (self.email, self.is_staff)


class SearchMetricsModel(models.Model):
    metric_date = models.DateField(blank=False, null=False, primary_key=True)
    metric = JSONField(blank=False, null=False)