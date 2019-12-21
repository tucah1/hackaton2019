const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth.js')

const Question = require('../../models/Question')
const User = require('../../models/User')

// @route       POST api/questions
// @desc        Ask a question
// @access      Private
router.post(
	'/',
	[
		auth,
		[
			check('title', 'Title is required!')
				.not()
				.isEmpty(),
			check('text', 'Text is required')
				.not()
				.isEmpty(),
			check('tags', 'Tags are required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		try {
			const user = await User.findById(req.user.id)

			const tags = req.body.tags.split(' ').map(tag => {
				return { tag: tag.trim() }
			})

			const newQuestion = new Question({
				title: req.body.title,
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
				tags: tags
			})

			const question = await newQuestion.save()

			res.json(question)
		} catch (err) {
			console.log(err.message)
			res.status(500).send('Server Error')
		}
	}
)

// @route       GET api/questions/search-questions/:searchText
// @desc        Get all questions || Search questions
// @access      Private
router.get('/search-questions/:searchText', auth, async (req, res) => {
	const searchText = req.params.searchText
	try {
		let questions = await Question.find().sort({ date: -1 })
		if (searchText === '-1') {
			res.json(questions)
		} else {
			const tags = searchText.split('_').map(tag => {
				return { tag: tag.trim() }
			})
			questions = questions.filter(question => {
				let result = tags.map(tag => {
					let res = question.tags.filter(qTag => {
						if (
							qTag.tag
								.toLowerCase()
								.includes(tag.tag.toLowerCase())
						) {
							return true
						} else {
							return false
						}
					})
					if (res.length === 0 || res === null) {
						return false
					} else {
						return true
					}
				})
				if (result.includes(false)) {
					return false
				} else {
					return true
				}
			})
			res.json(questions)
		}
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server Error')
	}
})

// @route       GET api/questions/:id
// @desc        Get question by id
// @access      Private
router.get('/:id', auth, async (req, res) => {
	try {
		const question = await Question.findById(req.params.id)

		if (!question) {
			return res.status(404).json({ msg: 'Question not found' })
		}

		res.json(question)
	} catch (err) {
		console.log(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Question not found' })
		}
		res.status(500).send('Server Error')
	}
})

// @route       DELETE api/questions/:id
// @desc        Delete a question
// @access      Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const question = await Question.findById(req.params.id)

		if (!question) {
			return res.status(404).json({ msg: 'Question not found' })
		}

		// Check user
		if (question.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' })
		}

		await question.remove()

		res.json({ msg: 'Question removed' })
	} catch (err) {
		console.log(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Question not found' })
		}
		res.status(500).send('Server Error')
	}
})

// @route       PUT api/questions/like/:id
// @desc        Like a question
// @access      Private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const question = await Question.findById(req.params.id)
		if (!question) {
			return res.status(404).json({ msg: 'Question not found' })
		}

		if (question.user.toString() === req.user.id) {
			return res
				.status(400)
				.json({ msg: 'You cannot like your own question' })
		}

		if (
			question.likes.filter(like => like.user.toString() === req.user.id)
				.length > 0
		) {
			return res.status(400).json({ msg: 'Question already liked' })
		}

		question.likes.unshift({ user: req.user.id })

		await question.save()

		const user = await User.findById(question.user.toString())
		user.popularity = user.popularity + 10
		await user.save()

		res.json(question.likes)
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server Error')
	}
})

// @route       PUT api/questions/unlike/:id
// @desc        Unlike a question
// @access      Private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const question = await Question.findById(req.params.id)
		if (!question) {
			return res.status(404).json({ msg: 'Question not found' })
		}

		if (
			question.likes.filter(like => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res
				.status(400)
				.json({ msg: 'Question has not yet been liked' })
		}

		// Get the remove index
		const removeIndex = question.likes
			.map(like => like.user.toString())
			.indexOf(req.user.id)

		question.likes.splice(removeIndex, 1)

		await question.save()

		const user = await User.findById(question.user.toString())
		user.popularity = user.popularity - 10
		await user.save()

		res.json(question.likes)
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server Error')
	}
})

