import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

let todos: Todo[] = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== id);
  res.status(204).end();
});

app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ message: 'Not found' });

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
