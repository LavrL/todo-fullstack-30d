'use client'; // Указываем, что компонент работает на клиенте (обяз. в App Router)

import { useEffect, useState } from 'react';
import { getTodos, addTodo, deleteTodo, updateTodo } from '@/lib/api';

// Тип данных задачи
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function HomePage() {
  // Состояния для списка задач и поля ввода
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');

  // Загружаем задачи при монтировании компонента
  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  // Добавить задачу
  const handleAdd = async () => {
    const todo = await addTodo(newTitle); // Отправляем POST-запрос
    console.log('Adding');
    setTodos([...todos, todo]); // Обновляем список
    setNewTitle(''); // Очищаем поле ввода
  };

  // Переключить статус "завершено"
  const handleToggle = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const updated = await updateTodo(id, { completed: !todo.completed });
    setTodos(todos.map(t => t.id === id ? updated : t)); // Обновляем только одну задачу
  };

  // Удалить задачу
  const handleDelete = async (id: string) => {
    await deleteTodo(id); // Отправляем DELETE-запрос
    setTodos(todos.filter(t => t.id !== id)); // Фильтруем список
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Todo List</h1>

      {/* Поле ввода новой задачи */}
      <div className="flex mb-4 gap-2">
        <input
          className="border p-2 flex-1"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task"
        />
        <button className="bg-blue-500 text-white px-4" onClick={handleAdd}>Add</button>
      </div>

      {/* Список задач */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            <label className="flex items-center gap-2">
              {/* Чекбокс переключения статуса */}
              <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
              <span className={todo.completed ? 'line-through' : ''}>
                {todo.title}
              </span>
            </label>
            <button onClick={() => handleDelete(todo.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
