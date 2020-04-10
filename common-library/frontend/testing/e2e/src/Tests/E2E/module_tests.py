import time
import sys
import json
import logging
import re
import multiprocessing
import traceback
from datetime import datetime
import selenium 
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import WebDriverException, NoSuchElementException, \
    TimeoutException, UnexpectedAlertPresentException, NoAlertPresentException, StaleElementReferenceException

from module_wrappers import handle_element, find, get_handling_logs, element_handling_logs

# print(multiprocessing.current_process().name, str(traceback.print_exc()))

form_test_arument = None
#===========================================================================================
    #form_render_test() function
#===========================================================================================
def form_rendered_test(webdriver, form_definition , before, form_visible):
    '''
    To test if the form is present and the form elements as described in the form definition,
    any invalid form definition and incorrect detail about the form will stop the test not proceed for 
    testing the presence of form elements

    Arguments
    ---------
    webdriver           -   object of selenium.webdriver.chrome.webdriver.WebDriver .
    form_definition     -   dictionary having data of the form and the form elments
                            required keys:- form_selector
    before              -   function given by user to reach to the form and perform the test
    
    Return
    ---------
    result              -   result of the form_render_test a json object

    '''
    
    # to store the result
    result = {}                             
    # form definition
    definition = form_definition
    
    # to the result of the elements fo the form later update to result 
    form_elements_test_result ={}
    # to store the details fo the element if found, later update to form_elements_test_result
    elements_found = []
    # to store the details fo the element if not found, later update to form_elements_test_result
    elements_missing = []
    # no. of element found, later updated to result
    elements_found_count = 0
    # no. of elements not found, later updated to result
    elements_missing_count =0
    # to log any detail which is regarding the test
    logs=[]
    #===========================================================================================
        # if form selector is provided, if not provided terminate,
    #===========================================================================================
    try:
        form_selector_test = {}
        #===========================================================================================
            #checking if form has selector key
        #===========================================================================================
        if definition.get('form_selectors'):
            result.update( { "form_selector_provided": "true" } )
            # if type( definition.get('form_selectors')) != dict:
            #     result.update( { "failure_message": " object form_selectors of form_definition is not dictionary type" } )
            #     return result 
            #===========================================================================================
            #checking if form has selector key has length 2
        #===========================================================================================
            if len(definition.get('form_selectors')) < 1 :
                # css_selector = definition.get('form_selector')[0]
                # css_selector_value = definition.get('form_selector')[1]
                # logging.info( result )
                # else:
                result.update( { "failure_message":" value error: selector key must have atleast one key value pair i.e {'selector','selector_value'}" } )
                # logging.info( result )
                return result
        #===========================================================================================
            # if form does not has selector key
        #===========================================================================================
        else:
            result.update( { "failure_message":"key error: form_selectors object missing in form definition " } )
            # logging.info( result )
            return result

        if form_visible == False:
            before()
        else:
            pass

        #===========================================================================================
            #checking if form with given selector is present or not
        #===========================================================================================
        valid_form_selector_present = 0
        for selector, selector_val in definition.get('form_selectors').items():
            # print( 'controle is hrere ')
            try:
                if find(webdriver, selector , selector_val ):
                    result.update({ "is_form_rendered": "true" })
                    valid_form_selector_present += 1
                # logging.info( result )
                else:
                    logs.append('[FormNotFound] : no form found with form selector= "{}", selector_value= "{}" '.format( selector , selector_val ))
            except:
                # logging.info( "failure_message :" +"form with selector [{}='{}'] is not rendered".format( css_selector, css_selector_value) )
                logs.append('[FormNotFound] : no form found with form selector= "{}", selector_value= "{}" '.format( selector , selector_val ))
        
        if valid_form_selector_present == 0:
            result.update( { "failure_message" : "No form found using any of the provided form_selectors in from_definition"})
            return result

        #=======================================================================================
            #for loop for looping over all elments of the form 
        #=======================================================================================
        for element in definition.get("form_elements"):
            # all the test details will regarding to one element will be stroed in this variable like it, locator, locator_value, attributed_found, attribute_missing(attributes_test)
            element_result={}
            element_result_logs=[]
            #=======================================================================================
            # for loop for all selectors given for an elment if first selector as key and its value does not return any element
            # next selector will be considered and if returns valid element, rest of the option will be ignored
            #=======================================================================================
            for el_selector, el_selector_val in element.get("element_selectors").items():
        
                try:
                    #===========================================================================================
                        #checking if elment exists , else log will be genereted for encountering invalid selectors in else
                    #===========================================================================================
                    if find(webdriver,  el_selector , el_selector_val ):
                        # print(el_selector_val)
                        #=======================================================================================
                            # oversvation variable
                        #=======================================================================================
                        form_element = find(webdriver, el_selector,el_selector_val )
                        elements_found_count += 1
                        # selector = el_selector
                        # selector_value = el_selector_val
                        #=======================================================================================
                            # testing expected attributes 
                        #=======================================================================================
                        
                        attribute_found={}
                        attribute_missing=[]
                        if type( element.get('expect_attribute')) != list:
                            element_result_logs.append("Attribute test is skipped : provided object expect_attribute is not list type ")
                            # element_result.update( { "locator": el_selector, "locator_value": el_selector_val , "element_render_test_log" : element_result_logs} )
                        else:
                            try:
                                for attr in element.get("expect_attribute"):
                                    # print(attr)
                                    if type(attr) == dict:
                                        for attribute, attribute_val in attr.items():
                                            #=======================================================================================
                                                #if attribute is present
                                            #=======================================================================================
                                            try:
                                                if form_element.get_attribute(attribute):
                                                    recieved_attr_val = form_element.get_attribute(attribute)
                                                    if attribute_val == recieved_attr_val:
                                                        attribute_found.update( { attribute : {  "value_matched":"true" , "provided_attr_value":attribute_val, "recieved_attr_value": recieved_attr_val } } )
                                                        
                                                        continue
                                                    else:
                                                        attribute_found.update( { attribute : {  "value_matched":"false" , "provided_attr_value":attribute_val, "recieved_attr_value": recieved_attr_val } } )
                                                        continue                                           
                                            except NoSuchElementException as err:
                                                logging.info('element not found : {}'.format(err))
                                            #=======================================================================================
                                                #if attribute is not present
                                            #=======================================================================================
                                            else:
                                                attribute_missing.append( attribute )
                                                continue
                                        
                                    elif type(attr) == str:
                                        # if 
                                        if form_element.get_attribute(attr):
                                            recieved_attr_val = form_element.get_attribute(attr)
                                            attribute_found.update( { attr :   { "provided_attr_value":"not provided", "recieved_attr_value": recieved_attr_val } })
                                            continue
                                        else:
                                            attribute_missing.append( attr )
                                            continue                       
                            #=======================================================================
                            # control will come here only if not attribute are provided for testing
                            #=======================================================================
                            except :
                                # control comes here when there will be no expect_attribute: passed for any element so either log it or pass
                                pass
                                # logging.info('expect_attribute: not given for element with selector [{}="{}"]'.format( selector, selector_value))
                                
                                # print(multiprocessing.current_process().name, str(traceback.print_exc()))
                            #=======================================================================================
                                #putting element in element_found
                            #=======================================================================================
                    else:
                        element_result_logs.append('[{}="{}"]: not valid selector, next selector will be processed from the elemet_selectors object and if it returns valid element others will be skipped'.format( el_selector, el_selector_val ))
                        continue

                    element_result.update( { "locator": el_selector, "locator_value": el_selector_val ,  "attribute_found" : attribute_found, "attribute_missing": attribute_missing , "element_render_test_log" : element_result_logs } )
                except NoSuchElementException as err:
                    #=======================================================================================
                        # when element with its selector given by user is not found error is thrown and here store the result
                    #=======================================================================================
                    elements_missing_count +=1
                    # print( el_selector,el_selector_val +":: Not Found===========================================================")
                    elements_missing.append( { "locator": el_selector, "locator_value":el_selector_val, "failure_message": str(err) } )
                    continue
                #=======================================================================================
                    #updating result of this element in elements_found
                #=======================================================================================
                elements_found.append( element_result )
                #=======================================================================================
                    #update result on test of each input type
                #=======================================================================================
                form_elements_test_result.update( { "elements_found": elements_found,"elements_missing":elements_missing } )
                break
        #=======================================================================================
        #update form_elements_test_result result completely first
        #=======================================================================================
        form_elements_test_result.update({ "elements_missing_count": elements_missing_count, "elements_found_count": elements_found_count ,"logs":logs })
        result.update(form_elements_test_result)
        
    # control will come here when locator value is not correct element will not be found
    except NoSuchElementException as err:
        # print( "error from outer most loop",err)
        result.update( form_selector_test )
    except:
        # logging.info( "error from outer most loop")
        # print(multiprocessing.current_process().name, str(traceback.print_exc()))
        result.update( form_selector_test )
    
    # result = json.dumps(result)
    # logging.info( result)
    return result

