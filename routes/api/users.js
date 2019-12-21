const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

// @route       POST api/users
// @desc        Register user
// @access      Public

router.post(
	'/',
	[
		check('name', 'Name is required')
			.not()
			.isEmail(),
		check('username', 'Username is required')
			.not()
			.isEmpty(),
		check('email', 'Please include valid email').isEmail(),
		check(
			'password',
			'Please include password with at least 6 characters'
		).isLength({ min: 6 }),
		check('university', 'University is required')
			.not()
			.isEmpty(),
		check('faculty', 'Faculty is required')
			.not()
			.isEmpty(),
		check('department', 'Department is required')
			.not()
			.isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			name,
			username,
			email,
			password,
			university,
			faculty,
			department
		} = req.body

		try {
			let user = await User.findOne({ email })

			if (user) {
				return res.status(400).json({
					errors: [{ msg: 'User already exists' }]
				})
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			})

			user = new User({
				name,
				username,
				email,
				avatar,
				password,
				university,
				faculty,
				department,
				popularity: 1
			})

			const salt = await bcrypt.genSalt(10)

			user.password = await bcrypt.hash(password, salt)

			await user.save()

			const payload = {
				user: {
					id: user.id
				}
			}

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 86400 },
				(err, token) => {
					if (err) throw err
					res.json({ token })
				}
			)
		} catch (err) {
			console.log(err.message)
			res.status(500).send('Server error')
		}
	}
)

module.exports = router
