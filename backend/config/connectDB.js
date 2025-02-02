const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI) ;

        console.log("the DB is connected");
}
catch (err) {
    console.log(err);
    process.exit(1);


}
}

module.exports = connectDB;