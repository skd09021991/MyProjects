from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import WebDriverException, NoSuchElementException, \
    TimeoutException, UnexpectedAlertPresentException, NoAlertPresentException, StaleElementReferenceException
import time







#===========================================================================================
    #find wrapper function
#===========================================================================================
def find( webdriver, by, css_selector_val ):
    '''
    Wrapper function of selenium python to find an elment using locator and locator_value(css_selector_val)

    Arguments
    ---------

    webdriver       -   object of selenium.webdriver.chrome.webdriver.WebDriver .
    by              -   element locator name .
                        contraint:
                            expected value:-    id, name, xpath, link_text, partial_link_text, 
                                                tag_name, class_name, css_selector 
                        other value than the expected will return None
    css_selector_val-   value for the element locator i.e. arg 'by' 
                        example:- to find all elements with class_name=contact, value for css_selector_val is 'contact'
    
    Return
    ---------
    Webelement      -   if the value of arg 'by' is an expected value
    or
    None            -   if the value of arg 'by' is an unexpected value
    '''
    
    if by == 'id':
        return webdriver.find_element_by_id( css_selector_val )
    if by == 'name':
        return webdriver.find_element_by_name( css_selector_val )
    if by == 'xpath':
        return webdriver.find_element_by_xpath( css_selector_val )
    if by == 'link_text':
        return webdriver.find_element_by_link_text( css_selector_val )
    if by == 'partial_link_text':
        return webdriver.find_element_by_partial_link_text( css_selector_val )
    if by == 'tag_name':
        return webdriver.find_element_by_tag_name( css_selector_val )
    if by == 'class_name':
        return webdriver.find_element_by_class_name( css_selector_val )
    if by == 'css_selector':
        return webdriver.find_element_by_css_selector( css_selector_val )
    else :
        return None


##===========================================================================================
    # find_all wrapper function for locating multiple element
#===========================================================================================
def find_all( webdriver, by, css_selector_val ):
    '''
    Wrapper function of selenium python to find list of elments using same locator and locator_value(css_selector_val)

    Arguments
    ---------

    webdriver       -   object of selenium.webdriver.chrome.webdriver.WebDriver .
    by              -   element locator name .
                        contraint:
                            expected value:-    name, xpath, link_text, partial_link_text, 
                                                tag_name, class_name, css_selector 
                        other value than the expected will return None
    css_selector_val-   value for the element locator i.e. arg 'by' 
                        example:- to find all elements with class_name=contact, value for css_selector_val is 'contact'
    
    Return
    ---------

    Webelement list -   if the value of arg 'by' is an expected value
                    or
    None            -   if the value of arg 'by' is an unexpected value
    '''
    
    if by == 'name':
        return webdriver.find_elements_by_name( css_selector_val )
    if by == 'xpath':
        return webdriver.find_elements_by_xpath( css_selector_val )
    if by == 'link_text':
        return webdriver.find_elements_by_link_text( css_selector_val )
    if by == 'partial_link_text':
        return webdriver.find_elements_by_partial_link_text( css_selector_val )
    if by == 'tag_name':
        return webdriver.find_elements_by_tag_name( css_selector_val )
    if by == 'class_name':
        return webdriver.find_elements_by_class_name( css_selector_val )
    if by == 'css_selector':
        return webdriver.find_elements_by_css_selector( css_selector_val )
    else :
        return None    


def send_text_keys(element,text_keys):
    '''
    To send keys to webelement

    Arguments
    ---------

    element     -   webelement
    text_keys   -   keys to send to the element

    Return
    --------
    (none)

    '''
    element.send_keys(text_keys)

def send_multiple_text_keys( element, text_keys ):
    '''
    To send multiple keys to the input element, 
    This handler must be provided for elements like input of type date, datetime-local, week, month where
    after the givent a part of input control in element automatically goes to next eg. onece giving 01 in input (dd/mm/yyyy) it will automatically go for 
    taking the input of mm  

    Arguments
    ---------

    element     -   element to which key to be send.
    text_keys   -   list of keys to be sent.

    Return
    ---------

    (none)
    '''
    for text in text_keys:
        element.send_keys(text)

def single_click(element):
    '''
    To perform click on the webelment

    Arguments
    ---------

    element     -   webelement

    Return
    ---------

    (none)
    '''
    # if element.get_attribute('type') == 'submit':
    element.click()


def double_step_click(first_element, second_element):
    '''
    To perform two click on for clicking the element and second for to ckick the single option out of the options popped on first click

    Arguments
    ---------

    first_element   -   element that will be clicked first
    second_element  -   element that will be clicked second

    Return
    ---------

    (none)

    '''
    first_element.click()
    second_element.click()

def multiple_click(elements):
    '''
    To perform multiple clicks i.e to click multiple options one by one

    Arguments
    ---------

    elements    -   list of webelements 

    Return
    ---------

    (none)

    '''
    for el in elements:
        el.click()

def single_then_multiple_click(first_element, option_elements):
    '''
    To perform a single click first and then perform multiple click for eg. to click on select element then click on multiple options out of popped values.

    Arguments
    ---------

    first_element   -   webelement that will need to be clicked first which will pop the list of options
    option_elements -   list of webelements which are the options to be selected by clicking

    Return
    ---------

    (none)
    '''
    first_element.click()
    for el in option_elements:
        el.click()





element_handling_logs = []


def get_handling_logs():
    logs = list(element_handling_logs)
    element_handling_logs.clear()
    return logs

