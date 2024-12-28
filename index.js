const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const redis = require('redis')
const session = require('express-session')
const {
	BASE_URL,
	MONGO_USER,
	MONGO_PASSWORD,
	MONGO_PORT,
	MONGO_IP,
	REDIS_URL,
	REDIS_PORT,
	SESSION_SECRET,
} = require('./config/config')
const runLogRouter = require('./routes/runLogRoutes')
const userRouter = require('./routes/userRoutes')

let redisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
	host: REDIS_URL,
	port: REDIS_PORT,
})

const PORT = process.env.PORT || 3000
const app = express()

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
	mongoose
		.connect(mongoUrl)
		.then(() => console.log('successfully connected to database'))
		.catch(e => {
			console.log('error: ', e)
			setTimeout(connectWithRetry, 5000)
		})
}

connectWithRetry()

app.enable('trust proxy')
app.use(cors({}))

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(
	session({
		store: new redisStore({ client: redisClient }),
		secret: SESSION_SECRET,
		cookie: {
			secure: false,
			resave: false,
			saveUninitialized: false,
			httpOnly: true,
			maxAge: 3000000,
		},
	})
)

app.use(express.json())

app.get(`${BASE_URL}`, (_req, res) => {
	res.send(`<h1>Hello World from port ${PORT}</h1>`)
})

app.use(`${BASE_URL}run-logs`, runLogRouter)
app.use(`${BASE_URL}users`, userRouter)

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
})
