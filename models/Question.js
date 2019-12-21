const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	title: {
		type: String,
		required: true
	},
	text: {
		type: String
	},
	name: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	tags: [
		{
			tag: {
				type: String,
				required: true
			}
		}
	],
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	answers: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			avatar: {
				type: String
			},
			likes: [
				{
					user: {
						type: Schema.Types.ObjectId,
						ref: 'users'
					}
				}
			],
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = Question = mongoose.model('question', QuestionSchema)
