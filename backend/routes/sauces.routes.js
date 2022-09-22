import express from "express";
import {auth} from "../middleware/auth.middleware.js"
import {mult as multer}  from "../middleware/multer-config.js"
import {getAllSauces, getOneSauce, createSauce} from "../controllers/sauces.controller.js"

const router = express.Router();

const test = (req, res) => {
    return res.json({ message: "test validé" })
}

router.get("/", multer, auth, getAllSauces)
router.get("/sauces:id", auth, multer, getOneSauce)
router.post("/", multer, auth, createSauce)

export default router