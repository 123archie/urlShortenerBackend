import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs"
dotenv.config();
let app=express();
let filename=fileURLToPath(import.meta.url);
let dirname=path.dirname(filename);
let originalLink, shortName, pathFile;
app.use(express.static(path.join(dirname, "../../frontend/react-app/dist")));
app.use(express.urlencoded());
export let PORT=process.env.PORT || 5000;

app.get("/submit", async (req, resp)=>{
    pathFile=`http://localhost:${PORT}//${shortName}`;
    resp.send(pathFile);
    
})
app.get("//:shortName", (req, resp)=>{
    resp.redirect(originalLink);
})

app.post("/", async (req, resp)=>{
    originalLink=req.body.originalLink;
    shortName=req.body.shortName;
    resp.redirect(`/submit`);
    
})
app.listen(PORT, ()=>{
    console.log(`Listening to port: ${PORT}`);
})
