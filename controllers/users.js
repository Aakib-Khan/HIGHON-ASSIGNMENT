import bcrypt from 'bcrypt'

import jwt from "jsonwebtoken";

import User from "../models/user.js";


export const login = async (req, res) => {

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Email or password is incorrect");

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Email or password is incorrect");

    // if(!isMatch) return res.send({ NoResult: "Email or password is incorrect" })
    // Create a JSON Web Token
    const token = jwt.sign({ 
        // email: user.email, 
        name: user.name,userCode:user.userCode, },  process.env.TOKEN_SECRET, { expiresIn: "1h" })

    // const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // console.log( process.env.TOKEN_SECRET);
    // res.header("auth-token", token).send(token);
    res.status(200).json({ token })
    // console.log(result);

}






export const signup = async (req, res) => {
    function generateReferralCode() {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let referralCode = "";
        for (let i = 0; i < 8; i++) {
            referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // console.log( referralCode)
        return referralCode
    }
    const { name, email, password, lat, lng } = req.body;
    // console.log('coo  ' + coordinates.lat);
    // console.log(req.body);
    const userCode = generateReferralCode()
    // console.log(userCode);
    // Check if the email already exists

    // Save the user to the database
    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(400).send("Email already exists");

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            userCode,
            lat: lat,
            lng: lng

        })
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
}


export const getUser = async (req, res) => {



    try {
        let user = await User.find().select('-password').select('-_id')
        // let result = await user.save()
        res.send(user)

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong", error })

    }

}