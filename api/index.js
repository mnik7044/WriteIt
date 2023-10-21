const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/user');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs')
const Post = require("./models/post")
require('dotenv').config()


app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(__dirname +'/uploads'))

const saltRounds = 10;
const maxAge = 3 * 24 * 60 * 60;  // This is a time in second, unlike cookie which except time in millisecond
const secret = 'a secret string'

const createToken = (username, id) => {
    return jwt.sign({ username, id }, secret, { expiresIn: maxAge })
}  // This is where we are creating and returning a token


mongoose.connect(process.env.MONGO_URI);

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
            const token = createToken(username, userDoc._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }).json({ id: userDoc._id, username })

        } else {
            // Passwords do not match
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/profile', (req, res) => {
    const { jwt: token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'JWT not provided' });
    }

    jwt.verify(token, secret, {}, async (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid JWT' });
        }

        // Find the user based on the decoded token's ID
        try {
            const user = await User.findById(decodedToken.id);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Combine user information with the username
            const userProfile = {
                username: user.username,
                _id: user._id, // Include the user's ID if needed
                // Add any other fields you want to include
            };

            // Include the combined information in the response
            res.json(userProfile);
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });
});



app.post("/logout", (req, res) => {
    res.cookie('jwt', '').json()
})

app.post("/post", uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    const{jwt: token} = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err
        const { title, summary, content } = req.body
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
           })

        
    
    res.json(postDoc)
    })


})



app.get('/post', async (req, res) => {
    const posts = await Post.find()
    .populate('author', ['username'])
    .sort({createdAt:-1})
    .limit(30)
    res.json(posts)
})

app.get("/post/:id", async(req,res) =>{
    const{id} = req.params
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc)
    

})








const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



  // w21Nrsn4Cs6Qcv7z
  // nklk vbnm bjvbtf uf dtjghygghvb
  // godniknm   