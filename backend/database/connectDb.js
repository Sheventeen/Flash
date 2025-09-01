import mongoose from 'mongoose'

//  exports our db connection to be used in the server
export const connectDb = async () => {
    try { 
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongodb')
    } catch (error) {
        console.log('ERROR connecting to mongo db', error.message);
        process.exit(1)
    }
}