const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Question = require('./questions');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
  'mongodb+srv://admin:new_user23@cluster0.d1gq6.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/questions', paginatedResults(Question), (req, res) => {
  res.json(res.paginatedResults)
});

router.get('/questions/id/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json({ question })
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
});

router.post('/questions', (req, res) => {
  const { question } = req.body;
  const name = question.name;
  const email = question.email;
  const obs = question.obs;
  const date = Date.parse(question.date);

  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!emailRegex.test(email.toLowerCase())) {
    return res.status(400).json({ message: "Please insert a valid email." });
  }

  if (!name || !email || !date) {
    return res.status(400).json({ message: "Not all fields have been entered." });
  }

  const newQuestion = new Question({
    name,
    email,
    obs,
    date,
  });
  newQuestion.save()
  .then(() => res.json('Question added!'))
  .catch(err => res.status(400).json(err));
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = 20
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {
      next: {
        page: undefined
      },
      previous: {
        page: undefined
      }
    }
    const sortBy = page ? 1 : -1;
  
    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1
      }
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1
      }
    }

    try{
      results.results = await model.find().sort({_id:sortBy}).limit(limit).skip(startIndex).exec()
      res.paginatedResults = results
      next()
    } catch (e) {
      res.status(500).json({ message:e.message })
    }
  }
}

app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
