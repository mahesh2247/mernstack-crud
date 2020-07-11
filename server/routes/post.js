const express = require('express')

const router = express.Router()

//import controller moethods

const {create , list, read, update, remove} = require('../controllers/post');

router.post('/post', create);  //endpoints
router.get('/posts', list);
router.get('/post/:slug', read); 
router.put('/post/:slug', update); 
router.delete('/post/:slug', remove); 



module.exports = router;