const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {id: user._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: '7d'})
};


// signup logic 

exports.signup = async (req, res) => {
    try{
        const {name , email, password,role} = req.body;
        const user = await User.create({name , email, password,role});
        res.status(201).json({user, token : generateToken(user)});
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
};

// for login logic
exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({error: 'Invalid credentials'});
        }

        res.json({user, token : generateToken(user)});

}
catch(err){
    res.status(400).json({error: err.message});
}
}