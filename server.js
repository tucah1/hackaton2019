const express = require('express')
const path = require('path')
const connectDB = require('./config/database')

const PORT = process.env.PORT || 8080

const app = express()

// Connect to database
connectDB()

// Body parser middleware
app.use(express.json({ extended: false }))

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))
