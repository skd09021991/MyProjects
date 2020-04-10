import time
# import sys
import json
import logging

from datetime import datetime
import selenium 
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import WebDriverException, NoSuchElementException, \
    TimeoutException, UnexpectedAlertPresentException, NoAlertPresentException, StaleElementReferenceException

from module_wrappers import find
from module_tests import  form_tests

# from test_forms.module_wrappers import find
# from test_forms.module_tests import form_tests


logging.basicConfig( filename='e2e_python.log', level=logging.INFO )

now = datetime.now()
current_time = now.strftime("%H:%M:%S")


logging.info(current_time + '::   ==================================================================NEW-RUN' )

driver = webdriver.Chrome()
driver.maximize_window()

#===========================================================================================
    # form defintion req as argument for form_rendered_test 
#===========================================================================================
form_definition =  {
    "form_selectors":{  "id":"signupForm" },
    "methods_allowed":["POST"],
    "form_elements":[
        {"element_selectors":{"i":"firstName","id":"firstName", "name":"firstName" },   "type":"text",     "expect_attribute":[ {"name":"firstName"},   {"placeholder":"First Name" }    ] },
        {"element_selectors":{"id":"lastName"},                                         "type":"text",     "expect_attribute":[ {"name":"lastName"},    {"placeholder":"LUst Name" }   ]  },
        {"element_selectors":{"id":"email"},                                            "type":"email",    "expect_attribute":[ {"name":"email"},       "placeholder" ]    },
        {"element_selectors":{"name":"password", "id":"password"},                      "type":"password", "expect_attribute":[ {"name":"password"},    "placeholder" ] },
        {"element_selectors":{"id":"radioMale"},                                        "type":"radio",    "expect_attribute":[ {"name":"gender"},      "placeholder" ]   },
        {"element_selectors":{"id":"radioFemale"},                                      "type":"radio" },
        {"element_selectors":{"id":"signupButton"},                                      "type":"submit",   "expect_attribute":[ {"type":"submit"},      "placeholder" ]    },
        {"element_selectors":{'id':'cars'} , "expect_attribute": {"type":"submit"} }
    ], 
}

input_details =  {
    "form_selectors":{ "id":"signupForm" },
    "inputs":[
        {
            "firstName"   :  'abhishek~~~~~+$$$$',
            "signupButton": "",
            "lastName"    :   'yadav',
            "codeNames"   :   'alfa',
            "email"       :   'abhishke@gmail.com',
            "password"    :   'slkadfadfadf',
            "radioMale"   :   "", 
            'cars'        : ['volo','audi'],
            "file"        : "/home/abhishek/Downloads/Progressive Image Loading.pdf",
            "secretName"  :   'Abhishe',
        },
        {
            "firstName"   :   'santosh~~~~~+$$$$',
            "signupButton": "",
            "lastName"    :   'kapoor',
            "codeNames"   :   '',
            "email"       :   'abhi@gmail.com',
            'cars'        : ['volvo','rche'],
            "password"    :   25455444523,
            "file"        : "/home/abhishek/Downloads/Progressive Image Loading.pdf",
            "radioFemale" :   "",
            "secretName"  :   'Santosh',
        },
        {
            "firstName"   :   'shakeer~~~~~+$$$$',
            "lastName"    :   'bhai',
            "codeNames"   :   'charlie',
            "email"       :   '5452156@gmail.com',
            "file"        : "/home/abhishek/Downloads/Progressive Image Loading.pdf",
            "password"    :   '1111111111111',
            'cars'        : ['bmw','audi'],
            "radioMale"   :     "",
            "secretName"  :   'Shakeer',
            "signupButton": ""
        },
        {
            "firstName"   :   'nikita~~~~~+$$$$',
            "lastName"    :   'maam',
            "codeNames"   :   'bravo',
            "file"        : "/home/abhishek/Downloads/Progressive Image Loading.pdf",
            "email"       :   'abhishke@gmail.com',
            "password"    :   "a#########~~~~~+$$$$",
            "radioFemale" :   "",
            'cars'        : ['mercedes','audi'],
            "secretName"  :   'Nikita',
            "signupButton": ""
        },
        {
            "firstName"   :   'ratish~~~~~+$$$$',
            "lastName"    :   'firstperson',
            "codeNames"   :   'he',
            "email"       :   '4444444@gmail.com',
            "password"    :   'slkadfadfadf',
            'cars'        : ['volvo'],
            "file"        : "/home/abhishek/Downloads/Progressive Image Loading.pdf",
            "radioMale" :     "",
            "secretName"  :   'Ratish',
            "signupButton": ""
        },
    ]
}
# driver.close()
#=======================================================================================
    # form_test_args which will be passed to form_test() function, and acc to these args
    # form_rendered_test, form_elements_input_test or both will be perofrmed
#=======================================================================================

# this function will be used for reaching the form every next time when new set of input valued will be feeded to the form elements
# and it 
def before_each_input():
    driver.get( 'localhost:3000' )
    find(driver, 'id','loginLink').click()
    time.sleep(2)
    find(driver, 'id', 'bottomNavLink' ).click()
    time.sleep(2)

#==================================================================================
    # FOR TESTING FORM_DEFINITION   ['test':'form_render']
#==================================================================================

# form_test_args = {
#     "test":"form_render",
#     "web_driver": driver,
#     "form_definition": form_definition,
#     "before": before_each_input
# }

#==================================================================================
    # FOR TESTING INPUT_DEFINITION  ['test':'form_elements_inputs']
#==================================================================================

# form_test_args = {
#     "test":"form_elements_inputs",
#     "web_driver": driver,
#     "api" : "https://analytics.searchsofts.com/api/datausage/",
#     "inputs_definition": input_details,
#     "before": before_each_input
# }

#==================================================================================
    # FOR TESTING BOTH SIMULTANEOUSLY   ['test':'default']
#==================================================================================

form_test_args = {
    "test":"default",
    "web_driver": driver,
    "form_definition": form_definition,
    "api" : "https://analytics.searchsofts.com/api/datausage/",
    "inputs_definition": input_details,
    "before": before_each_input
}

# form_test( form_test_args )
form_tests( form_test_args )
time.sleep(2)
driver.quit()


