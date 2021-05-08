




type signUp= {
    email?:String,
    password?:String
  }

export const createUser=(_:any, {email,password}:signUp )=>{
    console.log('email,password: ', email,password);
    return null
  
  }