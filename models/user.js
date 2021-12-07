// import module mongoose
const mongoose = require('mongoose');
// import plugin complementaire mongoose pour l unicité des mails
const uniqueValidator = require('mongoose-unique-validator');
// import plugin de remontée des erreurs de la base de donnée 
const MongooseErrors = require('mongoose-errors')


// creation du schéma User
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//  configuration des plugins complémentaires a mongoose
userSchema.plugin(uniqueValidator);
userSchema.plugin(MongooseErrors);

module.exports = mongoose.model('User', userSchema);