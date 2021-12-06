// import du module password-validator pour imposer un MDP fort
const passwordValidator = require('password-validator');
// import du module email-validator pour verifier la validité de l'email utilisateur
const EmailValidator = require("email-validator");

// creation d'un schéma de password
const passwordSchema = new passwordValidator();

// ajout des propriétés suivantes
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 20
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                // Must have digits
.has().not().spaces()                           // Should not have spaces


/*
* middleware verification adresse mail valide
* et conformité du password au schéma défini
*/
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

