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

// file uploads - multer
// try {
//   fs.readdirSync('uploads');
// } catch (error) {
//   console.error('uploads 폴더 없어서 uploads 폴더 생성한다');
//   fs.mkdirSync('uploads');
// }

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, done) {
//       done(null, 'uploads/');
//     },
//     filename(req, file, done) {
//       const ext = path.extname(file.originalname);
//       done(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 }, // 파일크기 5 MB로 제한
// });

// app.get('/upload', (req, res) => {
//   res.sendFile(path.join(__dirname, 'multipart.html'));
// });
// /* app.post('/upload', upload.single('image'), (req, res) => {
//   console.log(req.file);
//   res.send('ok');
// }); */
// app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
//   console.log(req.files, req.body);
//   res.send('OK');
// });

app.listen(app.get('port'), () => {
  console.log(`🌏 RUN ${app.get('port')}번 PORT`);
});
