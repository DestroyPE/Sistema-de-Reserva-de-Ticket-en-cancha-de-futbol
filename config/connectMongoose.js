import mongoose from "mongoose";

const connectMongoose = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB: ${db.connection.host}:${db.connection.port}//${db.connection.name}`);

    } catch(error) {
        console.log(`error connecting mongodb: ${error.message}`)
        process.exit(1);
    }
}

export default connectMongoose;