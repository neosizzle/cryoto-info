const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser')
const path = require('path');

app.set('port', process.env.PORT) 


app.use(bodyParser.json({limit : '30mb' , extended : 'true'}))//bodyparser for parsing json reqs and responses. good lib
app.use(bodyParser.urlencoded({limit : '30mb' , extended : 'true'}))//bodyparser for parsing json reqs and responses. good lib

//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const cryptoRoutes = require('../routes/crypto')

app.use('/crypto' , cryptoRoutes)

app.get('/', (req, res, next) =>{
    res.send('/ reached');
})

app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})