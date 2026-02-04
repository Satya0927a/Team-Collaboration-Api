const mongoose= require("mongoose");

const userschema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  passwordHash:{
    type:String,
    required:true
  },
  workspace:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Workspace'
  }]
},{timestamps:true})

const usermodel = new mongoose.model('User',userschema)

module.exports = usermodel