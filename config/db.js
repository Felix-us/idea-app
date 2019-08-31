import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const host_name = process.env.DB_URL;
const database_name = process.env.DB_NAME;
const uri = `mongodb://${host_name}/${database_name}`; // using service at system
const options = {
    "auth": {
        "authSource": "admin"
    },
    "user": "admin",
    "pass": "123456",
    useNewUrlParser: true
};

mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        await mongoose.connect(uri, options);
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error');
    }
};

export default connectToDb;