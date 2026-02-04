const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usermodel = require('../models/user_model')

const userrouter = require('express').Router()

userrouter.get('/all',async(req , res , next)=>{
  try {
    const allusers = await usermodel.find({})
    res.send(allusers)
  } catch (error) {
    next(error)
  }
})
userrouter.post('/create',async(req,res,next)=>{
  try {
    const {username,password} = req.body
    if(!username || !password){
      return res.status(400).send({
        success:false,
        message:"Invalid inputs username or password is missing"
      })
    }
    if(username.length < 3 || password.length < 8){
      return res.status(400).send({
        success:false,
        message:"The length of the username and password should be 3 and 8 respectively"
      })
    }
    const username_exists = await usermodel.findOne({username:username})
    if(username_exists){
      return res.status(403).send({
        success:false,
        message:"The username is taken try another one"
      })
    }
    const hash = await bcrypt.hash(password,10)
    const new_user = new usermodel({username:username,passwordHash:hash})
    await new_user.save()
    res.status(201).send({
      success:true,
      message:"Successfully created the new user"
    })
  } catch (error) {
    next(error)
  }
})
userrouter.post('/login',async(req,res,next)=>{
  try {
    const {username,password} = req.body
    if(!username || !password){
        return res.status(400).send({
          success:false,
          message:"Invalid inputs username or password is missing"
        })
      }
      if(username.length < 3 || password.length < 8){
        return res.status(400).send({
          success:false,
          message:"The length of the username and password should be 3 and 8 respectively"
        })
      }
      const user = await usermodel.findOne({username:username}).populate('workspace','-owner -__v -members -projects')
      if(!user){
        return res.status(401).send({
          success:false,
          message:"Invalid Credentials"
        })
      }
      const password_check = await bcrypt.compare(password,user.passwordHash)
      if(!password_check){
        return res.status(401).send({
          success:false,
          message:"Invalid Credentials"
        })
      }
      const payload = {
        userid:user._id,
      }
      const token = jwt.sign(payload,process.env.SECRET,{expiresIn:'15m'})
      res.status(200).send({
        success:true,
        message:"Logged in successfully",
        userdata:{
          username:username,
          userid:user._id,
          workspace:user.workspace,
        },
        token:token
      })
  } catch (error) {
    next(error)
  }
})

module.exports = userrouter