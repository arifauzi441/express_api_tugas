var express = require('express');
var router = express.Router();
const Model_Kategori = require(`../model/Model_Kategori`)

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    let data = await Model_Kategori.getAll()
    res.status(200).json(data)
  } catch (error) {
    res.status(401).json({msg:error})
  }
});
module.exports = router;