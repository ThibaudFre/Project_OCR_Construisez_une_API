import { Sauce } from "../models/Sauce.model.js"
import path from "path";
import fs from "fs"

export const createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    sauce.save()
        .then(sauce => res.status(201).json({ message: 'La sauce à bien été sauvegardée' }))
        .catch(error => res.status(400).json({ error }))

}

export const getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
}

export const getOneSauce = (req, res) => {
    const id = req.params.id
    Sauce.findById({ _id: id })
        .then(sauce => {
            res.status(200).json(sauce)
        })
        .catch(error => res.status(404).json({ message: "La sauce demandée n'a pas pût être récupérée.", error: error }))
}

export const modifySauce = (req, res) => {
    const modifiedSauce = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

    delete modifiedSauce.userId

    const id = req.params.id

    Sauce.findOne({ _id: id })
        .then(sauce => {
            if (sauce.userId !== req.auth.userId) {
                return res.status(401).json({ message: `Vous n'avez pas les droits nécessaire à la modification de la sauce: ${sauce.name}.` })
            } else {
                Sauce.updateOne({ _id: id }, { ...modifiedSauce, _id: id })
                    .then(newSauce => {
                        res.status(201).json({ message: `La sauce: ${sauce.name} à bien été modifiée` })
                    })
                    .catch(error => res.status(400).json({ message: `La sauce: ${sauce.name} n'a pas put être modifiée`, error }))
            }


        })
        .catch(error => res.status(400).json({ message: `La sauce à modifier n'a pas été trouvée.`, error }))
}

export const deleteSauce = (req, res) => {
    const id = req.params.id
    console.log("id is: ", id)
    Sauce.findById({ _id: id })
        .then(sauce => {
            if (sauce.userId !== req.auth.userId) {
                return res.status(403).json({ message: `Vous ne bénéficiez pas des droits nécessaires à la supression de la sauce: ${sauce.name}` })
            } else {
                const [other, filename] = sauce.imageUrl.split('/images/')
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: sauce._id })
                        .then(() => res.status(200).json({ message: `La sauce: ${sauce.name} a bien été supprimée` }))
                        .catch(error => res.status(500).json({ message: `La sauce: ${sauce.name} n'a pas put être supprimée`, error }))
                })
            }
        })
        .catch(error => res.status(500).json({ message: "La sauce que vous voulez supprimer n'a pas put être trouvée.", error }))
}

export const isItLiked = (req, res) => {
    const sauceId = req.params.id
    const { userId, like } = req.body

    Sauce.findById({ _id: "632dcca4ac1273219e7873e9" })
        .then(sauce => {
            if (like === 1) {
                sauce.likes += 1
                sauce.usersLiked.push(userId)
            } else if (like === 0) {
                sauce.usersLiked.find(userLike => userLike = userId) === userId ? (() => {
                    sauce.likes -= 1
                    sauce.usersLiked = sauce.usersLiked.filter(keepUsers => keepUsers !== userId)
                })() : (() => {
                    sauce.dislikes -= 1
                    sauce.usersDisliked = sauce.usersDisliked.filter(keepUsers => keepUsers !== userId)
                })()
            } else if (like === -1) {
                sauce.dislikes += 1
                sauce.usersDisliked.push(userId)
            }

            console.log("sauce is: ", sauce)

           Sauce.updateOne({ _id: sauce._id}, sauce)
                .then(sauce => res.status(200).json({ message: `La sauce: ${sauce.name} à bien été liké/disliké` }))
                .catch(error => res.status(500).json({ message: "Nous n'avons pas put sauvegarder le nouveau like/Dislike", error }))
        })
        .catch(error => res.status(404).json({message: "La sauce à liker/disliker est introuvable"}))
}



