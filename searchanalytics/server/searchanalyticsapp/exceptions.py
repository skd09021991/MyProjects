"""
Author: Siddhant Tyagi
Date Created: Nov 21, 2019
Last Modified: Nov 21, 2019
Last Modified By: Siddhant Tyagi

Description: Contains custom exception classes to be used/raised in called methods, to be caught in view methods/classes
"""


class RequiredFieldException(Exception):
    """
    Exception if the given field is not present in the request body
    """

    def __init__(self, message, status_code):
        self.message = message
        self.status_code = status_code


class RecaptchaException(Exception):
    """
    Exception if the recaptcha response code verification fails
    """

    def __init__(self, message, status_code):
        self.message = message
        self.status_code = status_code
