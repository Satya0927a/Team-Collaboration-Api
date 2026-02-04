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
    enum:['High','Mid','Low']
  }

})
const projectmodel = new mongoose.model('Project',projectschema)

module.exports = projectmodel