 * Introduction
 * Requirements
 * Installation
 * Build
 * Deployment
 * Maintainers



Introduction
...............
        This project is for the web analytics , it is used as a tool for business and market research and
        to access and improve the effectiveness of a website.It provides information about the number of
        visitors to a website and the number of page views.

        Basic steps of the web analytics process:-

                1-collection of data:- These data are counts of things. The objective of this stage is to gather data.

                2-Processing of data into information:-The objective of this stage is to take the data and confirm it 
                into information, specifically metrics and is shown in the form of bar graph.

                3-Developing KPI:- This stage focuses on using the counts and infusing them with business strategies 
                referred to as key performance indicators(kpi).

                4-Formulating online strategy:- This strategy is concerned with the online goals, objectives and standards
                for the organization or business.

        In this project we are implementing on-site web analytics which measures a vistor's behaviour on our website.

        In this we are focussing on 3 datas :

        * Clicks analytics:- click analytics is a special type of web analytics that gives special type of attention to clicks.
                It focuses on on-site analytics . It is used to determine the performance of the particular site , with regards to where 
                the users of this site are clicking.

        * Search analytics:-Search analytics is the use of search data to investigate particular interactions among Web searchers,
                the search engine,or the content during searching episodes.

        * Follow-on analytics:- Follow-on analytics is the follow-on over the searches done among the web searchers.


        These datas are collected and after that it is converted to informations and depicted in the form of Bar graph using chart.js. 
        The Bar graph in this which we have implemented are for the every dates which have information like total searches , clicks and 
        follow on on that particular date. After that again expanding to that we have total searches , clicks and follow-on on every URL 
        for that particular date . Again expanding more it have information about the total searches , clicks and follow-on on the particular
        proxy .


        Website URL :
        ..............

        https://analytics.searchsofts.com


        API  used for login and logout :
        ...................................


        https://analytics.searchsofts.com/api/login

        https://analytics.searchsofts.com/api/logout



        API used for fetching the datas
        ..................................

        https://analytics.searchsofts.com/api/fetchsearchmetrics/


Requirements
.............


        This project contains following libraries :

        1- React.js
        
        2- google ReCaptcha

        3- material-ui

        4- chart.js

Installation
............

        However the package.json contains all the dependencies used in this project and can be installaed for running this project as 

                npm i 

                after that press enter.

        for running the project you can write in console

                npm start 

                after that press enter.
                
                the application run on http://localhost:3000/

        Packages used for this project are 

                npx create-react-app <project name>  (for creating environment for the projet)

                npm install --save react-google-recaptcha (for react-google-recaptcha i'm not a robot)

                npm install --save @material/ui/core (for material-ui/core which contains textfields , button , 
                input , inputlabel , formcontrol , chip ,select)

                npm install --save @material/ui/icons (for icons in the project like search , lock and password )

                npm install --save moment          (for dates parameters)

                npm install --save react-datepicker   (for calendar widget)

                npm install --save chart.js react-chartjs-2 (for the bar graph using chart.js and for extra features 
                react-chartjs-2 is used)




Build
.....


        npm run build 
        
        This command creates a build directory with a production build of the app. Inside the build/static
                directory will be the JavaScript and CSS files. Each filename inside of build/static will contain a 
                unique hash of the file contents. This hash in the file name enables long term caching techniques.

        When running a production build of freshly created Create React App application, there are a number of .js 
        files (called chunks) that are generated and placed in the build/static/js directory


Deployment
..........


        AWS EC2 or digital ocean:


        AWS : Free tier for 1 year. Beyond that chargable (Approx > 6 USD / month)

        EC2: > 5 USD per month depending upon config.

        This offers instance of your preferred operating system (from ubuntu to Windows) and let you deploy your application. 
        You get a IP address by which you can ssh and access the instance. The steps involved to deploy are

                1- SSH into the machine
                2- clone your github repository and pull the latest code
                3- npm install
                4- npm run build
                5- Create a simple Node server to serve your static files which is in the build folder after running the
                   command npm run build
                6- Use process manager like PM2 to handle server errors and restarts.
                7- We can use services like nginx for load balancer and proxying. To make react router working with nested routes we 
                can set up nginx config to redirect to root if we get any error.

                
        Since this is a static deployment, you can use any server of your wish. We are using Node since we are comfortable with Javascript.
        This is exactly similar to serving from your local machine. Instead we do this on a remote machine. This is one of the best and
        commonly used method to deploy. The advantages are the freedom to choose our tools, advanced network security and better options
        to deploy.



Maintainers 
...........


     This website is maintained by Intelliapt Technologies pvt. ltd , Bangalore .