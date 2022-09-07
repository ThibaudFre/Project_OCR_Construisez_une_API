const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const app = express();
//conection toi MongodB
mongoose.connect('mongodb+srv://tioutaoa:Funaruto64!BdognomB@cluster0.r1tzvsw.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//middleware
app
    .use(bodyParser.json());
//requests
app.get("/",(req, res) => res.json({message: "Test validé"}));

app.listen(port, () => console.log(`Notre application Node est démarré sur : http://localhost:${port}`))