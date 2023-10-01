const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/user');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const saltRounds = 10;

app.use(cors({credentials:true,origin: "http://localhost:3000" }));
app.use(express.json());

const maxAge = 3 *24 *60 *60;  // This is a time in second, unlike cookie which except time in millisecond


const createToken = (id) => {
    return jwt.sign({ id }, 'a secret string', {expiresIn: maxAge })
}  // This is where we are creating and returning a token


mongoose.connect("mongodb+srv://blogapp:w21Nrsn4Cs6Qcv7z@cluster0.n46n6ir.mongodb.net/?retryWrites=true&w=majority");

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password
        const userDoc = await User.create({
            username,
            password: hashedPassword // Store the hashed password in the database
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(401).json({ message: 'User not found' });
        }
        const passOk = await bcrypt.compare(password, userDoc.password);
        if (passOk) {
            // Passwords match, you can proceed with authentication
            //res.json({ message: 'Login successful' });
            //jwt.sign({ id: userDoc._id }, 'a secret string', {expiresIn: maxAge }, (err,token)=>{
            //    if(err) throw err
              //  res.cookie()
            //})
            const token = createToken(userDoc._id )
            
            res.cookie('jwt', token , {httpOnly: true, maxAge:maxAge*1000}).json('ok')

            
        } else {
            // Passwords do not match
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 

//w21Nrsn4Cs6Qcv7z
// utt jhfghjg 

