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


// // use this in server.js 
// const connectDB = require('./config/connectDB.js');
// // connect db before server start

// const startServer = async()=>{
//     try{ 
//         await connectDB();

        
//         app.listen(PORT, ()=>{
//         console.log(`Server is running on port ${PORT}`);
//     })
// }
// catch(error){
//     console.log(error);
// }
// }

// startServer();