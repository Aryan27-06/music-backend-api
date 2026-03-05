const usermodel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');



const registerUser = async(req, res)=>{
    const {username, email, password, role='user'} = req.body;
    const isUserAlreadyExists= await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

if(isUserAlreadyExists){
    return res.status(409).json({
        message:"User already exists"
    })
}

const hash= await bcrypt.hash(password, 10)
const user = await userModel.create({
    username,
    email,
    password: hash,
    role
})

const token= jwt.sign({
    id:user._id,
    role:user.role
}, process.env.JWT_SECRET)
 
res.cookie("token", token)

    res.status(201).json({
        message:"User Created Successfully",
        user: {
            _id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
        }
    })

}


const loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (!user) {
        return res.status(404).json({
            message: "Invalid Credentials"
        });
    }

    const isUserValid = await bcrypt.compare(password, user.password);

    if (!isUserValid) {
        return res.status(404).json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    return res.status(200).json({
        message: "Logged in Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
    });
};

module.exports= {registerUser, loginUser};