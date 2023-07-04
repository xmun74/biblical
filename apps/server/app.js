/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const multer = require('multer');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  })
);

/* routes 분기 */
app.use('/', indexRouter);
app.use('/user', userRouter);

/* Error 처리 */
app.use((req, res, next) => {
  res.status(404).send(`${req.method} ${req.url} 라우터가 없습니다`);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(`🌏 RUN ${app.get('port')}번 PORT`);
});
