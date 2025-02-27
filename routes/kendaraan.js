var express = require('express');
var router = express.Router();
const Model_Kendaraan = require(`../model/Model_Kendaraan`)
const multer = require(`multer`);
const path = require('path');
const fs = require(`fs`)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/images`)
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const limits = {fileSize: 1 * 1024 * 1024 }

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed'))
    }
    cb(null, true)
}

const upload = multer({storage, limits, fileFilter})

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        let data = await Model_Kendaraan.getAll()
        res.status(200).json({
            status: true,
            msg: "Success get datas",
            data
        })
    } catch (error) {
        res.status(401).json({ msg: error })
    }
});
router.post('/store', upload.single("gambar_kendaraan"), async function (req, res, next) {
    console.log(req.body)
    try {
        let data = {...req.body, gambar_kendaraan: req.file.filename}
        console.log(data)
        await Model_Kendaraan.storeData(data)
        res.status(201).json({status: true, msg: "Success Added" })
    } catch (error) {
        res.status(401).json({ status: false, msg: error })
    }
});
router.get('/:id', async function (req, res, next) {
    try {
        let id = req.params.id
        let data = await Model_Kendaraan.getById(id)
        res.status(200).json({
            status: true,
            msg: "Success get data",
            data
        })
    } catch (error) {
        res.status(401).json({ msg: error })
    }
});
router.patch('/update/:id', upload.single("gambar_kendaraan"), async function (req, res, next) {
    try {
        let id = req.params.id;
        let {nama_kendaraan, id_transmisi, no_pol} = req.body
        let gambar = req.file ? req.file.filename : null
        let rows = await Model_Kendaraan.getById(id)
        const fileold = rows[0].gambar_kendaraan
        if(gambar && fileold) {
            const pathFile = path.join(__dirname, `../public/images/`, fileold)
            fs.unlinkSync(pathFile)
        }
        let gambar_kendaraan = gambar || fileold
        let Data = {
            nama_kendaraan, gambar_kendaraan, id_transmisi, no_pol
        }
        console.log(Data)
        await Model_Kendaraan.update(id, Data)
        return res.status(201).json({
            status: true,
            msg: "Success Updated"
        })
    } catch (error) {
        res.status(401).json({ msg: error })
    }
});
router.delete('/delete/:id', async function (req, res, next) {
    console.log(req.params.id)
    try {
        let id = req.params.id
        let data = await Model_Kendaraan.getById(id)
        let pathFile = path.join(__dirname, "../public/images/", data[0].gambar_kendaraan)
        fs.unlinkSync(pathFile)

        await Model_Kendaraan.delete(id)
        res.status(200).json({status: true, msg: "Success Deleted" })
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: error })
    }
});

module.exports = router;