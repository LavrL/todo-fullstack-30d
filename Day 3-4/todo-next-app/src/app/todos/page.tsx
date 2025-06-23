'use client'; // Компонент работает на клиенте (CSR)

import { useState } from 'react'; // Хук состояния
import { v4 as uuidv4 } from 'uuid'; // Генерация уникального ID

// Тип задачи
type Todo = {
  id: string; // Уникальный идентификатор
  title: string; // Текст задачи
  completed: boolean; // Завершена ли задача
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]); // Список задач
  const [text, setText] = useState(''); // Текст для новой задачи
  const [editId, setEditId] = useState<string | null>(null); // ID редактируемой задачи
  const [editText, setEditText] = useState(''); // Временный текст редактирования

  // Добавление новой задачи
  function addTodo() {
    if (text.trim()) {
      const newTodo: Todo = {
        id: uuidv4(), // Генерируем уникальный id
        title: text,
        completed: false,
      };
      setTodos([...todos, newTodo]); // Добавляем в список
      setText(''); // Очищаем поле ввода
    }
  }

  // Удаление задачи
  function deleteTodo(id: string) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  // Начать редактирование
  function startEdit(todo: Todo) {
    setEditId(todo.id);
    setEditText(todo.title);
  }

  // Сохранить изменения
  function saveEdit(id: string) {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, title: editText } : t
    );
    setTodos(updated);
    setEditId(null);
    setEditText('');
  }

  // Переключить статус выполнено
  function toggleComplete(id: string) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📝 Список задач</h2>

      {/* Форма добавления задачи */}
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow border rounded px-3 py-2"
          placeholder="Введите задачу"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Добавить
        </button>
      </div>

      {/* Список задач */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border px-2 py-1 rounded flex-grow"
                />
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="text-green-600 hover:underline"
                >
                  Сохранить
                </button>
              </>
            ) : (
              <>
                <span
                  className={`flex-grow ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => startEdit(todo)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Удалить
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
