
import express, { Application, Request,Response } from 'express';
import { urlencoded , json} from 'body-parser';

import dotenv from 'dotenv';

import connectToDB from './db/connection'
import apiV1 from './routes/v1';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const PORT:string = process.env.PORT!;

const app:Application= express();
app.use(urlencoded({ extended: false }));
app.use(json());

apiV1(app);

app.use((req:Request, res:Response) => {
    res.status(404).send("NOT FOUND");
});

connectToDB().then((connected:boolean) => {

    if(connected){
        app.listen(PORT, () => {
            console.log('running on ' + PORT);
        });
    }
    else{
        console.log("Error mongo db");
    }   
    
});








// app.get("/info", (req,res) =>{
//     // res.setHeader("Content-Type","application/json");
//     res.status(200).send({ version:"0.0.1", appName:"Curso Node.js" });
// });
// app.get("/detail", (req,res)=>{
//     res.status(200).send("<html><body> DETAIL </body></html>");
// });

// app.post('/login',(req,res)=>{
//     console.log(req.body);
//     const { username,password } = req.body;
//     if(username ==="Alex" && password === "12345678")
//     {
//         res.send({status:"Ok"});
//     }
//     else
//     {
//         res.status(401).end("access denied");
//     }
// });

// app.get("/phone", (req,res)=>{
//     try{

//         const { value ,country} = req.query;
//         const result = phone(value, country.toUpperCase());
//         res.setHeader("Content-Type" , "applicacion/json");
//         res.status(200).send(JSON.stringify(result));
//     }
//     catch(e)
//     {
//         res.status(400).send(e.message);
//     }
   
// });
