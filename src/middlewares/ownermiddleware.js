const workspacemodel = require("../models/workspace_model")

const ownerAccessMiddlware = async(req, res, next) => {
  try {
    const { workspaceId } = req.body
    if (!workspaceId) {
      return res.status(400).send({
        success: false,
        message: "Invalid inputs"
      })
    }
    const workspace = await workspacemodel.findById(workspaceId)
    if (!workspace) {
      return res.status(405).send({
        success: false,
        message: "the workspace doesnt exist"
      })
    }
    //?main logic
    if (workspace.owner != req.user.userid) {
      return res.status(403).send({
        success: false,
        message: "you dont have access to this workspace"
      })
    }
    req.workspace = workspace
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = ownerAccessMiddlware