const express = require("express");
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/all', ratingController.getAllComments);
router.post('/agregar', ratingController.postComment);
router.put('/update/:id', ratingController.updateComment);
router.delete('/delete/:id', ratingController.deleteComment);
router.get('/comments/:id', ratingController.getCommentsByProductId);


module.exports = router;
