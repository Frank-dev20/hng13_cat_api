const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {
        status: 'error',
        message: 'Too many request from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

app.use(limiter)

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} -IP: ${req.ip}`);
  next();
});

app.get('/me', async (req, res)=>{
    try{
        const response = await axios.get('https://catfact.ninja/fact',{
            timeout: parseInt(process.env.CAT_API_TIMEOUT) || 5000
           
        });
       
        const catFact = response.data.fact;
        const timeStamp = new Date().toISOString();
        const responseData = {
            status: 'success',
            user: {
                email: process.env.USER_EMAIL,
                name: 'Frank Joseph',
                stack: 'Node.js/Express'
            },
            timeStamp: timeStamp,
            fact: catFact
        };
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(responseData)
    }catch (error){
        console.error('Error fetching cat fact: ', error.message);

        const fallbackFact = process.env.FALLBACK_CAT_FACT || "Cats are amazing creatures!";

        const responseData = {
        status: "success",
        user: {
            email: process.env.USER_EMAIL,
            name: 'Frank Joseph',
            stack: 'Node.js (Express)'
        },
        timestamp: new Date().toISOString(),
        fact: fallbackFact,
        note: "Using fallback fact due to external API unavailability"
        };

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(responseData);
    
    }
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.url
  });
});

module.exports = app;