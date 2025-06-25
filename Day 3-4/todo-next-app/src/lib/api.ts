// Базовый URL backend-сервера, берётся из .env.local
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Получить список всех задач (GET /api/todos)
export async function getTodos() {
    const res = await fetch(`${API_BASE_URL}/api/todos`);
    return res.json(); // Возвращаем массив задач
}

// Добавить новую задачу (POST /api/todos)
export async function addTodo(title: string) {
    const res = await fetch(`${API_BASE_URL}/api/todos`, {
        method: 'POST', // Используем метод POST
        headers: { 'Content-Type': 'application/json' }, // Отправляем JSON
        body: JSON.stringify({ title }), // Передаём только поле title
    });
    return res.json(); // Возвращаем созданную задачу
}

// Удалить задачу по ID (DELETE /api/todos/:id)
export async function deleteTodo(id: string) {
    await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'DELETE',
    });
    // Возврата нет — задача просто удаляется
}

// Обновить задачу по ID (PATCH /api/todos/:id)
export async function updateTodo(
    id: string,
    data: Partial<{ title: string; completed: boolean }>
) {
    const res = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: 'PATCH', // Частичное обновление
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // Передаём только то, что нужно обновить
    });
    return res.json(); // Возвращаем обновлённую задачу
}
