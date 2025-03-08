const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  cclStudent: {
    type: String,
    required: true,
    unique: true,
  },
  schoolPic: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  comments:{
    type: String,
    required: true,
  }
  
});

const User = mongoose.model('User', userSchema);
module.exports = User;