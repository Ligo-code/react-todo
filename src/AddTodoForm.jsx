// Component that is responsible for adding a new todo

import { useState } from "react";

function AddTodoForm({ onAddTodo }) {
    const [val, setVal] = useState('');
    function handleAddTodo(e) {
        e.preventDefault();
        const todoTitle = e.target.elements.todoTitle.value;
        console.log(todoTitle);
        onAddTodo(todoTitle);
        setVal('');
    }
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle"> Title </label>
            <input
                id="todoTitle"
                type="text"
                placeholder="Title"
                name="title"
                value={val}
                onChange={(e) => setVal(e.target.value)} // setting the value of the input
            />
            <button type="submit"> Add </button>
        </form>
    )
}
export default AddTodoForm

/* Отвечает за добавление новой задачи.
Состояние:
Хук useState управляет текстом ввода (val).
Функция handleAddTodo:
Срабатывает при отправке формы.
Извлекает текст новой задачи из поля ввода (e.target.elements.todoTitle.value).
Передает значение в функцию onAddTodo (переданную из App).
Очищает поле ввода, сбрасывая состояние val.
Рендеринг:
Форма с полем ввода для названия задачи (todoTitle) и кнопкой "Add".
При вводе текста обновляет локальное состояние val.
 */ 