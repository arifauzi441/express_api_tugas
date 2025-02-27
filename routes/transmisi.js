var express = require('express');
var router = express.Router();
const Model_Transmisi = require(`../model/Model_Transmisi`)

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    let data = await Model_Transmisi.getAll()
    res.status(200).json({status: true,
      msg: "Success get datas",
      data})
  } catch (error) {
    res.status(401).json({msg:error})
  }
});
router.post('/store', async function(req, res, next) {
  try {
    let data = req.body
    console.log(data)
    await Model_Transmisi.storeData(data)
    res.status(201).json({msg:"Berhasil Menambahkan"})
  } catch (error) {
    console.log(error)
    res.status(401).json({msg:error})
  }
});
router.get('/:id', async function(req, res, next) {
  try {
    let id = req.params.id
    console.log(id)
    let data = await Model_Transmisi.getById(id)
    res.status(200).json({
      status: true,
      msg: "Success get data",
      data
  })
  } catch (error) {
    res.status(401).json({msg:error})
  }
});
router.patch('/update/:id', async function(req, res, next) {
  try {
    let id = req.params.id
    let data = req.body
    await Model_Transmisi.update(id, data)
    res.status(200).json({msg:"Berhasil Update"})
  } catch (error) {
    res.status(401).json({msg:error})
  }
});
router.delete('/delete/:id', async function(req, res, next) {
  try {
    let id = req.params.id
    await Model_Transmisi.delete(id)
    res.status(200).json({msg:"Berhasil Menghapus"})
  } catch (error) {
    res.status(401).json({msg:error})
  }
});

module.exports = router;