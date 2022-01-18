import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config()

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Rand API');
});

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.CONNECTION_DB, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));