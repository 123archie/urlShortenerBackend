import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();
let app=express();
let filename=fileURLToPath(import.meta.url);
let dirname=path.dirname(filename);
app.use(express.static(path.join(dirname, "../../frontend/react-app/dist")));
app.use(express.urlencoded());
export let PORT=process.env.PORT || 5000;
app.get("/submit", (req, resp)=>{
    console.log(resp);
});
app.post("/", async (req, resp)=>{
    console.log(req.body); 
    
})
app.listen(PORT, ()=>{
    console.log(`Listening to port: ${PORT}`);
})
