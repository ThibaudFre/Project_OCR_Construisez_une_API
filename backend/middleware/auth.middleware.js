import * as dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

export const auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')?.[1];

    if (!token) {
        return res.status(403).json({ message: "le jwt est requis" })
    }

    //req.auth = { userId: userID };

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Vous n'avez pas été identifié. Veuillez vous connecter via vos identifiants utilisateurs" })
    }

    let tokenBody;

    jwt.verify(token, process.env.MPTOKEN, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({ message: 'L\'utilisateur n\'est pas authorisé à accéder à cette ressource' })
        } else {
            tokenBody = decodedToken
        }
    });

    const userId = tokenBody.userId;
    if (req.body.userId && req.body.userId !== userId) {
        return res.status(401).json({ message: "L'identifiant de l'utilisateur est invalide." })
    }

    req.auth = {
        userId: userId
    }
    next()
}