#===========================================================================================
#   input test for elements of the form to be tested with values 
#===========================================================================================
def form_elements_input_test( webdriver, inputs_definition, form_definition ,before , api):
    '''
    To test inputs to the form elements are submits the form

    Arguments
    ---------
    webdriver           -   object of selenium.webdriver.chrome.webdriver.WebDriver .
    inputs_definition   -   details from the user with required some required constraints
    before   -   this is function passed by the user in order to reach to form for processing test


    Returns
    ---------
    result              -   json string with details about the test 


    '''
    # to store the result of entire test
    result = {}
    form_rendered_test_report = []
    # to store any detail, for any info for the user
    logs = []
    keys_of_inputs_definition = inputs_definition.keys()
    form_selectors = None
    # input_array = inputs_definition.get( "inputs", None )
    # the list of child elements of the form 
    # form_elements = None
    # result for individual set inputs form form at a time
    input_set_result = {}
    #===========================================================================================
        # this function will be called when a form is found in the document using xpath so that all child elements could be traced 
        # the function will take the argument case acc to way of finding child elements of form 
    #===========================================================================================
    

    def check_invalid_elements(form_elements):
        '''
        To iterate over all elements of form, see if it returns a validation message,
        Object of elements returning validation message are returned

        Arguments
        ---------
        form_elements   -   list of all the elements present in form

        Return
        ---------
        elements        -   object containing the info of the elements returned validationMessage.

        '''
        elements = {}
        others = []
        locator = None
        for el in form_elements:
            try:
                message = el.get_attribute('validationMessage')
                if message:
                    locator = el.get_attribute('id') or el.get_attribute('name') or el.get_attribute('class') 
                    tag_name = el.get_attribute('tagName')
                    if locator :
                        elements.update( { tag_name+'<'+locator +'>' : message })
                    else:
                        others.append({ 'element_text' : el.get_attribute('outerHTML'),'validationMessage': message  })
            except:
                print( ' error from check_invalid_elements() ')
                pass
        if len( others ) != 0 :
            elements.update( { 'others': others })
            return elements
        else:
            return elements
            

    def provide_inputs():
        # print('executing provide_inputs(case)')
        # form_elements_list = form_elements
        form_selectors_filtered = False
        selectors_to_pop = []
        # form_rendered_test_report = None
        
        for index , input_set in enumerate(inputs_definition.get('inputs')):  # here i get the inputs array
           
            try:
                before()
            except NoSuchElementException as err:
                result.update({ 'failure_message':'error from function assigned to before in form_test_args, [ERROR] => {}'.format( err ) } )
                return result
            except WebDriverException as err  :
                result.update({ 'failure_message':'error from function assigned to before in form_test_args, [ERROR] => {}'.format( err ) } )
                return result
            except:
                result.update({ 'failure_message': 'error from function assigned to before in form_test_args, unknown error'})
                # print(multiprocessing.current_process().name, str(traceback.print_exc()))
                return

            #===========================================================================================
                # filtering the form_selectors if the pair of selectors does not return a form element the will be popped out of the form_selectors 
                # will run only once if there is no valid pair of selector and selector value this test will be skipped from filling inputs 
            #===========================================================================================
            if form_selectors_filtered == False:
                for selector, selector_val in form_selectors.items():
                    try:
                        if find( webdriver,selector, selector_val):
                            if form_definition is not None:
                                form_rendered_report = form_rendered_test(webdriver, form_definition, before, True)
                                # logging.info( form_rendered_report ) 
                                form_rendered_test_report.append( form_rendered_report )
                            else:
                                form_rendered_test_report.append( None )
                                # form_rendered_test_report.update( { form_rendered_report })
                                # result.update( { "form_rendered_test_report" : form_render_test_result } )
                            break
                        else:
                            logs.append('form not found with this form_selector [{}="{}"] provided in form_selectors of input_definition : [MESSAGE] => locator in not appropriate generic locators are [ id, name, xpath, link_text, partial_link_text,tag_name, class_name, css_selector]'.format( selector, selector_val))
                            selectors_to_pop.append(selector)
                            continue
                    except NoSuchElementException as err:
                        logs.append('NoSuchElementFound: form not found using this selector value {}, next selector will if considered, if form is found inputs will be inserted else this test will be terminated here'.format(selector_val) )
                        continue
                    except :
                        logs.append('form not found with this form_selector [{}="{}"] provided in form_selectors of input_definition : [MESSAGE] => locator in not appropriate generic locators are [ id, name, xpath, link_text, partial_link_text,tag_name, class_name, css_selector]'.format( selector, selector_val))
                        continue
                for selector in selectors_to_pop:
                    form_selectors.pop(selector)
                if len( form_selectors ) == 0:
                    result.update({ 'failure_message':'none form_selectors provided in input definition is valid to find form see logs for more info.' })
                    return
                
                form_selectors_filtered = True

            
            for selector, selector_val in form_selectors.items():
                try:
                    # if find( webdriver, selector, selector_val):
                    form = find( webdriver, selector, selector_val)
                    form_elements = form.find_elements_by_xpath('.//*').copy()
                    # else:
                        # form_selectors.pop(selector)        unable to pop due to size connot be changed during iteration
                        # logs.append('form not found with this form_selector [{}="{}"] provided in form_selectors of input_definition : [MESSAGE] => locator in not appropriate generic locators are [ id, name, xpath, link_text, partial_link_text,tag_name, class_name, css_selector]'.format( selector, selector_val))
                except NoSuchElementException as err:
                    logs.append('NoSuchElementFound: form not found using this selector value {}, next selector will if considered, if form is found inputs will be inserted else this test will be terminated here'.format(selector_val) )
                    continue
                except:
                    logs.append("not able to find form or form child element with given selectors[{}='{}'], next selector will if considered, if form is found inputs will be inserted else this test will be terminated here".format(selector, selector_val) )
                    continue
            
            form_elements_accessed = []
            form_submitted = []

            for el in form_elements:
                if len(form_submitted) != 0:
                    continue
                for locator_val, input_val in input_set.items():  
                    el_html = el.get_attribute('outerHTML')

                    if locator_val in el_html[:el_html.index('>')+1]:
                        form_elements_accessed.append( locator_val )

                        if el.get_attribute('type') == 'submit':
                            handle_element(webdriver, el,input_val)                #here the formelement is handled
                            time.sleep(3)
                            # =======================================================================================
                                # name for gettingEntries need to be input by user, 
                                # name is the usrl using which the user will post details ( see if the logic will be same for the get method also    )
                            #========================================================================================
                            resources = webdriver.execute_script('return performance.getEntriesByName("{}")'.format(api))
                            # print( resources )
                            resource_found  = 0
                            for resource in resources:
                                # print('aaaaaaaaaaaaaa')
                                if resource.get("name",None) == api:
                                    input_set_result.update( { index : { "status":'Form Submitted',"form_element_accessed": form_elements_accessed,  } })
                                    resource_found += 1
                                    form_submitted.append('true')
                            if resource_found == 0:
                                input_set_result.update( { index : { "status":'Form Not Submitted',"form_element_accessed": form_elements_accessed, 'invalid_elements' : check_invalid_elements( form_elements ) } })
                        else:
                            handle_element(webdriver, el, input_val)                       #here the formelement is handled
            input_set_result.get(index).update( { 'element_handling_logs' : get_handling_logs() }  )
            # print( element_handling_logs )
    
    if "form_selectors" not in keys_of_inputs_definition:
        result.update( { "input_form_selectors_provided": "false" } )
        # print( result )
        # return  result 
        return { "result" : result, "form_rendered_test_report": form_rendered_test_report[0] }   #%
    else:
        form_selectors = inputs_definition.get( "form_selectors",None )
        if type( form_selectors ) == dict and form_selectors is not None :
            result.update( { "input_form_selector_provided" : "true" })
            # print( form_selectors)
            if len(form_selectors) == 0  :
                result.update({ "failure_message": "form_selectors in input_definition does not containe any 'selector':'slector_value' "})
            else:
                #====================================================================
                    # assigning provide_inputs()  
                #====================================================================
                provide_inputs()

    # print( form_rendered_test_report )
    result.update({ "inputs_result": input_set_result })
    result.update({ "logs": logs })  
    # print('executing from_element_input_test(): ends ')
    # result = json.dumps(result)
    # return  result 
    return { "result" : result, "form_rendered_test_report": form_rendered_test_report[0] }   #%

