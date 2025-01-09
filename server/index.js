const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
require('dotenv').config()
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const PORT = process.env.PORT
const app = express()
const server = http.createServer(app)

const start = async ()=>{
  try{
    await mongoose.connect(process.env.URI, clientOptions)
    server.listen(PORT, ()=>{
      console.log(`server (${PORT}) started ><`);
    })
    app.get('/backend', (req, res) => {
      res.send({ express: 'backend is connected ><' })
    });
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("database is connected ><");
  }catch(e){
    console.error(e);
    await mongoose.disconnect();
  }
}
start()