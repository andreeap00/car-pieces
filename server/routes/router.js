const express = require('express');
const route=express.Router();
const services =require('../services/render');
const controller=require('../controller/controller');


// route.get('/', (req, res)=>{
//     //res.send("Car Pieces Management CRUD app");
//     res.render('index');
// });
// route.get('/add-piece', (req, res)=>{
//     res.render('add_piece');
// });
// route.get('/update-piece', (req, res)=>{
//     res.render('update_piece');
// });

/**
 * @description Root Route
 * @method GET /
 */
route.get('/', services.homeRoutes);

/**
 * @description for add pieces
 * @method GET /add-piece
 */
route.get('/add-piece', services.add_piece);

/**
 * @description for update pieces
 * @method GET /update-piece
 */
route.get('/update-piece', services.update_piece);

// API route
route.post('/api/pieces', controller.create); //stores the inserted data (using _form.ejs) in mongoDB
route.get('/api/pieces', controller.find);
route.put('/api/pieces/:id', controller.update);
route.delete('/api/pieces/:id', controller.delete);


module.exports=route;