#=======================================================================================
    # this function will perform test according to the argument object passed
#=======================================================================================

def create_test_report(data):
    '''
    To write test report as json in a file, if any error occurs the test report will be logged in log file

    Arguments
    ---------
    data        - data to write in file 

    Return
    ---------

    (none)
    '''
    try:
        with open('test_report.json', 'w') as file:
            file.write( data )
    except IOError as err:
        print('IOERROR: the content will be logged in the log file',err)
        logging.info( data )


def json_result(dict_object):
    '''
    Helper function to return convert and return dictionary object as json format string

    Arguments
    ---------
    dict_object     - an object of dict type

    Resturn
    ---------
    converted json string of dictionary object
    
    '''
    return json.dumps(dict_object)

def form_tests( form_test_args ):
    '''
    To process the test type like to perforn form_rendered_test() or form_elements_input_test 

    Arguments
    ---------

    form_test_args  -   a dictionary object with details according to which the test to be perform 

    Return
    ---------

    (none)          

    [NOT IMPLEMENTED CURRENTLY]
    This function will finally write the file with the result of the test

    '''
    # print('control is here')
    arguments       = form_test_args  
    result          = {}
    # fail_and_exit   = False

    # test value must be present
    possible_args = [ 'test', 'web_driver', 'form_definition', 'inputs_definition', 'before','api' ]

    for arg in form_test_args.keys():
        if arg not in possible_args:
            result.update( { 'failure_message': 'Received an unknown argument: "{}"'.format( arg ) } )
            logging.info( json_result(result) )
            return

    test            = arguments.get('test', None ) 
    webdriver       = arguments.get('web_driver', None )
    before          = arguments.get('before', None )
    form_definition    = arguments.get('form_definition', None )
    inputs_definition  = arguments.get('inputs_definition', None )
    api_endpoint       = arguments.get('api',None)


    #   webdriver sanity check
    def web_driver_sanity_check(webdriver):
        if type(webdriver) != selenium.webdriver.chrome.webdriver.WebDriver:
            # fail_and_exit = True
            result.update( { "failure_message": "Object passed as value of key 'web_driver' is not of type 'selenium.webdriver.chrome.webdriver.WebDriver'" } )
            return 0
        else:
            return 1
    # form_definition sanity check 
    def form_definition_sanity_check( form_definition ):
        if type( form_definition) != dict:
            result.update( { "failure_message": "Object passed as value of key 'form_definition' is not of type 'dict' " } )
            return 0
        if type( form_definition.get('form_selectors') ) != dict :
            result.update( { "failure_message": " object form_selectors of form_definition is not dictionary type" } )
            return 0
        if type(form_definition.get('form_elements')) != list:
            result.update( { "failure_message": "Object passed as value of key 'form_elements' in form_definition is not 'list' type "})
            return 0
        if len( form_definition.get('form_elements')) >0:
            for  index, item in enumerate(form_definition.get('form_elements')):
                if type(item) != dict:
                    result.update( { "failure_message": "Object at index= '{}' stored in list object 'form_elements' of form_definition is not dict type".format(index) } )
                    return 0
        else:
            return 1
    
     # inputs_definition sanity check
    def inputs_definition_sanity_check( inputs_definition ):
        if type( inputs_definition ) != dict:
            result.update( { "failure_message": "Object passed as value of key 'inputs_definition' is not of type 'dict' " } )
            return 0
        if type( inputs_definition.get('form_selectors')) != dict:
            result.update( { "failure_message": "Object passed as value of key 'form_selectors' in inputs_definition is not 'dict' type "})
            return 0
        if type( inputs_definition.get('inputs')) != list:
            result.update( { "failure_message": "Object passed as value of key 'inputs' in inputs_definition is not 'list' type "})
            return 0
        if len( inputs_definition.get('inputs')) > 0:
            for index, item in enumerate(inputs_definition.get('inputs')):
                if type(item) != dict:
                    result.update( { "failure":"Object stored at index= '{}' in list object 'inputs' of inputs_definition is not dict type".format(index)})
                    return 0
            
        else:
            return 1

    # before sanity check 
    def before_sanity_check( before ):
        if hasattr( before, '__call__'):
            return 1
        else:
            result.update( { "failure_message":"Object passes as value of key 'before' is not of type function" } )
            return 0

    def api_sanity_check( api ):
        valid_url_exp = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)

        if type(api) != str :
            result.update( { "failure_message": "value of form_test.arg is not string"})
            return 0
        elif len(api) == 0:
            result.update( { "failure_message":"value of form_test_arg.api is not acceptable as empty string"})
            return 0
        elif re.match( valid_url_exp, api) is None:
            result.update( { "failure_message":"value of api is not valid url" } )
            return 0
        else:
            return 1

    if test is None:
        result.update( { "failure_message": "Required key value 'test' not provided, please mention the test to perform" } )
        logging.info( json_result(result) )

        create_test_report( json_result( result ) )
        return
    
    #=======================================================================================
     # selecting function 
    #=======================================================================================

    #=======================================================================================
        # "test":"form_render"
    #=======================================================================================
    if test == 'form_render':
        result.update( { 'test_name': 'form_render' } )
        arguments_list = form_test_args.keys()
        required_args = [ 'test', 'web_driver', 'form_definition', 'before' ]
        # checking if all required argument for this test is passed or not
        for arg in required_args:
            if arg not in arguments_list:
                result.update( { "failure_message": "Required argument'{}' for test: '{}' is missing".format( arg, test ) } )
                logging.info( result )
                create_test_report( json_result( result ) )
                return  
            else:
                continue
        
        # now if all req args are present we can implement sanity check and if all is well perform test

        # sanity checking webdriver object
        if web_driver_sanity_check( webdriver ) == 0 :
            logging.info( json_result(result) )
            create_test_report( json_result( result ) )
            return
                    
        # sanity checking form_definition
        if form_definition_sanity_check( form_definition ) == 0 :
            logging.info( json_result( result ) )
            create_test_report( json_result( result ) )
            return

        # sanity checking for before function
        if before_sanity_check( before ) == 0:
            logging.info( json_result(result) )
            create_test_report( json_result( result ) )
            return

        form_render_test_result = form_rendered_test( webdriver, form_definition, before, False )
        result.update( { 'form_render_test_report': form_render_test_result })
        logging.info( '[final form_render result]:'+ json_result( result ) )

        create_test_report( json_result( result ) )
        return

    #=======================================================================================
        # "test":"form_elements_inputs"
    #=======================================================================================
    if test == 'form_elements_inputs':
        
        result.update( { 'test_name': 'form_elements_inputs' } )
        arguments_list  = form_test_args.keys()
        required_args   = [ 'test',  'web_driver', 'inputs_definition','api', 'before']
        # checking if all required argument for this test is passed or not
        for arg in required_args:
            if arg not in arguments_list:
                # print(arg)
                result.update( { "failure_message": "Required argument'{}' for test: '{}' is missing".format( arg, test ) } )
                logging.info( result )
                create_test_report( json_result( result ) )
                return  
            else:
                continue


        # sanity checking webdriver object
        if web_driver_sanity_check( webdriver ) == 0 :
            logging.info( json_result(result) )
            create_test_report( json_result( result ) )
            return

        # sanity checking for before function
        if before_sanity_check( before ) == 0:
            logging.info( json_result(result) )
            create_test_report( json_result( result ) )
            return

         # sanity checking inputs_definition
        if inputs_definition_sanity_check( inputs_definition ) == 0 :
            logging.info( json_result( result ) )
            create_test_report( json_result( result ) )
            return

        if api_sanity_check(  api_endpoint ) == 0:
            logging.info( json_result(result))
            create_test_report( json_result( result ) )
            create_test_report( json_result( result ) )
            return

        # print( type( form_definition ))
        # return
        form_elements_input_test_result = form_elements_input_test( webdriver, inputs_definition, form_definition, before , api_endpoint )
        result.update( { 'form_elements_inputs_test_report': form_elements_input_test_result.get("result") })
        logging.info( "[final form_elements_input_test_result]:"+ json_result(result) )
        
        create_test_report( json_result( result ) )
        return
        

    #=======================================================================================
        # "test":"default"
    #=======================================================================================

    if test == 'default':
        result.update( { 'test_name':'default' } )
        arguments_list  = form_test_args.keys()
        required_args   = [ 'test',  'web_driver', 'inputs_definition','form_definition','api', 'before' ]

        for arg in required_args:
            if arg not in arguments_list :
                print(arg)
                result.update( { "failure_message": "Required argument'{}' for test: '{}' is missing".format( arg, test ) } )
                logging.info( result )
                create_test_report( json_result( result ) )
                return  
            else:
                continue
        
        # sanity checking webdriver object
        if web_driver_sanity_check( webdriver ) == 0 :
            logging.info( json_result(result) )
            create_test_report( json_result( result ) )
            return

        # sanity checking for before function
        if before_sanity_check( before ) == 0:
            logging.info( json_result(result) )
            create_test_report( json_result( result ) )
            return

         # sanity checking inputs_definition
        if inputs_definition_sanity_check( inputs_definition ) == 0 :
            logging.info( json_result( result ) )
            create_test_report( json_result( result ) )
            return

        # sanity checking form_definition
        if form_definition_sanity_check( form_definition ) == 0 :
            logging.info( json_result( result ) )
            create_test_report( json_result( result ) )
            return

        if api_sanity_check(  api_endpoint ) == 0:
            logging.info( json_result(result))
            create_test_report( json_result( result ) )
            return
        # print( type( form_definition ))
        # return
        report = form_elements_input_test( webdriver, inputs_definition, form_definition, before,api_endpoint )
        form_elements_input_test_report = report.get('result')
        form_rendered_test_report = report.get( 'form_rendered_test_report')
        result.update( { 'form_elements_input_test_report': form_elements_input_test_report,"form_rendered_test_report": form_rendered_test_report })
        logging.info( "[final default_test_result]:" + json_result( result ) )
        
        
        create_test_report( json_result( result ) )
        return

