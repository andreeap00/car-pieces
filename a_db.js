const users = [{
    email: "andreea@yahoo.com",
    password: "jaasss"
}];


const publicPieces = [{
    piecetype: "DC Motor",
    piecenumber: "543",
    descrip: "DC Motor for EV"
},
{
    piecetype: "AC Motor",
    piecenumber: "943",
    descrip: "AC Motor for EV"
},
{
    piecetype: "Reducer",
    piecenumber: "285",
    descrip: "Reducer for EV"
}
]

const privatePieces = [{ //just the user with admin permission can access
    piecetype: "Charger",
    piecenumber: "2345",
    descrip: "Charger for EV"
}
]


module.exports = {
    users,
    publicPieces,
    privatePieces
}
