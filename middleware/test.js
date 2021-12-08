// import du module fs de gestion des fichiers systeme
const fs = require('fs');


// fonction de suppression de l'image associé à la requete
function deletePicture (req,res, status){
    const filename = req.file.path;
    fs.unlink(`${filename}`, () => { 
        switch (status) {
            case 401 :
                res.status(401).send(new Error('Invalid user ID'));
             break;
            case 400:
                res.status(400).send(new Error('Bad request!'));
             break;  
        }
       
        }
    )
}


function deletePicture (req,res,status){
    if (req.file) {
        const filename = req.file.path;
            fs.unlink(`${filename}`, () => { 
                switch (status) {
                    case 401 :
                        res.status(401).send(new Error('Invalid user ID'));
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
            case 401 :
                res.status(401).send(new Error('Invalid user ID'));
             break;
            case 400 :
                res.status(400).send(new Error('Bad request!'));
             break;  
        }
    }
    
}

// fonction de verification des données saisies par l'utilisateur
function verifySauce (sauce) {
    if (!sauce||!sauce.name|| !sauce.manufacturer || !sauce.description|| !sauce.mainPepper|| !sauce.heat||
        /[^a-zA-Z0-9 ]/.test(sauce.name) ||
        /[^a-zA-Z0-9 ]/.test(sauce.manufacturer) ||
        /[^a-zA-Z0-9.,! ]/.test(sauce.description)||
        /[^a-zA-Z0-9 ]/.test(sauce.mainPepper)||
        !(typeof sauce.heat  == "number") ||
        (sauce.heat>10) )
            {return true}
    else{return false}
}

// fonction de comparaison de userId du body de la requete et du userId du token

function userIdCompared (req,sauce){
    if (!req.token.userId || (req.token.userId!= sauce.userId)){return true}
    else {return false}
}

exports.modifySauce = (req,res,next) => {
    const sauce = req.file? JSON.parse(req.body.sauce) : req.body;

    if (userIdCompared(req,sauce))  {deletePicture(req,res,401);}
    else {
            if (verifySauce(sauce)) {deletePicture(req,res,400);}
            else {next()}
    }

}

    // if (req.file) {
    //     const sauce = JSON.parse(req.body.sauce);
    //     if (userIdCompared(req,sauce))
    //         { deletePicture(req,401);}
    //     else {
    //         if (verifySauce(sauce))
    //             {deletePicture(req,400);}
    //         else {next()}
    //     }
    // }

    // else {
    //     const sauce = req.body;
    //     if (userIdCompared(req,sauce))
    //         { deletePicture(req,401)}
    //     else{
    //         if (verifySauce(sauce))
    //             {deletePicture(req,400);}
    //         else {next()}

    //     }
    // }

  



    
// exports.modifySauce = (req,res,next) => {

//     if (req.file) {
//         const sauce = JSON.parse(req.body.sauce);


//         if ( !req.token.userId || (req.token.userId!= sauce.userId))
//             {
//                 const filename = req.file.path;
//                 console.log(filename);
//                 fs.unlink(`${filename}`, () => {     
//                     res.status(401).send(new Error('Invalid user ID'))
//                     }
//                 )
//             }
//         else {
//             if (!req.body.sauce||!sauce.name|| !sauce.manufacturer || !sauce.description|| !sauce.mainPepper|| !sauce.heat||
//                 /[^a-zA-Z0-9 ]/.test(sauce.name) ||
//                 /[^a-zA-Z0-9 ]/.test(sauce.manufacturer) ||
//                 /[^a-zA-Z0-9.,! ]/.test(sauce.description)||
//                 /[^a-zA-Z0-9 ]/.test(sauce.mainPepper)||
//                 !(typeof sauce.heat  == "number") ||
//                 (sauce.heat>10)
//                 )
//                 {
//                     const filename = req.file.path;
//                     console.log(filename);
//                     fs.unlink(`${filename}`, () => {     
//                         res.status(400).send(new Error('Bad request!'))
//                         }
//                     )
//                 }
//             else {next()}
    
//         }
//     }

//     else {
//         if ( !req.token.userId || (req.token.userId!= req.body.userId))
//             {   return res.status(401).send(new Error('Invalid user ID'))
                
//             }
//         else{
//             if (!req.body.name|| !req.body.manufacturer || !req.body.description|| !req.body.mainPepper|| !req.body.heat||
//                 /[^a-zA-Z0-9 ]/.test(req.body.name) ||
//                 /[^a-zA-Z0-9 ]/.test(req.body.manufacturer) ||
//                 /[^a-zA-Z0-9.,! ]/.test(req.body.description)||
//                 /[^a-zA-Z0-9 ]/.test(req.body.mainPepper)||
//                 !(typeof req.body.heat  == "number") ||
//                 (req.body.heat>10)

//             )
//             {return res.status(400).send(new Error('Bad request!'))}

//             else{next()}

//         }
//     }

  
// }




exports.createSauce = (req,res,next) => {
 
    const sauce = JSON.parse(req.body.sauce);
  
    if (userIdCompared(req,sauce))  {deletePicture(req,res,401);}
    else {
        if (verifySauce(sauce)){deletePicture(req,res,400);}
        else {next()}
    }
    


    }

    // exports.createSauce = (req,res,next) => {
//     // parsing req.body.sauce
//     const sauce = JSON.parse(req.body.sauce);

//     // verification
//     if ( !req.token.userId || (req.token.userId!= sauce.userId))
//         {
//             const filename = req.file.path;
//             console.log(filename);
//             fs.unlink(`${filename}`, () => {     
//                 res.status(401).send(new Error('Invalid user ID'))
//                 }
//             )
//         }
//     else {
//         if (!req.body.sauce||!sauce.name|| !sauce.manufacturer || !sauce.description|| !sauce.mainPepper|| !sauce.heat||
//             /[^a-zA-Z0-9 ]/.test(sauce.name) ||
//             /[^a-zA-Z0-9 ]/.test(sauce.manufacturer) ||
//             /[^a-zA-Z0-9.,!() ]/.test(sauce.description)||
//             /[^a-zA-Z0-9 ]/.test(sauce.mainPepper)||
//             !(typeof sauce.heat  == "number") ||
//             (sauce.heat>10)
//             )
//             {
//                 const filename = req.file.path;
//                 console.log(filename);
//                 fs.unlink(`${filename}`, () => {     
//                     res.status(400).send(new Error('Bad request!'))
//                     }
//                 )
//             }
//         else {next()}

//     



// exports.modifySauce = (req,res,next) => {
//     const sauce = req.file? JSON.parse(req.body.sauce) : req.body;

//     if (userIdCompared(req,sauce))  {deletePicture(req,res,401);}
//     else {
//             if (verifySauce(sauce)) {deletePicture(req,res,400);}
//             else {next()}
//     }

// }

// exports.createSauce = (req,res,next) => {
 
//     const sauce = JSON.parse(req.body.sauce);
  
//     if (userIdCompared(req,sauce))  {deletePicture(req,res,401);}
//     else {
//         if (verifySauce(sauce)){deletePicture(req,res,400);}
//         else {next()}
//     }
    


//     }
