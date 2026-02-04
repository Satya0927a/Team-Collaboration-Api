const memberAccessMiddlware = require('../middlewares/membermiddlware')
const projectmodel = require('../models/project_model')
const taskmodel = require('../models/task_model')

const taskrouter = require('express').Router()

//?only the members
taskrouter.post('/create',memberAccessMiddlware,async(req,res,next)=>{
  try {
    const {task,fromProject} = req.body
    if(!task ){
      return res.status(400).send({
        success:false,
        message:"Invalid inputs"
      })
    }
    const project = req.project
    const newtask = new taskmodel({task:task,fromProject:fromProject})
    await newtask.save()
    project.tasks.push(newtask._id)
    project.save()
    res.status(201).send({
      success:true,
      message:"Added the task to the project"
    })
  } catch (error) {
    next(error)
  }
})
module.exports = taskrouter