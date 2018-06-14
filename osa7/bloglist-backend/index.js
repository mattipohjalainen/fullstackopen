const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const middleware = require('./utils/middleware')
const blogsRouter = require("./controllers/blogs")
const morgan = require("morgan")
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(":method :url status :status :response-time ms"))

mongoose.connect(config.mongoUrl).then(
  () => {
    console.log("connected to mongoDB")},
  (err) => {
    console.log("err",err);
  }
)

app.use(middleware.logger)
app.use('/api/login', loginRouter)
app.use("/api/blogs", blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}

