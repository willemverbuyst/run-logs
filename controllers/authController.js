const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res, _next) => {
	const { userName, password } = req.body

	try {
		const hashPassword = await bcrypt.hash(password, 12)
		const newUser = await User.create({
			userName,
			password: hashPassword,
		})
		req.session.user = newUser
		res.status(201).json({
			status: 'success',
			data: { user: newUser },
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			status: 'fail',
			message: error,
		})
	}
}

exports.login = async (req, res, _next) => {
	const { userName, password } = req.body

	try {
		const user = await User.findOne({
			userName,
		})

		if (!user) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			})
		}

		const isCorrectPassword = await bcrypt.compare(password, user.password)

		if (isCorrectPassword) {
			req.session.user = user
			res.status(200).json({
				status: 'success',
				data: { user },
			})
		} else {
			return res.status(404).json({
				status: 'fail',
				message: 'Incorrect username or password',
			})
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({
			status: 'fail',
			message: error,
		})
	}
}
