const fs = require('fs');





exports.createSauce = (req,res,next) => {
    const sauce = JSON.parse(req.body.sauce);


    if ( !req.token.userId || (req.token.userId!= sauce.userId))
        {
            const filename = req.file.path;
            console.log(filename);
            fs.unlink(`${filename}`, () => {     
                res.status(401).send(new Error('Invalid user ID'))
                }
            )
        }
    else {
        if (!req.body.sauce||!sauce.name|| !sauce.manufacturer || !sauce.description|| !sauce.mainPepper|| !sauce.heat||
            /[^a-zA-Z0-9 ]/.test(sauce.name) ||
            /[^a-zA-Z0-9 ]/.test(sauce.manufacturer) ||
            /[^a-zA-Z0-9.,! ]/.test(sauce.description)||
            /[^a-zA-Z0-9 ]/.test(sauce.mainPepper)||
            !(typeof sauce.heat  == "number") ||
            (sauce.heat>10)
            )
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
    


    }
   






exports.modifySauce = (req,res,next) => {

    if (req.file) {
        const sauce = JSON.parse(req.body.sauce);


        if ( !req.token.userId || (req.token.userId!= sauce.userId))
            {
                const filename = req.file.path;
                console.log(filename);
                fs.unlink(`${filename}`, () => {     
                    res.status(401).send(new Error('Invalid user ID'))
                    }
                )
            }
        else {
            if (!req.body.sauce||!sauce.name|| !sauce.manufacturer || !sauce.description|| !sauce.mainPepper|| !sauce.heat||
                /[^a-zA-Z0-9 ]/.test(sauce.name) ||
                /[^a-zA-Z0-9 ]/.test(sauce.manufacturer) ||
                /[^a-zA-Z0-9.,! ]/.test(sauce.description)||
                /[^a-zA-Z0-9 ]/.test(sauce.mainPepper)||
                !(typeof sauce.heat  == "number") ||
                (sauce.heat>10)
                )
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
    }

    else {
        if ( !req.token.userId || (req.token.userId!= req.body.userId))
            {   return res.status(401).send(new Error('Invalid user ID'))
                
            }
        else{
            if (!req.body.name|| !req.body.manufacturer || !req.body.description|| !req.body.mainPepper|| !req.body.heat||
                /[^a-zA-Z0-9 ]/.test(req.body.name) ||
                /[^a-zA-Z0-9 ]/.test(req.body.manufacturer) ||
                /[^a-zA-Z0-9.,! ]/.test(req.body.description)||
                /[^a-zA-Z0-9 ]/.test(req.body.mainPepper)||
                !(typeof req.body.heat  == "number") ||
                (req.body.heat>10)

            )
            {return res.status(400).send(new Error('Bad request!'))}

            else{next()}

        }
    }

  
}




