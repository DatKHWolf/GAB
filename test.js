const mongoose = require('mongoose')
const express = require('express')

const app = express()

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.l1nzbvq.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{app.listen(1337)
console.log("geht")}).catch(err=>{
    console.log(err)
})