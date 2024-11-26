// Component that is responsible for adding a new todo

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState('');

    function handleTitleChange(e) {
        const newTodoTitle = e.target.value;
        setTodoTitle(newTodoTitle);
    }
    function handleAddTodo(e) {
        e.preventDefault();
        if (!todoTitle.trim()) return;
        onAddTodo({ title: todoTitle.trim(), id: uuidv4() });        
        setTodoTitle('');
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input
                id="todoTitle"
                type="text"
                placeholder="Title"
                name="todoTitle"
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button type="submit">Add</button>
        </form>
    )
}
export default AddTodoForm

/* Ответственность: добавление нового элемента в список дел.

Что он делает:

Использует useState для хранения текущего значения ввода (val).
В обработчике формы handleAddTodo:
Предотвращает перезагрузку страницы с помощью e.preventDefault().
Извлекает текст из поля ввода title через e.target.title.value.
Передает это значение в функцию onAddTodo, которая была передана в качестве пропса.
Очищает поле ввода.
Как это работает:

Когда пользователь вводит текст и нажимает кнопку "Add", форма вызывает handleAddTodo.
Эта функция передает текст нового задания родительскому компоненту через onAddTodo.
 */ 