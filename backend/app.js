import * as dotenv from "dotenv";
import {auth} from './middleware/auth.middleware.js'
import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { router as userRoutes } from './routes/user.routes.js';
import saucesRoutes from './routes/sauces.routes.js'
import cors from 'cors'



const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path:__dirname +'./../.env' })

console.log("process.env :", process.env.ID)

export const app = express();

//conection to MongodB !!!!!!!!!!!! mot de passe en .env avec librairie .env
mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.MP}@cluster0.r1tzvsw.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//middleware
app.use(cors({
  origin: "http://localhost:4200"
}))

app.use('/images', express.static(path.join(__dirname,'images')))// à voir
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/sauces", auth, saucesRoutes);





