const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const bluebird = require('bluebird');

const config = require('./config');
const authRoute = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');
const getUser = require('./middlewares/getUser');
const checkToken = require('./middlewares/checkToken');
const userRoute = require('./routes/user');
const pageRoute = require('./routes/page');
const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
  if (err) throw err;

  console.log(`Mongo connected`);
})


app.listen(config.port, err => {
  if (err) throw err;

  console.log(`Server listening on port ${config.port}`)
})

app.use(morgan('tiny'));
app.use(express.json());
app.use(session({
  // resave: true,s
  // saveUninitialized: true,
  secret: config.secret
}));

// app.get('*', async(req, res)=>{
//   res.end(`hello world`)
// }) 

app.use('/api', authRoute)
app.use('/api', checkToken, userRoute)
app.use(getUser)
app.use('/api', checkToken, pageRoute)
app.get('/test', checkToken, (req, res) => {
  res.json('test')
})
app.use(errorHandler)