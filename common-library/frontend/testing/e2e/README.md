### Steps to run the file 

1. run following command in the root directory which has package.json file
    ```npm i```
2. run following commmand  in the same directory
    ```npm start```

3. open another terminal and cd to the following directory respective to the root directory

   `cd src/Tests/E2E`

4. run the python script using following command

   `python3 form_testing.py`

5. run below python script for testing input type url, month, week, date, datetime-local,tel, number, search etc
    `python3 2form_testing.py`




# NOTE:-
5.  other than the npm packages which will get installed on running command ```npm i``` you need to install 
        selenium using pip3 for python3 using following command.
        ```pip3 install selenium```
6.  selenium package need chromedriver to test in chromebrowser environment as well as chrom browser installed, 
    for infoe to setup chromedriver on mac os, follow links:-
    https://medium.com/@KelvinMwinuka/running-selenium-on-macos-using-chromedriver-96ef851282b5
    https://medium.com/technowriter/install-selenium-on-mac-os-x-94c7a216aeb0



### About execution of form_testing.py script

- there are two set of ```form_test_arg``` in form_testing.py use them according to run one test at a time 
- the value of key `test` will be responsible to the test to be performed

# 1. To run form_rendered_test : FOR TESTING FORM_DEFINITION   ['test':'form_render']

1. use first ```form_test_arg={.....}``` and comment the second one in ```form_testing.py```
2. run the  ```form_testing.py```
3. result will be output in file test_report.json in same directory




# 2. To run form_element_input_test : FOR TESTING INPUT_DEFINITION  ['test':'form_elements_inputs']

1. use second  ```form_test_arg={.....}``` and comment the first one in ```form_testing.py```
2. run the  ```form_testing.py```
3. result will be output in file test_report.json in same directory

# 2. To run both test  :  FOR TESTING FORM_DEFINITION & INPUT_DEFINITION SIMULTANEOUSLY   ['test':'default']

1. use third  ```form_test_arg={.....}``` and comment the first and second one in ```form_testing.py```
2. run the  ```form_testing.py```
3. result will be output in file test_report.json in same directory



### About module_wrapper.py script

it has functions with small length of code for now, functions like 
    wrapper functions:-     find(), find_all()
    handler functions:-     send_keys(), single_click(), element_handler() etc


### About module_tests.py script    

it has functions with large line of code for now, functions like
    functions:-     form_rendered_test(), form_elements_input_test(), form_test()


## What specifically implemented in this push


1. included elements and handler for input element of type month, week, date, datetime-local, search, number, url 
2. for looking above implemetations please run file `2form_testing.py` which are used in `resetPassword form` bec signpu form is already crowded. 

# how to login in login form

1. enter anyemail address and and password and submit form.
2. if the inpts are valid value according to html validation , ui will be updated as it would be for after login of candidate





## Furthure more inplementation left

1. if there can be more interactions to create more handler function





## Not To expect in the code OR Not Implemented 

1. There are sanity checks like for webdriver, form-definition , inputs_definition, before resued for all the three cases of running test, to be improvised 
4. the import statements are not specific any of them may be used or may not be
5. error handling cases are implemented as best of the understanding, there might be some not understood or un-noticed left
6. comments in between line made of `================` are informative, not like code comment
7. at some place `time.sleep()` is  used they might be not necessary and can be ignored, but they will be properly studied if any of then is needed or not


