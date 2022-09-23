import express from "express";
import {auth} from "../middleware/auth.middleware.js"
import {mult as multer}  from "../middleware/multer-config.js"
import {getAllSauces, getOneSauce, createSauce, modifySauce, deleteSauce, isItLiked} from "../controllers/sauces.controller.js"

const router = express.Router();

const test = (req, res) => {
    return res.json({ message: "test validé" })
}

router.get("/", auth, multer, getAllSauces)
router.post("/", auth, multer, createSauce)
router.get("/:id", auth, multer, getOneSauce)
router.put("/:id", auth, multer, modifySauce)
router.delete("/:id", auth, multer, deleteSauce)
router.post('/:id/like', auth, isItLiked)

export default router