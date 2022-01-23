const express = require('express')
const runLogController = require('../controllers/runLogController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router
	.route('/')
	.get(protect, runLogController.getAllPosts)
	.post(protect, runLogController.createPost)

router
	.route('/:id')
	.get(protect, runLogController.getOnePost)
	.patch(protect, runLogController.updatePost)
	.delete(protect, runLogController.deletePost)

module.exports = router
