const express = require("express");
const connectDB = require("./db")
const mongoose = require('mongoose');


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


app.put("/user/:id", async (req, res) => {
    try {
      const { cclStudent, schoolPic,schoolName,comments } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { cclStudent, schoolPic, schoolName,comments },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();  // Assuming you are using MongoDB with Mongoose
      res.json(users);
    } catch (error) {
      res.status(500).send('Error fetching users');
    }
  });
  app.delete('/user/:id', async (req, res) => {
    const userId = req.params.id;
  
    // Check if the userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: 'Invalid user ID' });
    }
  
    try {
      // Try to delete the user from the database
      const deletedUser = await User.findByIdAndDelete(userId);
      
      if (!deletedUser) {
        return res.status(404).send({ message: 'User not found' });
      }
      
      res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error deleting user', error });
    }
  });
  

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