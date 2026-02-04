const mongoose= require("mongoose");

const workspaceschema = new mongoose.Schema({
  workspaceName:{
    type:String,
    required:true
  },
  projects:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Project'
  }],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }]
},{timestamps:true})


const workspacemodel = new mongoose.model("Workspace",workspaceschema)

module.exports = workspacemodel