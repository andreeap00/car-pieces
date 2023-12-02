//const { rawListeners } = require('../model/model');
var Piecedb = require('../model/model');

// creating and saving new piece -> API
exports.create = (req, res) => {
    //validate req, if the user makes a post req with empty body, the message pops
    if (!req.body) {
        res.status(400).send({ message: "please insert the necessary data" });
        return;
    }

    //new piece
    const piece = new Piecedb({
        pieceType: req.body.pieceType,
        pieceNumber: req.body.pieceNumber,
        descript: req.body.descript
    });

    // save piece in db
    piece
        .save(piece)
        .then(data => {
            //res.send(data);
            res.redirect('/add-piece'); // redirect the user to diff URL
        })
        .catch(error => {
            res.status(500).send({
                message: "Piece could not be saved"
            });
        });
}

// retrieve and return all/one pieces 
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        Piecedb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Piece " + id + " not found" });
                }
                else {
                    res.send(data);
                }
            })
            .catch(error => {
                res.status(500).send({
                    message: "Piece " + id + "info could not be retrieved"
                });
            });
    } else {
        Piecedb.find()
            .then(piece => {
                res.send(piece);
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message("Piece info could not be retrieved")
                });
            });
    }
}

//update piece by piece ID
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Please insert the necessary data" })
    }

    const id = req.params.id; // id value from router, the url param

    Piecedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Piece ${id} to update not found` });
            } else {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Piece could not be updated"
            });
        })
}

//delete piece by id
exports.delete = (req, res) => {
    const id = req.params.id;
    Piecedb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Piece ${id} not found` });
            } else {
                res.send({ message: "Piece is deleted" });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Piece " + id + " could not be deleted"
            });
        });
}


