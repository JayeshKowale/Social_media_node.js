import express from "express";
import router from "./routes/user-routes";
import blogrouter from "./routes/blog-routes";
import {mongoose} from 'mongoose';
console.log("HEyy");
const app=express();
app.use(express.json());
mongoose.set('strictQuery', true);

// app.use("/api",(req,res,next)=>{
//  res.send("Hello world");

//  });
app.use("/api/user",router);
app.use("/api/blog",blogrouter);
mongoose
.connect("mongodb+srv://JayeshKowale:v91rUbibUIJ3QA0y@cluster0.0hef0nx.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>app.listen(5000)) 
        .then(()=>console.log("Connected successfully and listening"))
            .catch((err)=>console.log(err));





