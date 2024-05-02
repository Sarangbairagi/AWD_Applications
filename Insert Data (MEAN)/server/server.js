// npm install express 
express = require('express');

// npm install body parser
const bodyParser = require('body-parser')

//npm install mongodb
const {MongoClient} = require("mongodb");
const URL = "mongodb://localhost:27017/";
eobj = express();
const client = new MongoClient(URL);
port = 6500;

//  JSON Format made Data gheto Body Parser
eobj.use(bodyParser.json());

// To handle CORS
// Cross Origin Resource Sharing
// Handling cors
eobj.use((req,res,next)=>{

    res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept");
  
    next();
  });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DataBase Side API

// MongoDB Connection
async function GetConnection()
{
    console.log("Database Connected");
    let result = await client.connect();
    let db = result.db("DairyMilk");
    return db.collection("Signup");
}

// Insert Data into MongoDB
async function SignupInsertData(iData) 
{
    console.log("insert signup function");
    let data = await GetConnection();
    let result = await data.insertOne(iData);

    if (result.acknowledged) 
    {
        console.log("Data inserted successfully"); 
    } 
}









///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Server Side API

function Starter()
{
    console.log("MilkDairy serever is in listening mode at : "+port);
}

function MilkDairy(req,res)
{
    res.send("MilkDairy server started...");
}

// insert Signup data
async function signupinsertdata(req, res)
{
    let data = req.body;

    console.log(data);

    console.log("InsertData function");

    // Insert data from MongoDB
    SignupInsertData(data);

    res.json("Data inserted successfully");
 
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////
//  main
//  Entry point function
//////////////////////////////////////////////////////
function main()
{
    // 1. Listen Server
    eobj.listen(port,Starter);

     // 2. Send Root Data
    eobj.get('/',MilkDairy);
    
    GetConnection();
    
    // insertdata(iData);
    
    eobj.post('/Insertsignupdata',signupinsertdata);


    
}

main();