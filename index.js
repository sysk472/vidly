const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'Course1'},
  { id: 2, name: 'Course2'},
  { id: 3, name: 'Course3'},
]

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
})

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.ValidationError(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course);
  res.send(course);
});

app.put('/api/courser/:id', (req,res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send('Course not found');

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  result.send(course)
})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send('Course not found');

  res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send('Course not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.status(200).body("Deleted")
});


const port = process.env.PORT || 3120;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})


function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.ValidationError(course, schema);
}