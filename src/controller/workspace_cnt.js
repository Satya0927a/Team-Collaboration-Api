const usermodel = require('../models/user_model')
const workspacemodel = require('../models/workspace_model')

const workspacerouter = require('express').Router()
  
//!this is a dev route
workspacerouter.get('/all',async(req , res)=>{
  const allworkspace = await workspacemodel.find({})
  res.send(allworkspace)
})

workspacerouter.get('/fetch',async(req,res,next)=>{
  const {workspaceId} = req.body
  if(!workspaceId){
    return res.status(400).send({
      success:false,
      message:"Invalid inputs"
    })
  }
  const workspace = await workspacemodel.findById(workspaceId).select('-__v').populate('projects','-workspaceId -__v -tasks')
  if(!workspace){
    return res.status(404).send({
      success:false,
      message:"the workspace doesnt exist"
    })
  }
  if(workspace.owner != req.user.userid && !workspace.members.includes(req.user.userid)){
    return res.status(403).send({
      success:false,
      message:"You dont have the access to view this workspace"
    })
  }
  res.status(200).send(workspace)
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