const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
console.log('router loaded');

router.get('/', homeController.Home);
router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));
module.exports=router;