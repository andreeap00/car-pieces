const router = require("express").Router();
const { check, validationResult } = require("express-validator"); // check - used to check if certain rules are followed
const { users } = require('../a_db');
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
//const e = require("express");
// const Joi = require('joi');


// // Define Schemas
// const schema = Joi.object({
//     password: Joi.string()
//         .min(4)
//         .max(32)
//         .required(),
//     email: Joi.string()
//         .email({
//             minDomainSegments: 5,
//             tlds: {
//                 allow: [ 'com', 'net', 'mx', 'ro' ]
//             }
//         })
// });

// router.post('/api/signup', (req, res) => {
//     const { body } = req;
//     try {
//         const { error } = schema.validate(body);
//         if (error) {
//             res.status(400).send({
//                 message: error
//             });
//         }
//         res.status(201).send({ message: 'OK' })
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });


// between [] are written all the checks we want to make
router.post('/signup', [
    check("email", "Please provide a valid email")
        .isEmail(),
    check("password", "Please provide a valid password (>5 characters)")
        .isLength({
            min: 5
        })
], async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    // check in the req body if the particular specifications are respected

    // input validation
    if (!errors.isEmpty()) { // if it doesn t pass throws error
        return res.status(400).json({ //send back array of data
            errors: errors.array()
        })
    }

    // check if the user already exist in a_db
    let user = users.find((user) => {
        return user.email === email;
    })

    if (user) {
        return res.status(400).json({
            "errors": [{
                "msg": "User already existent"
            }
            ]
        })
    }

    //console.log(email, password);

    const hashedPassword = await bcrypt.hash(password, 10); // the bigger the number, the more qualitative the safety

    users.push({ // in a_db
        email,
        password: hashedPassword
    })

    //console.log(hashedPassword);
    //res.send("Validation passed");

    const token = await JWT.sign({  // to create token
        email // the payload, not sensistive info
    }, "randomtextjaja", {
        expiresIn: 3600000 // the JWT to expire in interval
    }) // the secret

    res.json({
        token
    })

})


// login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = users.find((user) => {
        return user.email === email;
    });

    // validation already done with check
    if (!user) {
        return res.status(400).json({
            "errors": [{
                "msg": "Invalid Credentials"
            }
            ]
        })
    };

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            "errors": [
                {
                    "msg": "Invalid credentials"
                }
            ]
        })
    }

    const token = await JWT.sign({  // to create token
        email // the payload, not sensistive info
    }, "randomtextjaja", {
        expiresIn: 3600000 // the JWT to expire in interval
    }) // the secret

    res.json({
        token
    })

})


router.get("/all", (req, res) => {
    res.json(users);
})

module.exports = router;