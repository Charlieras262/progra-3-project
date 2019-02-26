//Require the dependencies
const express = require('express')
const morgan = require('morgan');
const database = require('./database');
const app = express()

//Setting
app.set("port", process.env.PORT || 8080)
database()

//Middlerwares
app.use(morgan('dev'))
app.use(express.json())

//Routes


//Starting Server
const server = require('http').Server(app)
server.listen(app.get('port'), () => {
    console.log(`Server is listening on port ${app.get('port')}`)
})

