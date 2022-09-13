export const auth = (req, res, next) =>{
    try{
        console.log(req.header.authorization)
        const token = req.header.authorization.split('')[1];
        next()
    } catch(error) {
        res.status(401).json({error})
        //voir pour aide ci dessous
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userID = decodedToken.userId;
        req.auth = { userId: userID };
    }
}