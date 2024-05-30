import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import linkRoutes from './routes/linkRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/links', linkRoutes);
app.use('/users', userRoutes);
app.set('trust proxy', true);  
app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API');
});

const PORT =  3000;
await mongoose.connect('mongodb://127.0.0.1:27017/TinyUrl', {
  })
.then(() => app.listen(PORT, () => console.log(`Example app listening on http://localhost:${PORT}`)))
.catch(err => console.log(err));

  
