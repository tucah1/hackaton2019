const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	university: {
		type: String,
		required: true
	},
	faculty: {
		type: String,
		required: true
	},
	department: {
		type: String,
		required: true
	},
	popularity: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = User = mongoose.model('user', UserSchema)
