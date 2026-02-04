const mongoose = require('mongoose')

const taskschema = new mongoose.Schema({
  task:{
    type:String,
    required:true
  },
  status:{
    type:String,
    enum:['completed','pending'],
    default:'pending'
  },
  fromProject:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Project',
    required:true
  }
})
const taskmodel = new mongoose.model('Task',taskschema)
module.exports = taskmodel