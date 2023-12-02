const axios = require('axios'); // module that allows us to make get request from api users
//const logger = require('../../logger');

exports.homeRoutes=(req,res)=>{
    //make get req to /api/pieces
    axios.get('http://localhost:3000/api/pieces')
    .then(function(response){
         //logger.log('info',response.data); // to check if the data is retrieved in the console
        res.render('index', {pieces: response.data});
    }) 
    // res.render('index', {pieces: "New Data"});
    .catch(error =>{
        res.send(error);
    })
}

exports.add_piece=(req,res)=>{
    res.render('add_piece');
}

exports.update_piece=(req,res)=>{
    axios.get('http://localhost:3000/api/pieces', {params: {id: req.query.id}})
        .then(function(piecedata){
            res.render('update_piece', {piece: piecedata.data})
        })
        .catch(error =>{
            res.send(error);
        })
        
    //res.render('update_piece');
}

