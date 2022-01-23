const mongoose = require('mongoose')

const runLogSchema = new mongoose.Schema({
	kind: {
		type: String,
		required: ['true', 'Run log must have kind'],
	},
	duration: {
		type: Number,
		required: ['true', 'Run log must have a duration'],
	},
	distance: {
		type: Number,
		required: ['true', 'Run log must have a distance'],
	},
})

const RunLog = mongoose.model('RunLog', runLogSchema)

module.exports = RunLog
