const express =require("express");
const mongoose =require("mongoose");
const routes=require("./routes/GoalsListRoute");
// for handling requests from differnt ports, server has different port and react has different
const cors=require("cors");

const app=express();

// use the PORT from env or 5000
const PORT= 5001;

// we don't have to parse into json again and again
app.use(express.json());
app.use(cors());   //middleware

// app.get("/",(request,response)=>{  
//     response.send("Hello World")
// });


mongoose
    .connect("mongodb://localhost:27017/goals")
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=>console.log(err));

    app.use("/api",routes);

app.listen(PORT,()=>console.log(`Listening at ${PORT}..`));