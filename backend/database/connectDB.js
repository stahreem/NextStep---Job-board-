import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("server is connected to database successfully ");
        
    } catch (error) {
        console.log("error in connectDB", error);
    }
}

export default connectDB;