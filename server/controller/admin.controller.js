    import { Admin } from "../model/admin.model.js";
    import { User } from "../model/user.model.js";
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';


    export const login= async (req,res)=>{  
        const {email,password}=req.body;
        try {
            const admin=await Admin.findOne({email});
            if(!email || !password){
                return res.status(400).json({message:"All fields are required",success:false});
            }   
            if(!admin){
                return res.status(400).json({message:"Invalid credentials",success:false});
            }
            const isPasswordCorrect=await bcrypt.compare(password,admin.password);
            if(!isPasswordCorrect){
                return res.status(400).json({message:"Invalid credentials" ,success:false});
            }
            const token=jwt.sign({email:admin.email,id:admin._id},process.env.SECRET_KEY,{expiresIn:'1h'});
            res.cookie('token',token,{httpOnly:true});

            res.status(200).json({message:"Login successful",success:true});
        }
        catch (error) {
            res.status(500).json({ message: "Something went wrong",success:false });
        }
    }

export const logout=async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Logged out successfully",success:true});
}


export const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong",success:false });
    }
}


export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    console.log(`Deleting user with ID: ${userId}`); // Log the user ID

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



export const BlockUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user is already blocked
        if (user.isBlocked) {
            return res.status(400).json({ message: "User already blocked" });
        }

        user.isBlocked = true; 
        await user.save();

        res.status(200).json({
            message: `User blocked successfully`,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const UnBlockUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Toggle the isBlocked fiel

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.status(200).json({
            message: `User Unblocked successfully`,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

