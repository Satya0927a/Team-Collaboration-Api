const mongoose = require('mongoose')

const projectschema = new mongoose.Schema({
  project:{
    type:String,
    required:true
  },
  description:String,
  tasks:[],
  priority:{
    type:String,
    required:true,
    enum:['High','Mid','Low']
  },
  workspaceId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Workspace',
    required:true,
  }
},{timestamps:true})
const projectmodel = new mongoose.model('Project',projectschema)

module.exports = projectmodel