const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI,{
            //stopping unwanted warning in console
            useNewUrlParser: true,
            useUnifiedTopology:true
        })

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;