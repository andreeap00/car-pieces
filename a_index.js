const express = require("express");
const auth = require("./a_routes/a_auth");
const piece = require("./a_routes/a_piece");
const logger = require("./logger");

const ap = express();

ap.use(express.json())

ap.use("/auth", auth);
//ap.use('/posts', require("./routes/posts"))
ap.use("/pieces", piece);

ap.get("/", (req,res)=>{
    res.send("Hi, it works!");
})



//const PORT = 5000;
ap.listen(5000, () => {
    logger.log('info',`Server running on http://localhost:5000`)
})

module.exports = ap.listen(5000);