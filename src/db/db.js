const mongoose = require('mongoose');

const connectDB= async()=>{
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
        
    } catch (error) {
        console.log(error, "Database connection failed");
        process.exit(1);
        
    }

}
module.exports=connectDB; 