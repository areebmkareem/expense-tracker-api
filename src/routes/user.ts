


const User = require('../models/user');


type signUp= {
    email?:String,
    password?:String
  }

export const createUser=async(_:any, payload:signUp )=>{

  const newUser=new User(payload)
  const data = await newUser.generateTokenId();
  await data.user.save();
  return data

  }