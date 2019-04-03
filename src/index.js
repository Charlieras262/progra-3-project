//Require the dependencies
const express = require('express')
const morgan = require('morgan');
const database = require('./database');
const passport = require('passport');
const methodOverride = require('method-override');
const app = express()
require('./models/Pensum');

//Setting
app.set("port", process.env.PORT || 8080)

//Database Connection
database()

//Middlerwares
app.use(morgan('dev'))
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

require('./controllers/validations/passport')(passport);

//Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api/pensums', require('./routes/pensum.routes'));
app.use('/api/unities', require('./routes/unity.routes'));
app.use('/api/subjects', require('./routes/subject.routes'));
app.use('/api/teachers', require('./routes/teacher.routes'));

//Starting Server
const server = require('http').Server(app)
server.listen(app.get('port'), () => {
    console.log(`Server is listening on port ${app.get('port')}`)
})
