const fs = require('fs');





exports.createSauce = (req,res,next) => {
    const sauce = JSON.parse(req.body.sauce);

    console.log(req.body.sauce)
    console.log(req.file)
    console.log(req.file.path)
    console.log(req.body)
    console.log(sauce)
    console.log(req.token.userId)
    console.log(!req.token.userId)
    console.log(req.token.userId!= sauce.userId)

    if ( !req.token.userId || (req.token.userId!= sauce.userId))
        {
            const filename = req.file.path;
            console.log(filename);
            fs.unlink(`${filename}`, () => {     
                res.status(401).send(new Error('Bad request!'))
                }
            )
        }
    else {
        if (!req.body.sauce||!sauce.name|| !sauce.manufacturer || !sauce.description|| !sauce.mainPepper|| !sauce.heat||
            /[^a-zA-Z0-9 ]/.test(sauce.name) ||
            /[^a-zA-Z0-9 ]/.test(sauce.manufacturer) ||
            /[^a-zA-Z0-9 ]/.test(sauce.description)||
            /[^a-zA-Z0-9 ]/.test(sauce.mainPepper)||
            !(typeof sauce.heat  == "number") ||
            (sauce.heat>10))
            {
                const filename = req.file.path;
                console.log(filename);
                fs.unlink(`${filename}`, () => {     
                    res.status(400).send(new Error('Bad request!'))
                    }
                )
            }
        else {next()}

    }
    
    // if (!req.body.sauce||!sauce.name|| !sauce.manufacturer || !sauce.description|| !sauce.mainPepper|| !sauce.heat||
    //     /[^a-zA-Z0-9 ]/.test(sauce.name) ||
    //     /[^a-zA-Z0-9 ]/.test(sauce.manufacturer) ||
    //     /[^a-zA-Z0-9 ]/.test(sauce.description)||
    //     /[^a-zA-Z0-9 ]/.test(sauce.mainPepper)||
    //     !(typeof sauce.heat  == "number") ||
    //     (sauce.heat>10))
    //     {
    //         const filename = req.file.path;
    //         console.log(filename);
    //         fs.unlink(`${filename}`, () => {     
    //             res.status(400).send(new Error('Bad request!'))
    //             }
    //         )
    //     }
    // else {next()}

    }
   


// module.exports = (req,res,next) => {
//     console.log(req.body.sauce)
//     console.log(req.body.image)
//     console.log(req.body)

//     if (req.body.sauce){
//         const sauce = JSON.parse(req.body.sauce);
//         console.log(sauce)
//         if (!req.body.sauce ||
//             !req.body.sauce.name || /[^a-zA-Z0-9 ]/.test(sauce.name) ||
//             !req.body.sauce.manufacturer|| /[^a-zA-Z0-9 ]/.test(sauce.manufacturer) ||
//             !req.body.sauce.description || /[^a-zA-Z0-9 ]/.test(sauce.description)||
//             !req.body.sauce.mainPepper || /[^a-zA-Z0-9 ]/.test(sauce.mainPepper)||
//             !req.body.sauce.heat || !(typeof sauce.heat  == "number")|| (sauce.heat>10))
//             {
//           return res.status(400).send(new Error('Bad request!'));
//         }
//         else {next()}

//     }

//     else {
//         if (!req.body ||
//             !req.body.name || /[^a-zA-Z0-9 ]/.test(req.body.name) ||
//             !req.body.manufacturer || /[^a-zA-Z0-9 ]/.test(req.body.manufacturer) ||
//             !req.body.description || /[^a-zA-Z0-9 ]/.test(req.body.description)||
//             !req.body.mainPepper || /[^a-zA-Z0-9 ]/.test(req.body.smainPepper)||
//             !req.body.heat || !(typeof req.body.sauce.heat  == "number") ||
//             (req.body.sauce.heat>10))
//             {
//           return res.status(400).send(new Error('Bad request!'));
//         }
//         else {next()}
//     }
// }