const mongoose =require('mongoose');

var schema = new mongoose.Schema({
    pieceType:{
        type: String,
        required:true
    },
    pieceNumber:{
        type: String,
        required:true
    },
    descript:{
        type: String,
        required: true
    }
}); //define a shape of the doc


const Piecedb = mongoose.model('piecedb', schema);

module.exports = Piecedb;


