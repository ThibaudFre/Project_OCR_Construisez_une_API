import express from 'express';
import bodyParser from "body-parser"
import mongoose from 'mongoose';
import { router as userRoutes } from './routes/user.routes.js';


export const app = express();

//conection to MongodB !!!!!!!!!!!! mot de passe en .env avec librairie .env
mongoose.connect('mongodb+srv://tioutaoa:Funaruto64!BdognomB@cluster0.r1tzvsw.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use("/api/auth", userRoutes);



