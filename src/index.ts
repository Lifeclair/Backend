import { app } from '@routes/index';
import 'dotenv/config';
import mongoose from 'mongoose';

const mongoURL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017`;
const connect = async () =>
    await mongoose.connect(mongoURL, { dbName: 'life' });

(async () => {
    try {
        await connect();
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
})();

const port = process.env.PORT || 3001;

app.listen(port, () =>
    console.log(`Listening on port http://localhost:${port}...`)
);

app.get('/', (req, res) => {
    res.send('Wellcome of the homepage of Life');
});
