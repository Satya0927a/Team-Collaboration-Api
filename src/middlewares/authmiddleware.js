const jwt = require('jsonwebtoken')
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
    req.user = {
      userid:payload.userid
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authmiddlware