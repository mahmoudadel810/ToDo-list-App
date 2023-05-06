import {userModel} from '../../DB/models/userModel.js';
import { compareFuncion, hashFunction } from "../../utils/generateHash.js";
import {tokenFunction} from '../../utils/tokenFunction.js'



//signUp

export const signUp = async (req, res) =>
{
    try
    {
        const { name, email, password, age } = req.body

        const hashedPass = hashFunction({ payload: password });
        const newUser = new userModel({ name, email, password: hashedPass, age });
        const savedUser = await newUser.save();

        savedUser 
            ? res.json({ message: 'User Signed Up !', savedUser })
            : res.json({message:'Failed Signing Up'})
    
   }
   catch (error)
    {
        if (error.code == 11000)
        { return res.json({ message: 'Email Already exist' }); } 
       
       return  res.json({ message: 'Catch Error', error: error.message })
        console.log(error);

   }
    
};

//–––––––––––––––––––––––––––––––––––-signIn----------––––––––––––––––––––––––––––––-------------------

export const signIn = async(req,res) =>
{
    try
    {
        const { email, password } = req.body

        const usercheck = await userModel.findOne({ email });
        if (usercheck)
        {
            const match = compareFuncion({ payload: password, referenceData: usercheck.password });
            if (match)
            {
                const token = tokenFunction({ payload: { id: usercheck._id, email: usercheck.email, } })
                
                 await userModel.findOneAndUpdate({ email }, { isLoggedIn : true})
                if (token)
                {
                   return res.json({ message: 'Login Success' , token : token })

                } else
                {
                    res.json({ message: 'Token Generation Fail' })

                }
            } else
            {
                return res.json({ message: 'In-Valid Login Information' })

            }   
        } else
        {
           return  res.json({ message: 'In-Valid Login Information' })

        } 
    }
    catch (error)
    {
        return res.json({ message: 'Catch Error ', error: error.message })

    }
};
//-------------------------------updateProfile--------------------------------------------

export const updateProfile =async (req, res) =>
{
    try
    {
        const { name, age } = req.body;
        const { _id } = req.user
        
        const user = await userModel.findById(_id)
        if (user)
        {
        const update = await userModel.findByIdAndUpdate(_id,
                {
                 name,
                 age
                },
                { new: true }
            )
            
            update 
                ?  res.json({ message: 'Updated Done' , update})
                : res.json({message:'Update Failed'})
            
        } else
        {
            return res.json({ message: 'User Not Found , Can Not Update' })

        }
        
    }
    catch (error)
    {
        return res.json({ message: 'Catch Error ', error: error.message })

        
    }
};

//-----------------------------------deleteProfile-------------------------------

export const deleteProfile = async (req, res) =>
{
    try
    {
        const { _id } = req.user; // اليوزر اللي عامل تسجيل دخول
        const { user_id } = req.params;
        
        if (user_id == _id)
        {
            const user = await userModel.findByIdAndDelete(_id)

            user 
                ? res.json({ message: 'Delete Done' , user})
                : res.json({message : 'can not delete'})
        }
        else
        {
            res.json({message: 'you are not authorized to delete this profile'})
        }
        
    }
    catch (error)
    {
        return res.json({ message: 'Catch Error ', error: error.message })

    }
};

//--------------------------------------logOut-------------------------------------------------

export const logOut = async (req, res,next) =>
{
    try
    {
        const { _id } = req.user;

        const user = await userModel.findByIdAndUpdate(_id, {
            isLoggedIn: false, 
        });

        user 
            ? res.status(200).json({ message: 'Logged Out' })
            : next(new Error("Unknown Error"));     
    }
    catch (error)
    {
        return res.json({ message: 'Catch Error ', error: error.message })

    }
}