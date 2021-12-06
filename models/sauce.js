// import module mongoose
const mongoose = require('mongoose');
// import plugin de remontée des erreurs de la base de donnée 
const MongooseErrors = require('mongoose-errors')


// creation du schéma Sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String,required: true },
  heat: { type: Number, min :0, max:10,required: true },
  likes: { type: Number,required: true },
  dislikes: { type: Number,required: true },
  usersLiked: { type: [String],required: true },
  usersDisliked: { type: [String],required: true }
});

//  configuration du plugin mongoose-errors
sauceSchema.plugin(MongooseErrors);


module.exports = mongoose.model('sauce', sauceSchema);

