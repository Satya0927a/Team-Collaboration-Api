const usermodel = require('../models/user_model')
const workspacemodel = require('../models/workspace_model')

const workspacerouter = require('express').Router()
  
//!this is a dev route
workspacerouter.get('/all',async(req , res)=>{
  const allworkspace = await workspacemodel.find({})
  res.send(allworkspace)
})

workspacerouter.post('/create',async(req,res,next)=>{
  const {workspaceName} = req.body
  if(!workspaceName){
    return res.status(400).send({
      success:false,
      message:"Invalid input workspace name needs to be provided"
    })
  }
  const newworkspace = new workspacemodel({workspaceName:workspaceName,owner:req.user.userid})
  await newworkspace.save()
  const user = await usermodel.findByIdAndUpdate(req.user.userid,{$push:{workspace:newworkspace._id}})
  res.status(201).send({
    success:true,
    message:"created a new workspace",
    newworkspace:{
      _id:newworkspace._id,
      workspaceName:newworkspace.workspaceName,
      createdAt:newworkspace.createdAt,
      updatedAt:newworkspace.updatedAt
    }
  })
})

module.exports = workspacerouter