def handle_element( webdriver, el, input_val):
    '''
    To handle the webelment on the basis of the HTML element type of the webelement

    Arguments
    ---------

    el          -   webelement to handle
    input_val   -   value to be passed to webelement if possible depeneding on type of the elment, and if its clickable only it will be clicked only

    Return
    ---------

    (none)
    '''
    tag_name = el.get_attribute('tagName')



    def input_tag_handler():
        '''
        To handle if the tagName of the webelement is 'INPUT'

        Arguments
        ---------

        (none)

        Return
        ---------

        (none)
        '''
        el_type = el.get_attribute('type')

        if el.get_attribute('list'):
            list_id = el.get_attribute('list')
            datalist = find(webdriver, 'id', list_id)
            list_options = datalist.find_elements_by_xpath('.//*')
            option_found = 0
            for option in list_options:
                try:
                    if option.get_attribute('value') == input_val:
                        send_text_keys(el, input_val)
                        option_found +=1 
                        break
                    else: 
                        continue
                except:
                    print('onmygode')
                    continue
            if option_found == 0 :
                element_handling_logs.append({"Input<list>" : "value passed is not present in the datalist"})
                
            # time.sleep(2)
            return 

        elif el_type in [ 'text','email','password', 'file', 'url', 'number', "tel", 'search']:
            send_text_keys( el, input_val )
            return 

        elif el_type in ['radio','submit','image','reset']:
            single_click(el)
            return 

        elif el_type == 'week':
            if len(input_val) != 2:
                element_handling_logs.append( { "Input<week>":"value for handling this element should have list of 3 elements with respective values in specific oder eg.[<week_number>,'yyyy'] where week_number takes complete value ie '01' instead of '1' for first week " })
                return
            send_multiple_text_keys(el, input_val)
            return 

        elif el_type == 'date':
            if len(input_val) != 3:
                element_handling_logs.append({"Input<date>": "value for handling this element should have list of 3 elements with respective values in specific oder eg.['dd','mm','yyyy'] where value must be character specific ie for month(mm): '01' instead of '1' " })
                return
            send_multiple_text_keys(el, input_val)   
            return

        elif el_type == 'month':
            if len(input_val) != 2:
                element_handling_logs.append({"Input<month>":"value for handling this element should have list of 2 elements with respective values in specific order eg. [<month>,'yyyy'] where <month> can have values 'July'||'7'||7  " })
                return
            el.send_keys( input_val[0], Keys.ARROW_RIGHT, input_val[1])
            return

        elif el_type == 'datetime-local':
            if len(input_val) != 5:
                element_handling_logs.append({"Input<date>": "value for handling this element should have list of 3 elements with respective values in specific oder eg.['dd','mm','yyyy'] where value must be character specific ie for month(mm): '01' instead of '1' " })
                return
            el.send_keys( input_val[0], input_val[1], input_val[2], Keys.ARROW_RIGHT, input_val[3],input_val[4] )
            return

        elif el_type =='color':
            return
        


            # second_el = find( webdriver, 'css_selector', 'option[value="{}"]'.format(input_val) )
            # double_step_click(el, second_el )
    
    def button_tag_handler():
        '''
        To handle if the tagName of the webelement is 'BUTTON'

        Arguments
        ---------

        (none)

        Return
        ---------

        (none)
        '''
        single_click(el)

    def select_tag_handler():
        '''
        To handle the select element of the form

        Arguments
        ---------
        (none)          # variables used in this function are avail as the arg of parent function

        Return
        ---------
        (none)

        '''

        # element_handling_logs.clear()           # making log list empty for furthur iteration
        single_click(el)
        select_options = el.find_elements_by_xpath('.//*')
        if el.get_attribute('multiple'):
            if type( input_val ) == list :
                # print( 'select multiple')
                for val in input_val:
                    selected = -1
                    for option in select_options:
                        if option.get_attribute('value') == val:
                            single_click( option )
                            selected += 1
                        else:
                            continue
                    if selected == -1:
                        #  log that this element is not selected bec not found
                        element_handling_logs.append({'Select<multiple>': 'unable to find option with value={}'.format(val) } )
                        pass
            else:
                # now need to implement logging from this script next task to implement logging from this
                element_handling_logs.append( { 'Select<multiple>' : 'value must be type list of values of value attribute to select multiple options' } )
                pass
                
        else:
            option_handled = -1
            for option in select_options:
                try:
                    if option.get_attribute('value') == input_val:
                        double_step_click( el, option )
                        option_handled = 1
                        break
                    else:
                        
                        continue
                except:
                    element_handling_logs.append( { 'Select': 'unexpected error while handling option element with value = {}'.format( input_val ) } )
                    continue
            if option_handled == -1:
                element_handling_logs.append( { 'Select': 'unable to find option with value = {}'.format( input_val ) } )
                pass
        # print('rom select handler=>', element_handling_logs )


    def if_no_tag_handler():
        '''
        If log the detail in case of the element received for which no handler is written

        Arguments
        ---------

        (none)

        Return
        ---------

        (none)
        '''
        # something need to get logged here
        pass
    
    
    
    tag_switcher ={ 
        "INPUT" : input_tag_handler, 
        "BUTTON": button_tag_handler,
        "SELECT": select_tag_handler
    }
    tag_switcher.get( tag_name ,if_no_tag_handler)()



# form.addEventListener('submit',(event)=>{console.log('fom submitted')})