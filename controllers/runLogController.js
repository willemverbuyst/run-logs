const RunLog = require('../models/runLogModel')

exports.getAllRunLogs = async (req, res, next) => {
	try {
		const runLogs = await RunLog.find()
		res.status(200).json({
			status: 'success',
			result: runLogs.length,
			data: { runLogs },
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
		})
	}
}

exports.getOneRunLog = async (req, res, next) => {
	try {
		const runLog = await RunLog.findById(req.params.id)
		res.status(200).json({
			status: 'success',
			data: { runLog },
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
		})
	}
}

exports.createRunLog = async (req, res, next) => {
	try {
		const runLog = await RunLog.create(req.body)
		res.status(200).json({
			status: 'success',
			data: { runLog },
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error,
		})
	}
}

exports.updateRunLog = async (req, res, next) => {
	try {
		const runLog = await RunLog.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		res.status(200).json({
			status: 'success',
			data: { runLog },
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
		})
	}
}

exports.deleteRunLog = async (req, res, next) => {
	try {
		await RunLog.findByIdAndDelete(req.params.id)
		res.status(200).json({
			status: 'success',
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
		})
	}
}
