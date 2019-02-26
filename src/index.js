//Require the dependencies
const express = require('express')
const morgan = require('morgan');
const database = require('./database');
const app = express()

//Setting
app.set("port", process.env.PORT || 8080)

//Database Connection
database()

//Middlerwares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/api/users', require('./routes/user.routes'))

//Starting Server
const server = require('http').Server(app)
server.listen(app.get('port'), () => {
    console.log(`Server is listening on port ${app.get('port')}`)
})

