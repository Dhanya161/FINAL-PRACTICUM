import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path"; 
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";

//importing files and functions that will be used in the server's operation
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import letterRoutes from "./routes/letterRoutes.js";

//configuring the pathnames for files and directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

var accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), 
    { flags: 'a' }
);

//morgan is used for logging request and stuff into a file
app.use(
    morgan('combined', 
    { stream: accessLogStream }
));

app.use(express.json()); 

//helmet adds a layer of security to your server 
app.use(helmet());
app.use(
    helmet.crossOriginResourcePolicy( 
        {
            policy: "cross-origin"
        } 
    )
);

//cors is used to accept requests from only defined routes 
//e.g: localhost:3000 or knustpracticum.com
app.use(cors({
    origin: ['http://127.0.0.1:5500'],
    credentials: true, 
}));

//body-parsing puts a limit on the data limit that can be processed
app.use(
    bodyParser.json(
        {
            limit: "30mb", 
            extended: true
        } 
    )
); 
app.use( 
    bodyParser.urlencoded(
        {
            limit: "30mb", 
            extended: true
        }
    )
); 

//static files such as pictures can be found in the assets folder in the public directory
app.use(
    "/assets", 
    express.static(
        path.join(
            __dirname, 
            "public/assets")
        )
);

//all uploaded files will be stored in the defined storage
const storage = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null, "public/assets");
        },
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    }
);
const upload = multer(
    {
        storage 
    }
);

//npmjs.com/packages

//example of file upload
//app.use('/student/upload-pic', upload.single('profile-pic'), {controllerName})


//defining the routes for operation
app.use('/letter', letterRoutes);
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
 


//displaying an error message if there's an unusual operation in the server
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json(
        { message: 'Internal Server Error' }
    );
});

//showing an error message for all other routes not defined
app.all("*", (req, res)=>{
    res.status(404);
    res.json({
        "error": "route not found"
    });
});

const PORT = 6001;

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`)
})

//connecting the server to the database
mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log(`connected to DB`);
})
.catch((error) => console.log(`${error} did not connect`));  




