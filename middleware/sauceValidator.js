// import du module fs de gestion des fichiers systeme
const fs = require('fs');

// fonction de comparaison de userId du body de la requete et du userId du token

function userIdCompared (req,sauce){
    if (!req.token.userId || (req.token.userId!= sauce.userId)){return true}
    else {return false}
}

/*
* fonction de verification des données saisies par l'utilisateur
*   
*/ 
function verifySauce (sauce) {
    if (!sauce||!sauce.name|| !sauce.manufacturer || !sauce.description|| !sauce.mainPepper|| !sauce.heat||
        /[^a-zA-Z0-9 ]/.test(sauce.name) ||
        /[^a-zA-Z0-9 ]/.test(sauce.manufacturer) ||
        /[^a-zA-Z0-9.,! ]/.test(sauce.description)||
        /[^a-zA-Z0-9 ]/.test(sauce.mainPepper)||
        !(typeof sauce.heat  == "number") ||(sauce.heat>10) )
        {return true}
    else {return false}
}


/* fonction de suppression de l'image associé à la requete et reponse à la requete
*  @param req
*  @param res
*  @param status (number) : correspond au statut de la reponse 
*/

function deletePicture (req,res, status){
    if (req.file) {
        const filename = req.file.path;
            fs.unlink(`${filename}`, () => { 
                switch (status) {
                    case 403 :
                        res.status(403).send(new Error('Invalid user ID'));
                    break;
                    case 400:
                        res.status(400).send(new Error('Bad request!'));
                    break;  
                }
            
                }
    )
    }
    else {
        switch (status) {
            case 403 :
                res.status(403).send(new Error('Invalid user ID'));
             break;
            case 400 :
                res.status(400).send(new Error('Bad request!'));
             break;  
        }
    }
    
}

/*
* middleware de verification des donnees utilisateurs 
* lors de la creation d'une sauce
*/

module.exports = (req,res,next) => {
        // assignation du body de la requete en fonction du content type
        const sauce = req.file? JSON.parse(req.body.sauce) : req.body;
        // comparaison du userId du body de la requete et du userId du token
        if (userIdCompared(req,sauce))  {deletePicture(req,res,403);}
        else {
            // verification des données saisies par l'utilisateur
            if (verifySauce(sauce)){deletePicture(req,res,400);}
            else {next()}
        } 
        }
    





