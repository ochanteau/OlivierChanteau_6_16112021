const passwordValidator = require('password-validator');
const EmailValidator = require("email-validator");

// Create a schema
const passwordSchema = new passwordValidator();


// Add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 20
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have digits
.has().not().spaces()                           // Should not have spaces


module.exports = (req,res,next)=>{
    if (EmailValidator.validate(req.body.email)){
        if (passwordSchema.validate(req.body.password)) { 
            next();
        }
        else {
            return res.status(400).json({error : " Le mot de passe n'est pas assez fort :" + passwordSchema.validate('req.body.password', { list: true })});
        }
        
    }
    else{
        return res.status(400).json({error : " Merci de renseigner une adresse email valide"})
    }
    
}

