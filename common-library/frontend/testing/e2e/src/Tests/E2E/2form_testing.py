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
    "form_selectors":{  "id":"resetPasswordForm" },
    "methods_allowed":["POST"],
    "form_elements":[
        {"element_selectors":{"name":"telephone" }  },
        {"element_selectors":{"name":"bestweek"},      },
        {"element_selectors":{"name":"website"},         },
        {"element_selectors":{"name":"billnumber"},     },
        {"element_selectors":{"name":"newMonth"},     },
        {"element_selectors":{"name":"meetingdate"},    },
        {"element_selectors":{'name':'date'} ,  }
    ], 
}

input_details =  {
    "form_selectors":{ "id":"resetPasswordForm" },
    "inputs":[
        {
            "telephone" :   '8289030278',
            "bestweek"  :   ['01','2020'],
            'url'       :   "https://youtube.com",
            'billnumber':   "52",
            "newMonth"  :   ['March',"2020"],
            "meetingdate":  ['12','11','2020',"11",'22'],
            "Startdate"      :   ["12","08","2020"],
            "resetButton":  ""

        },
        {
            "telephone" :   '8289030278',
            "bestweek"  :   ['01','2020'],
            'url'       :   "https://youtube.com",
            'billnumber':   "52",
            "newMonth"  :   ['Mar',"2020"],
            "meetingdate":  ['02','11','2020',"11",'22'],
            "Startdate"      :   ["12","08","2020"],
            "resetButton":  ""
        },
        {
            "telephone" :   '8289030278',
            "bestweek"  :   ['01','2020'],
            'url'       :   "https://youtube.com",
            'billnumber':   "52",
            "newMonth"  :   ["1","2020"],
            "meetingdate":  ['12','11','2020',"11",'22'],
            "Startdate"      :   ["12","08","2020"],
            "resetButton":  ""
        },
        {
            "telephone" :   '8289030278',
            "bestweek"  :   ['01','2020'],
            'url'       :   "https://youtube.com",
            'billnumber':   "52",
            "newMonth"  :   ["12","2020"],
            "meetingdate":  ['12','11','2020',"11",'22'],
            "Startdate"      :   ["12","08","2020"],
            "resetButton":  ""
        },
        {
            "telephone" :   '8289030278',
            "bestweek"  :   ['01','2020'],
            'url'       :   "https://youtube.com",
            'billnumber':   "52",
            "newMonth"  :   ["f","2020"],
            "meetingdate":  ['12','11','2020',"11",'22'],
            "Startdate"      :   ["12","08","2020"],
            "resetButton":  ""
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
    find(driver, 'id', 'resetpassword' ).click()
    time.sleep(2)

#==================================================================================
    # FOR TESTING FORM_DEFINITION   ['test':'form_render']
#==================================================================================

form_test_args = {
    "test":"form_render",
    "web_driver": driver,
    "form_definition": form_definition,
    "before": before_each_input
}

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

# form_test_args = {
#     "test":"default",
#     "web_driver": driver,
#     "form_definition": form_definition,
#     "api" : "https://analytics.searchsofts.com/api/datausage/",
#     "inputs_definition": input_details,
#     "before": before_each_input
# }

# form_test( form_test_args )
form_tests( form_test_args )
time.sleep(2)
driver.quit()


