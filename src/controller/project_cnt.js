const ownerAccessMiddlware = require('../middlewares/ownermiddleware')
const projectmodel = require('../models/project_model')
const workspacemodel = require('../models/workspace_model')

const projectrouter = require('express').Router()

//?only for the owner 
projectrouter.post('/create', ownerAccessMiddlware,async (req, res, next) => {
  try {
    const { project, description, workspaceId, priority } = req.body
    if (!project || project.length < 3 || !priority) {
      return res.status(400).send({
        success: false,
        message: "Invalid inputs"
      })
    }
    if (!['High', 'Mid', 'Low'].includes(priority)) {
      return res.status(400).send({
        success: false,
        message: "The value for priority must among [high,low,mid]"
      })
    }
    // const workspace = await workspacemodel.findById(workspaceId)
    // if (!workspace) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "workspace not found"
    //   })
    // }
    const workspace = req.workspace
    const newproject = new projectmodel({ project: project, description: description, priority: priority, workspaceId: workspaceId })
    await newproject.save()
    workspace.projects.push(newproject._id)
    await workspace.save()
    res.status(201).send({
      success:true,
      message:"Created the new project",
      newProject : newproject
    })
  } catch (error) {
    next(error)
  }
})

module.exports = projectrouter