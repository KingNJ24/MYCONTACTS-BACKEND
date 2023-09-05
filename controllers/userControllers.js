const asyncHandler = require('express-async-handler')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//@desc register new user
//@route POST /api/register
//@access public
const registerUser = asyncHandler ( async (req,res)=>{
    try{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
        return res.status(400).json({message:'all fields are required'})
    }
    const nameAvailable = await User.findOne({username})
    if(nameAvailable)
    {
        return res.status(401).json({message:'user name already taken'})
    } 
    const emailAvailable = await User.findOne({email})
    if(emailAvailable)
    {
        return res.status(401).json({message:'this email is already taken'})
    }
    //hashing the passwaord
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    })
    console.log("user created:",user)
    if(user){
    return  res.status(201).json({ id:user.id, name:user.username, email:user.email})
    }
} catch(err){
    res.status(401);
    throw new Error('User data is not valid')
}
})

//@desc login user
//@route POST /api/login
//@access public
const loginUser = asyncHandler( async (req,res)=>{
    
        const { email,password}= req.body;
        if(!password||!email){
            res.json({message:"Enter your email and password"});
        }
        //finding a user with this email in db
        const user = await User.findOne({email})

        //compare the password with hashPassword
        if(await bcrypt.compare(password,user.password)){
            const accesstoken = jwt.sign({
                user:{
                    username: user.username,
                    email:user.email,
                    id: user.id
                }
            },process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : '15m'}
            )
            res.status(200).json({accesstoken})
        } else{
            res.status(401);
            throw new Error ('email or password is not valid')
        }
})

//@desc current user info
//@route GET /api/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user)
})


module.exports= {registerUser,loginUser,currentUser}