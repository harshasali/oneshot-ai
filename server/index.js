
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import colleges from './routes/colleges.js';
import students from './routes/students.js';
import courses from './routes/courses.js';

import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/colleges', colleges);
app.use('/students', students);
app.use('/courses', courses);

app.get('/',(req,res) => {
  res.send('Oneshot_AI Placement - Harshavardhan M Sali')
})

//const CONNECTION_URL = 'mongodb+srv://admin:admin123@cluster0.aqgim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  mongoose.connect(process.env.CONNECTION_URL).then(()=>{console.log('...')})