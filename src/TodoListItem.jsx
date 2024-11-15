function TodoListItem(props) {
    return (<li>
        {(props.item.title).trim()} </li>);
}
export default TodoListItem;