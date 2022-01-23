const express = require('express')
const runLogController = require('../controllers/runLogController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router
	.route('/')
	.get(protect, runLogController.getAllRunLogs)
	.post(protect, runLogController.createRunLog)

router
	.route('/:id')
	.get(protect, runLogController.getOneRunLog)
	.patch(protect, runLogController.updateRunLog)
	.delete(protect, runLogController.deleteRunLog)

module.exports = router
