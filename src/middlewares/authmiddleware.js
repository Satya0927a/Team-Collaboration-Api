const jwt = require('jsonwebtoken')
const usermodel = require('../models/user_model')
const authmiddlware = async(req,res,next)=>{
  try {
    const header = req.headers.authorization
    
    if(!header){
      return res.status(404).send({
        success:false,
        message:"you are unauthorized for this route"
      })
    }
    const token = header.replace('Bearer ','')
    const payload = jwt.verify(token,process.env.SECRET)
    const user = await usermodel.findById(payload.userid)
    if(!user){
      return res.status(401).send({
        success:false,
        message:"the user doesnt exist"
      })
    }
    req.user = {
      userid:payload.userid
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authmiddlware