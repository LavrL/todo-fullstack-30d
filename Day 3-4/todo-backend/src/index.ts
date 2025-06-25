import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // загружаем .env переменные

import supabase from './supabase'; // наш клиент Supabase

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// 🔹 Получить все задачи
app.get('/api/todos', async (_req, res) => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 🔹 Добавить новую задачу
app.post('/api/todos', async (req, res) => {
  const { title } = req.body;

  const { data, error } = await supabase
    .from('todos')
    .insert([{ title }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// 🔹 Удалить задачу по ID
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
});

// 🔹 Обновить задачу по ID
app.patch('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const { data, error } = await supabase
    .from('todos')
    .update({ title, completed })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
