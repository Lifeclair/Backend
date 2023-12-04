import mongoose from 'mongoose';
import 'dotenv/config';
import { app } from './config/server';

const mongoURL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017`;

const connect = async () =>
    await mongoose.connect(mongoURL, { dbName: 'life' });

connect().then(() => console.log('Connected to MongoDB'));

const port = process.env.PORT || 3001;

app.listen(port, () =>
    console.log(`Listening on port http://localhost:${port}...`)
);

app.get('/', (req, res) => {
    res.send('Wellcome of the homepage of Life');
});
