import { User } from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    
    try {
        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({ message: "All fields are required" ,success:false});
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" ,success:false});
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists",success:false });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phoneNumber,
            password: hashPassword
        });


        await newUser.save();
        res.status(201).json({ message: "User created successfully" ,success:true});

    } catch (error) {
        res.status(500).json({ message: "Something went wrong",success:false });
    }
};

export const login= async (req,res)=>{  
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!email || !password){
            return res.status(400).json({message:"All fields are required", success:false});
        }

        if(user.isBlocked){
            return res.status(400).json({message:"User is blocked",success:false});
        }
        if(!user){
            return res.status(400).json({message:"Invalid credentials",success:false});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials",success:false});
        }
        const token=jwt.sign({email:user.email,id:user._id},process.env.SECRET_KEY,{expiresIn:'1h'});
        res.cookie('token',token,{httpOnly:true});
        res.status(200).json({message:"Login successful",success:true});
    }
    catch (error) {
        res.status(500).json({message:error.message,success:false});
    }
}
