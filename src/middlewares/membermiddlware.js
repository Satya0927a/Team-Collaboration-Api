const projectmodel = require("../models/project_model");
const workspacemodel = require("../models/workspace_model")

const memberAccessMiddlware = async (req, res, next) => {
  try {
    if ("workspaceId" in req.params) {
      const { workspaceId } = req.params
      if (!workspaceId) {
        return res.status(400).send({
          success: false,
          message: "Invalid inputs"
        })
      }
      const workspace = await workspacemodel.findById(workspaceId).select('-__v').populate({ path: 'projects', select: '-workspaceId -__v ', populate: { path: 'tasks', select: '-__v -fromProject' } })
      if (!workspace) {
        return res.status(405).send({
          success: false,
          message: "the workspace doesnt exist"
        })
      }
      if (workspace.owner != req.user.userid && !workspace.members.includes(req.user.userid)) {
        return res.status(403).send({
          success: false,
          message: "You dont have the access to this workspace"
        })
      }
      req.workspace = workspace
      next()
    }
    else if ("fromProject" in req.body) {
      const { fromProject } = req.body
      const project = await projectmodel.findById(fromProject)
      if (!project) {
        return res.status(404).send({
          success: false,
          message: "The project doesnt exists"
        })
      }
      const workspace = await workspacemodel.findById(project.workspaceId)
      if (workspace.owner != req.user.userid && !workspace.members.includes(req.user.userid)) {
        return res.status(403).send({
          success: false,
          message: "You dont have the access to this workspace"
        })
      }
      req.project = project
      next()
    }
  } catch (error) {
    next(error)
  }
}
module.exports = memberAccessMiddlware