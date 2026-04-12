const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(passport.initialize());

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.json({
    message: 'Project B - Medium',
    timestamp: moment().format(),
    id: uuidv4()
  });
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded', file: req.file });
});

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

app.post('/validate', (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details });
  res.json({ message: 'Valid' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 
