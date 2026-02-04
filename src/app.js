const express = require('express')
const userrouter = require('./controller/user_cnt')
const errorhandler = require('./middlewares/errorhandler')
const { default: mongoose } = require('mongoose')
const workspacerouter = require('./controller/workspace_cnt')
const authmiddlware = require('./middlewares/authmiddleware')
const app = express()

app.use(express.json())
//? connect to the database
if(mongoose.connect(process.env.MONGO_URI)){
  console.log("connected to the database");
}
else{
  console.log("couldn't connect to the database");
}
app.get('/',(req,res)=>{
  res.send("<h1>Welcome to my server</h1>")
})
app.use('/user',userrouter)
app.use('/workspace',authmiddlware,workspacerouter)
app.use(errorhandler)

module.exports = app