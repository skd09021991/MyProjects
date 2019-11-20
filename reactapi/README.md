This project conatains a dummy API which contains employees datas in the form  of JSON format the DUMMY API which is used is :

http://dummy.restapiexample.com/


in this api there are employees data from which i had done GET , POST , PUT , DELETE opperation .

The UI part is in React . In this i fetch the data from the api and display it in the form of Cards on the UI . for the cards , textfields , buttons i used material-ui  .


Dependencies
...................

npm install .

npm install @material/textfield


npm install @material/button

      import { Button } from '@material-ui/core'


npm install axios
       

       import axios from 'axios'

npm install @material-ui/core/card
     
     import Card from '@material-ui/core/Card

     import CardActionArea from '@material-ui/core/CardActionArea'

     import CardActions from '@material-ui/core/CardActions'

     import CardContent from '@material-ui/core/CardContent'



FOr GET
.......
http://dummy.restapiexample.com/api/v1/employees

FOR POST
.......
http://dummy.restapiexample.com/api/v1/create

FOR PUT
......
http://dummy.restapiexample.com/api/v1/update/


FOR DELETE
...........
http://dummy.restapiexample.com/api/v1/delete/