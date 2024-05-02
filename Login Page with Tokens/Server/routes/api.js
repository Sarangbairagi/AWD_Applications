const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//npm install mongodb
const { MongoClient } = require("mongodb");
const URL = "mongodb://localhost:27017/";

const client = new MongoClient(URL);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DataBase Side API

// MongoDB Connection Signup collection 
async function GetConnection()
{
  console.log("Database Connected");
  let result = await client.connect();
  let db = result.db("DairyMilk");
  return db.collection("Signup");
}

// Insert Data into MongoDB from SignUp
async function SignupInsertData(iData)
{
  console.log("insert signup function");
  let data = await GetConnection();
  let result = await data.insertOne(iData);

  if (result.acknowledged) {
    console.log("Data inserted successfully");
  }
}

// Read Data into MongoDB from SignUp
async function SignupReadData() 
{
  let data = await GetConnection();
  data = await data.find().toArray();
  console.log("Data from the Marvellous Database is :");
  // console.log(data);
  return data;
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Server Side API

// insert Signup data
async function signupinsertdata(req, res) {
  let data = req.body;

  console.log(data);

  console.log("InsertData function");

  // Insert data from MongoDB
  SignupInsertData(data);

  res.json("Data inserted successfully");
}


function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}


async function dashboarddata(req, res) 
{
  let specialEvents = [
    {
      "_id": "1",
      "name": "IOT",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
    {
      "_id": "2",
      "name": "IOS Internals",
      "description": "3 Days",
      "Teacher": "Piyush Manohar Khairnar"
    },
  ]
  res.json(specialEvents);
}

async function loginCustomer(req, res) 
{
  let userData = req.body
  let SignUpData = [];
  let Bool = false;
  let i = 0;


  SignUpData = await SignupReadData();

  for (i = 0; i < SignUpData.length; i++) 
  {
    // console.log("in Loop");
    // console.log(SignUpData[i].email);
    if ((userData.email == SignUpData[i].email) && (userData.password == SignUpData[i].password)) 
    {
      Bool = true;
      let payload = { subject: 1 }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token , "True" : "true" })
    }
  }
  
  if(Bool == false)
  {
    res.status(401).json({"False" : "false"});
  }
  

}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////
//  main
//  Entry point function
//////////////////////////////////////////////////////
function main() 
{
  GetConnection();

  router.post('/Insertsignupdata', signupinsertdata);

  router.post('/login', loginCustomer);

  router.get('/DashBoard', verifyToken, dashboarddata);

}

main();


module.exports = router;