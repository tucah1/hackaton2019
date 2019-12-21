const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const request = require('request')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// @route       GET api/profile/me
// @desc        Get current users profile
// @access      Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await User.findById(req.user.id).select('-password')

		if (!profile) {
			return res
				.status(400)
				.json({ msg: 'There is no profile for this user' })
		}

		res.json(profile)
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server error')
	}
})

// @route       POST api/profile
// @desc        Edit user's profile
// @access      Private
router.post(
	'/',
	[
		auth,
		[
			check('name', 'Name is required')
				.not()
				.isEmail(),
			check('username', 'Username is required')
				.not()
				.isEmpty(),
			check('email', 'Please include valid email').isEmail(),
			check('university', 'University is required')
				.not()
				.isEmpty(),
			check('faculty', 'Faculty is required')
				.not()
				.isEmpty(),
			check('department', 'Department is required')
				.not()
				.isEmpty()
		]
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
			university,
			faculty,
			department
		} = req.body

		// Build profile object
		const profileFields = {}
		profileFields.name = name
		profileFields.username = username
		profileFields.email = email
		profileFields.university = university
		profileFields.faculty = faculty
		profileFields.department = department

		try {
			let user = await User.findById(req.user.id)

			// Update
			user = await User.findByIdAndUpdate(
				req.user.id,
				{ $set: profileFields },
				{ new: true }
			)

			user = await User.findById(req.user.id).select('-password')

			return res.json({ profile: user })
		} catch (err) {
			console.log(err.message)
			res.status(500).send('Server Error')
		}
	}
)

// @route       GET api/profile/user/:user_id
// @desc        Get profile by user ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const user = await User.findById(req.params.user_id).select('-password')

		if (!user) {
			return res.status(400).json({ msg: 'Profile not found' })
		}

		res.json({ profile: user })
	} catch (err) {
		console.log(err.message)
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' })
		}
		res.status(500).send('Server Error')
	}
})

// @route       DELETE api/profile
// @desc        Delete profile, user & post
// @access      Private
router.delete('/', auth, async (req, res) => {
	try {
		await User.findOneAndRemove({ _id: req.user.id })
		res.json({ msg: 'User deleted!' })
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server Error')
	}
})

// @route       GET api/profile/search-profiles/:searchText
// @desc        Get all profiles || Search profiles
// @access      Public
router.get('/search-profiles/:searchText', async (req, res) => {
	const searchText = req.params.searchText

	try {
		let users = await User.find()
		if (searchText === '-1') {
			res.json({ profiles: users })
		} else {
			const profiles = users.filter(user => {
				if (
					user.name.toLowerCase().includes(searchText.toLowerCase())
				) {
					return true
				} else {
					return false
				}
			})
			res.json({ profiles })
		}
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
