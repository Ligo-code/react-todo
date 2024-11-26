// Component that is responsible for a single todo item

function TodoListItem({todo}) {
    return (<li>
        {todo.title.trim()} </li>); 
}
export default TodoListItem;

/*Ответственность: отображение одной задачи.

Что он делает:

Принимает проп item и выводит его свойство title внутри элемента списка <li>.
Как это работает:

Каждый вызов TodoListItem отображает текст одной задачи, переданной в props.item.*/