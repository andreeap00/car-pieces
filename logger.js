const winston = require('winston');

const {
    createLogger,
    transports,
    format
} = require('winston');

 require('winston-mongodb');

const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
        //,
        //         // new transports.File({
        //         //     filename: 'info.log',
        //         //     level: 'info',
        //         //     format: format.combine(format.timestamp(), format.json())
        //         // })
        // // ,
        // //         new transports.MongoDB({
        // //             level: 'error',
        // //             db: process.env.MONGODB,
        // //             options: {
        // //                 useUnifiedTopology: true
        // //             },
        // //             collection: 'database',
        // //             format: format.combine(format.timestamp(), format.json())
        // //         })
    ]
})


module.exports = logger;