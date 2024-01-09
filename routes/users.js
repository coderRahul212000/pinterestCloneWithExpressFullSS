const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:9gbvukBVkyR69QOE@cluster0.g3sqkib.mongodb.net/?retryWrites=true&w=majority")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  dp: {
    type: String, // You can store the URL or file path for the display picture
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('User', userSchema);

