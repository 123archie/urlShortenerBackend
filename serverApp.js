import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import assert from "assert";
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
    let data={
        "originalLink":originalLink,
        "shortName":shortName,
        "shortenedLink":pathFile
    }
    fs.readFile("./data.json", "utf-8", (err, jsonData)=>{
        if(err){
            console.log("Error reading file!");
            return ;
        }try {
            let jsondata=JSON.parse(jsonData);
            jsondata.push(data);
            console.log(jsondata);
            
            fs.writeFile("./data.json", JSON.stringify(jsondata), (err)=>{
                if(err){
                    resp.status(500).send("Website down!");
                }else{

                }
            })
            }
            
        catch (error) {
            console.log("Invalid JSON data");
        }
        
    })

    
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
