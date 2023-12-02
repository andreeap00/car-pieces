const JWT = require("jsonwebtoken");

module.exports = async(req,res,next) =>{
    const token = req.header('x-auth-token'); // the key in header x-auth-token

    if (!token) {
        return res.status(400).json({
            "errors": [{
                "msg": "Token no found"
            }
            ]
        })
    };

   try {
    let user = await JWT.verify(token, "randomtextjaja");
    req.user = user.email;
    next();
   } catch (error) {
    return res.status(400).json({
        "errors": [{
            "msg": "Invalid token"
        }
        ]
    })
   }

}