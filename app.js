const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const createError = require('http-errors');
const connectDB = require('./configs/db');

dotenv.config({ path: './configs/.env' });
connectDB();

const authRoute = require('./routes/auth.route');
const colorRoute = require('./routes/color.route');
const iconRoute = require('./routes/icon.route');
const categoryRoute = require('./routes/category.route');
const expensesRoute = require('./routes/expenses.route');

const app = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://sothuchi.online',
    allowedHeaders: 'Origin, X-Requested-With, X-Api-Key, Content-Type, Accept, Authorization',
    methods: 'GET, POST, PUT, DELETE'
  })
);

app.use('/api/auth', authRoute);
app.use('/api/color', colorRoute);
app.use('/api/icon', iconRoute);
app.use('/api/category', categoryRoute);
app.use('/api/expenses', expensesRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound('Có lỗi xảy ra'));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    success: false,
    message: err.message,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('App listening on port ' + PORT);
});

module.exports = app;
