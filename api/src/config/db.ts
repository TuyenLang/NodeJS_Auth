import mongoose from 'mongoose';
import config from './config';

const db = async () => {
    await mongoose
    .connect(config.mongoUrl as string )
    .then(() =>{ console.log('Connected to database' + config.mongoUrl)})
    .catch( (error)  => {console.log('Error connecting to database', error)} );
}

export default db;