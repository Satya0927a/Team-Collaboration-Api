const errorhandler = async(err,req , res , next)=>{
  console.log(err.name);
  console.log(err);
  if(err.name == "JsonWebTokenError"){
    return res.status(403).send({
    success:false,
    message:"Invalid token"
  })
  }
  return res.status(500).send({
    success:false,
    message:"server error"
  })
}

module.exports = errorhandler