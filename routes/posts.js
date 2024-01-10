const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
  },
  image:{
    type: String
  },
  user:{
    // issai type id store hoga user mai
    type: mongoose.Schema.Types.ObjectId,
    // ab humko reference dena hota hai ki kisi id hai ye toh users collection ka name dediya
    ref: "User"  
    // ab jo id ayegi woh user model ki hai isko pta lg jayega

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('Post', postSchema);

