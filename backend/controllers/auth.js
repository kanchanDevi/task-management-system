import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import createError from '../Utils/createError.js';

export const register = async (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password){
        return next(createError({ status: 400, message: 'name, email and password are required' }))
    }

    try{
        const salt= await bcryptjs.genSalt(10);
        const hashedpassword=await bcryptjs.hash(req.body.password, salt);

        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedpassword
        });
        await newUser.save();
        return res.status(201).json("New user created")
    } catch(err){
        console.log(err);
        return next(err);
    }

}

export const login=async (req, res, next)=>{
if(!req.body.email || !req.body.password){
return next(createError({message:'Email and Password are required', status:400}))
}
try{
    const user=await User.findOne({email:req.body.email}).select(
        'name email password'
    );
    if(!user){
        next({message:'User not found with the email', status:404})
    }
    const isPasswordCorrect=await bcryptjs.compare(req.body.password, user.password);
    if(!isPasswordCorrect){
        next({message:'User not found with the email', status:404})
    }
    const payload={
        id:user._id,
        name:user.name
    }
    const token=jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    return res.cookie('access_token', token, {
        httpOnly:true,
    }).status(200).json({name: user.name, email: user.email, message: 'login success' })
}catch(err){
console.log(err);
return next(err);
}
}

export const logout=(req, res)=>{
    res.clearCookie('access_token');
    return res.status(200).json("logout success")
}

export const is_logged_in =(req, res)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.json(false);
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err)=>{
        if(err){
            return res.json(false);
        }
        return res.json(true);
    })
}