import multer from "multer";

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")// a revoir
    },
    filename: (req, file, cb) => {
        const fullName= file.originalname.split(' ').join('_')
        const [name, ...other] = fullName.split('.jpg')
        const extension = MIME_TYPES[file.mimetype]
        cb(null, name + Date.now() + '.' + extension)
    }
})

export const mult = multer({storage}).single('image')