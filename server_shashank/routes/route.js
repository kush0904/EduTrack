const jwt=require('jsonwebtoken');
const express=require("express");
const bcrypt=require('bcryptjs');
const router=express.Router();
const cors =require('cors');
const axios = require('axios'); // Import axios

require("../db/conn");
const User=require("../models/registerSchema")
router.use(cors());
router.get("/",(req,res)=>{
    res.send("Hello server");
})

 

router.post("/register",(req,res)=>{
    const {name ,id, email, phone, password} = req.body;

    if( !name || !id || !email|| !phone|| !password){
        return res.status(422).json({error: "PLz fill  the required fields"})
    }

    User.findOne({email: email})
    .then((userExist)=>{    
        if(userExist){    
            return res.status(422).json({error: "Email already exist"})
        } 

        const user=new User({name , id, email, phone, password});
     
        //bcrypt password    
        user.save().then(()=>{
            res.status(201).json({message:"user registered successfuly" });
        }).catch((err)=> res.status(500).json({error: "failed to registered"}));

    }).catch((err)=>{console.log("err"); })
})

//login route

router.post('/login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in the required fields" });
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            const userId = userLogin.id;
            const nm = userLogin.name;

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            try {
                await axios.post('http://localhost:4001/api/saveUserId', { userId,nm });
                console.log('UserId saved successfully');
                console.log(userId);

            } catch (error) {
                console.error('Error saving userId:', error.message);
            }
   
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            } else {
                res.json({ message: "user signed in successfully", userId, token, nm });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
