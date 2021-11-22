const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] }
});



// const sauceSchema = mongoose.Schema({
//   userId: { type: String },
//   name: { type: String },
//   manufacturer: { type: String },
//   description: { type: String },
//   mainPepper: { type: String },
//   imageUrl: { type: String },
//   heat: { type: Number },
//   likes: { type: Number },
//   dislikes: { type: Number },
//   usersLiked: { type: [String] },
//   usersDisliked: { type: [String] }
// });

module.exports = mongoose.model('sauce', sauceSchema);

// reverifier le modele de sauce notamment les required