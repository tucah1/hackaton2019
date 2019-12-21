const express = require('express')
const router = express.Router()
const gravatar = require('bcryptjs')
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
		).isLength({ min: 6 })
	],
	async (req, res) => {}
)
