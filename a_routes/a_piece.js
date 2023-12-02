const router = require("express").Router();
const { publicPieces, privatePieces } = require("../a_db");
const checkAuth = require("../a_middleware/checkAuth");

router.get('/public', (req, res) => {
    res.json(publicPieces);
})

// this option is deprecated -> we created a_middleware folder
// next -> accessed if everything is fine with the req
// router.get('/private', (req, res, next) => {
//     let userValid = false;

//     if (userValid) {
//         next();
//     } else {

//         return res.status(400).json({
//             "errors": [
//                 {
//                     "msg": "Access denied"
//                 }
//             ]
//         })

//     }
//     res.json(privatePieces);
// })

router.get('/private', checkAuth, (req, res) => {
    res.json(privatePieces);
})


module.exports = router;