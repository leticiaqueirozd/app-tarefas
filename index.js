const express = require('express');
const app = express();

let tasks = [];
let taskId = 1;

app.use(express.json());

app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  const newTask = { id: taskId++, task };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.get('/', (req, res) => {
    res.send('Servidor rodando');
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
