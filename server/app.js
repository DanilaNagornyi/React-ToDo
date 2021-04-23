const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = 3000;

const DB = {
  todos: [
    {
      id: uuidv4(),
      text: 'Rect-Redux',
      status: false,
      isEdited: false,
    },
    {
      id: uuidv4(),
      text: 'Redux-Thunk',
      status: false,
      isEdited: false,
    },
    {
      id: uuidv4(),
      text: 'Redux',
      status: false,
      isEdited: false,
    }
  ],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/v1/todos', (req, res) => {
  return res.json(DB.todos)
});

app.post('/api/v1/todos', (req, res) => {

  const newTodo = {
    id: uuidv4(),
    text: req.body.text,
    status: false,
    isEdited: false,
  };
  DB.todos.push(newTodo);
  return res.json(newTodo);
});

app.patch('/api/v1/todos', (req, res) => {
  const currentTodo = DB.todos.find((todo) => todo.id === req.body.id);
  currentTodo.status = !currentTodo.status;
  return res.json(currentTodo);
});

app.delete('/api/v1/todos', (req, res) => {
  const { id } = req.body;
  const deleteTodo = DB.todos.filter((el) => el.id !== id);

  res.sendStatus(200);
});

app.patch('/api/v1/todos/changeEdit', (req, res) => {
  const currentTodo = DB.todos.find((todo) => todo.id === req.body.id);
  currentTodo.text = req.body.text;
  console.log(req.body, 'REQ>BODY');
  console.log(currentTodo, 'TODO');

  return res.sendStatus(200);
});
// app.delete()

app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT);
});
