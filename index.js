import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import axios from "axios";
import CloudmersiveValidateApiClient from 'cloudmersive-validate-api-client';

import CloudmersiveConvertApiClient from 'cloudmersive-convert-api-client';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { buffer } from "stream/consumers";
import CloudmersiveVirusApiClient from 'cloudmersive-virus-api-client';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))
const port = 3001;


const URL = 'https://api.cloudmersive.com'
const API_KEY = '81f54c70-dda0-45be-846c-dc2f21749943'

var virusClient = CloudmersiveVirusApiClient.ApiClient.instance;

var defaultClient = CloudmersiveValidateApiClient.ApiClient.instance;

var defaultClientMerge = CloudmersiveConvertApiClient.ApiClient.instance;

var validateApikey = defaultClient.authentications['Apikey'];
validateApikey.apiKey = '81f54c70-dda0-45be-846c-dc2f21749943';

var virusClientKey = virusClient.authentications['Apikey'];
virusClientKey.apiKey = '81f54c70-dda0-45be-846c-dc2f21749943';

// var convertApikey = defaultClientMerge.authentications['Apikey'];
// convertApikey.apiKey = '81f54c70-dda0-45be-846c-dc2f21749943';








var emailApiInstance = new CloudmersiveValidateApiClient.EmailApi();
var DomainApiInstance = new CloudmersiveValidateApiClient.DomainApi();
var ipApiInstance = new CloudmersiveValidateApiClient.IPAddressApi();
var mergeApiInstance = new CloudmersiveConvertApiClient.MergeDocumentApi();
var  scanApiInstance = new CloudmersiveVirusApiClient.ScanApi();


const fileFilter = (req, file, cb)=>{
    const allowedExtension = ['.doc',".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if(!allowedExtension.includes(ext)){
      return(new Error('only word docs allowed'),false)
    }
    cb(null,true);
  }



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'public','uploads/'));
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Adds timestamp to the original filename
  }
});

const upload = multer({ storage: storage,
  fileFilter:fileFilter
 });


app.post('/validate', (req,res)=>{
 let {email} = req.body;
  console.log(email)
  if(!email){
    return res.status(400).json({message:"Email is required"})
  }

  let callback = function(error, data, response) {
    if (error) {
      console.error(error);
      return res.status(400).json({message:'invalid email',error})
    } 
      console.log('API called successfully. Returned data: ', data);
      res.status(200).json(data)
    }
  

    emailApiInstance.emailFullValidation(email, callback);
    
  
     
})


app.post('/domain', (req,res)=>{ 
  let {domain} = req.body;
  console.log(domain)
  if(!domain){
    return res.status(400).json({message:"Domain is required"})
  }

  let callback = function(error, data, response) {
    if (error) {
      console.error(error);
      return res.status(400).json({message:'invalid domain',error})
    } 
      console.log('API called successfully. Returned data: ', data);
      res.status(200).json(data)
    }
  

    DomainApiInstance.domainCheck(domain, callback);
})

app.post('/ip', (req,res)=>{
  let {ip} = req.body;
  console.log(ip)
  if(!ip){
    return res.status(400).json({message:"IP is required"})
  }

  let callback = function(error, data, response) {
    if (error) {
      console.error(error);
      return res.status(400).json({message:'invalid ip',details:error})
    } 
      console.log('API called successfully. Returned data: ', data);
      res.status(200).json(data)
    }
  

    ipApiInstance.iPAddressIpIntelligence(ip, callback);
})
//here

app.post('/scan', (req,res)=>{
  let {site} = req.body;
  // console.log(site);

  if(!site){
    return res.status(400).json({message:'add a site url'})
  }

let input = new CloudmersiveVirusApiClient.WebsiteScanRequest(); // WebsiteScanRequest
input.Url = site;

  let callback = function(error, data, response) {
    if(error){
      console.error(error);
      return res.status(500).json({message:'Error scanning site',details:error.message})
    }
    // console.log('Api called successfully', data);
    res.status(200).json(data)
  }
  scanApiInstance.scanWebsite(input,callback);
})






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

