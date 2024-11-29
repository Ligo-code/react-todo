// Component that is responsible for a single todo item

function TodoListItem(props) {
    return (<li>
        {(props.item.title).trim()} </li>); 
}
export default TodoListItem;

/*Отвечает за отображение отдельной задачи.
Рендеринг:
Получает задачу через проп item.
Отображает название задачи, удаляя лишние пробелы методом .trim().*/