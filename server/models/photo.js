const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema({

    url : String,
    authorName : String,
    likeCount: Number,
    dislikeCount: Number,
    choices : [{userId: mongoose.ObjectId, hasLiked: {
      type: Boolean,
      default: false
    }, hasDisliked: {
    type: Boolean,
    default: false
    } 
  } ],
    createdAt: {
      type: Date,
      default: Date.now()
  }
       
});

module.exports = mongoose.model('Photo', photoSchema);