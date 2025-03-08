const express = require("express");
const connectDB = require("./db")

const User = require("./models/userModel");
const Routes= require("./routes/userRoutes")
const app = express()
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => { 
    res.send('Hello Students'); 
});



app.post("/user", async (req, res) => {
    try {
        const { cclStudent, schoolPic, schoolName,comments } = req.body;
        const existingUser = await User.findOne({ cclStudent });
        if (existingUser) {
            return res.status(400).send({ message: "Username already exists" });
        }
        const newUser = new User({ cclStudent, schoolPic, schoolName,comments });
        await newUser.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


// app.put("/user/:id", async (req, res) => {
//     try {
//       const { cclStudent, schoolPic,schoolName,comments } = req.body;
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         { cclStudent, schoolPic, schoolName,comments },
//         { new: true }
//       );
  
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });


async function startAPI() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Express server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

startAPI();