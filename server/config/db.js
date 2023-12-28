import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to MongoDB using Mongoose"))
    .catch(err => console.error("Could not connect to MongoDB", err));
}

export default connectDB;