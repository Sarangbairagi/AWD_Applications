// npm install express 
express = require('express');
// npm install body parser
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const api = require('./routes/api.js');
port = 6500;

const eobj = express();

eobj.use(cors());

eobj.use(express.static(path.join(__dirname, 'dist')));

//  JSON Format made Data gheto Body Parser
eobj.use(bodyParser.json());

eobj.use('/api', api);


// Listen Server
eobj.listen(port, function(){
    console.log("MilkDairy server is in listening mode at : "+port);
});

// Send Root Data
eobj.get('/', function(req, res){
    res.send("MilkDairy server started...");
});




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  
//    Server Side Installation for project Commands
//       
//        - npm init --yes (Basic node setup)
//        - npm install express (for Express)
//        - npm install body-parser (for Body Parser)
//        - npm install jsonwebtoken (for Json)
//        - npm install cors (for CORS)
//        - npm install mongoose (for Mongoose)
//    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////