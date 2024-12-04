const express = require ('express');
const multer = require ('multer');
const ProductoController = require('../controllers/ProductoController');
const router = express.Router();


// MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filenamer: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage});

router.get("/", (req, res) => { res.render('home', {
    title: "Tienda de electrodomesticos",
    pathToCss: "../public/css"
})}); //home

router.get('/productos', ProductoController.list); 

router.get('/productos/create', ProductoController.create);
router.post('/productos/create', upload.single('imagen'), ProductoController.store);

router.get('/productos/:id/edit', ProductoController.edit);
router.put('/productos/:id', upload.single('imagen'), ProductoController.update);

router.delete('/productos/:id', ProductoController.destroy);




module.exports = router;