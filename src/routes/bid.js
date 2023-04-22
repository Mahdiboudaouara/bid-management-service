const {createBid,lastBid}=require("../controllers/bidController")
const express = require("express");
const router = express.Router();
router.route('/create').post((req,res)=>{
  createBid(req,res)
});
router.route('/:product_id').get((req,res)=>{
    lastBid(req,res)
  });
module.exports = router;
