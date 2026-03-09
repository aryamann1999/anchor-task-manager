//entry point starts the server
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const habitRoutes = require('./routes/habits')
const taskRoutes = require('./routes/tasks')
const authRoutes = require('./routes/auth')

app.use('/api/habits',habitRoutes)
app.use('/api/tasks',taskRoutes)
app.use('/api/auth',authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})