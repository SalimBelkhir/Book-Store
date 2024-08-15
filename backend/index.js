import express, { request, response } from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/BooksRoute.js';
import cors from 'cors' ;

const app = express();

app.use(express.json());

 app.use(
   cors({
     origin: 'http://localhost:5173',
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type'],
   })
 );
app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome To My Bookstore');
});



app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