// @route       POST api/questions/answers/:id
// @desc        Comment on a question
// @access      Private
router.post(
	'/answers/:id',
	[
		auth,
		[
			check('text', 'Text is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		try {
			const user = await User.findById(req.user.id).select('-password')

			const question = await Question.findById(req.params.id)

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			}

			question.answers.unshift(newComment)

			question.save()

			res.json(question.answers)
		} catch (err) {
			console.log(err.message)
			res.status(500).send('Server Error')
		}
	}
)

// @route       DELETE api/questions/answers/:id/:answer_id
// @desc        Delete the answer
// @access      Private
router.delete('/answers/:id/:answer_id', auth, async (req, res) => {
	try {
		const question = await Question.findById(req.params.id)

		// Pull out answer
		const answer = question.answers.find(
			answer => answer.id === req.params.answer_id
		)
		if (!answer) {
			return res.status(404).json({ msg: 'Answer does not exist' })
		}

		// Check user
		if (answer.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' })
		}

		// Get the remove index
		const removeIndex = question.answers
			.map(answer => answer.user.toString())
			.indexOf(req.user.id)

		question.answers.splice(removeIndex, 1)

		await question.save()

		res.json(question.answers)
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server Error')
	}
})

// @route       PUT api/questions/answers/like/:question_id/:answer_id
// @desc        Like an answer
// @access      Private
router.put('/answers/like/:question_id/:answer_id', auth, async (req, res) => {
	try {
		const question = await Question.findById(req.params.question_id)
		if (!question) {
			return res.status(404).json({ msg: 'Question not found' })
		}

		if (
			question.answers.filter(
				answer => answer._id.toString() === req.params.answer_id
			).length <= 0
		) {
			return res.status(404).json({ msg: 'Answer not found' })
		}

		const answer = question.answers.find(
			answer => answer.id === req.params.answer_id
		)

		if (answer.user.toString() === req.user.id) {
			return res
				.status(404)
				.json({ msg: 'You cannot like your own answer' })
		}

		if (
			answer.likes.filter(like => like.user.toString() === req.user.id)
				.length > 0
		) {
			return res.status(400).json({ msg: 'Answer already liked' })
		}

		answer.likes.unshift({ user: req.user.id })

		await question.save()

		const user = await User.findById(answer.user.toString())
		user.popularity = user.popularity + 10
		await user.save()

		res.json(question.likes)
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server Error')
	}
})

// @route       PUT api/questions/answers/unlike/:question_id/:answer_id
// @desc        Unlike an answer
// @access      Private
router.put(
	'/answers/unlike/:question_id/:answer_id',
	auth,
	async (req, res) => {
		try {
			const question = await Question.findById(req.params.question_id)
			if (!question) {
				return res.status(404).json({ msg: 'Question not found' })
			}

			if (
				question.answers.filter(
					answer => answer._id.toString() === req.params.answer_id
				).length <= 0
			) {
				return res.status(404).json({ msg: 'Answer not found' })
			}

			const answer = question.answers.find(
				answer => answer.id === req.params.answer_id
			)

			if (
				answer.likes.filter(
					like => like.user.toString() === req.user.id
				).length === 0
			) {
				return res
					.status(400)
					.json({ msg: 'Answer has not yet been liked' })
			}

			// Get the remove index
			const removeIndex = answer.likes
				.map(like => like.user.toString())
				.indexOf(req.user.id)

			answer.likes.splice(removeIndex, 1)

			await question.save()

			const user = await User.findById(answer.user.toString())
			user.popularity = user.popularity - 10
			await user.save()

			res.json(answer.likes)
		} catch (err) {
			console.log(err.message)
			res.status(500).send('Server Error')
		}
	}
)

module.exports = router
