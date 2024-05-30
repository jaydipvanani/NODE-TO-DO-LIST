require("dotenv").config
let hhtp = require("http");
let express = require("express");
let bodyparser = require("body-parser")
let cors = require("cors")
const  route  = require("./router");
const dbConnect = require("./db/connectDB");
let app = express();


// use cors for all desktop
app.use(cors({
    origin: "*"
}))

//for json body express
// app.use(express.urlencoded({extends:false}));
// app.use(express.json())

//for json body use bodyparser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


//uisng routes
app.use("/v1" , route);

//coonect databaes
dbConnect();

//create server
let http = hhtp.createServer(app).listen(3001,()=>{
    console.log("create servever succesfully");
})



