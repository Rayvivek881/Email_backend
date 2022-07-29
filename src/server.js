require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const MongoUrl = `mongodb+srv://v1:123@cluster0.fss3kv4.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MongoDB...............');
});

// sample for express server
app.use("/", (req, res, next) => {
  res.status(200).json({ success: true, data: "Start Here" });
  next();
});

const PORT = process.env.PORT || 8080; // port at which server listening

app.listen(
  PORT,
  console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`)
);

// fetch routes
let userRouter = require('./routes/user');
let authRouter = require('./routes/auth');

//define root routes.
app.use('/user', userRouter);
app.use('/auth', authRouter);