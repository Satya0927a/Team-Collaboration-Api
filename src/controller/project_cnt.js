const projectrouter = require('express').Router()

projectrouter.post('/create',async(req, res , next)=>{
  const {project,description} = req.body
  if(!project || project.length < 3){
    return res.status(400).send({
      success:false,
      message:"Invalid input"
    })
  }

})