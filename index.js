import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import linkRoutes from './routes/linkRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/links', linkRoutes);
app.use('/api/users', userRoutes);

const PORT =  3000;
await mongoose.connect('mongodb://127.0.0.1:27017/TinyUrl', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch(err => console.log(err));
