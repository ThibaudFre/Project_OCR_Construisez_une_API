import { Sauce } from "../models/Sauce.model.js"
import path from "path";

export const createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    
    sauce.save()
        .then(sauce => res.status(200).json({ message: 'La sauce à bien été sauvegardée' }))
        .catch(error => res.status(400).json({ error }))

}

export const getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}

export const getOneSauce = (req, res) => {
    res.status(200).json('Laisse moi tranquille')
}