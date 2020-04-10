"""
Author: Siddhant Tyagi
Date Created: Nov 21, 2019
Last Modified: Nov 21, 2019
Last Modified By: Siddhant Tyagi

Description: Utility/Helper methods
"""

import requests
from rest_framework import status
from django.conf import settings
from .exceptions import (
    RequiredFieldException,
    RecaptchaException
)


def check_recaptcha(data, required_field):
    """
    Check if recaptcha_response is present in the request body and verify its authenticity,
    raise exceptions in case its not
    :arg data: request body from the view
    :arg required_field: required field name to be check against
    :return True if everything works as expected else raise an exception
    """

    if required_field not in data:
        raise RequiredFieldException(message={'message': 'Captcha not present in the request'},
                                     status_code=status.HTTP_400_BAD_REQUEST)

    captcha_response = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        data={
            "secret": settings.RECAPTCHA_SECRET,
            "response": data[required_field]
        }
    )

    # Raise exception if invalid re captcha response
    print(captcha_response.json())
    if not captcha_response.json().get('success', False):
        raise RecaptchaException(message={"message": "BOT DETECTED"},
                                 status_code=status.HTTP_400_BAD_REQUEST)
    else:
        return True
