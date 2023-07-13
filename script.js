let todoIdArr = [];
const todoListDiv = document.getElementById("todoList");
const textBox = document.getElementById("todoStr");
let counter = 0

function removeTodo(event) {
    const deleteButton = event.target;
    document.getElementById(deleteButton.getAttribute("parentdivid")).remove();
    // todoIdArr.splice(todoIdArr.indexOf(deleteButton.getAttribute("parentdivid")), 1);
    todoIdArr = todoIdArr.filter(todoItem => {
        if (todoItem === deleteButton.getAttribute("parentdivid"))
            return false;
        return true;
    })
}

function addTodo() {
    if (textBox.value == "") return;
    const newTodoItem = document.createElement("div");
    const id = "todoItemNo" + (counter++);
    newTodoItem.id = id;
    todoIdArr.push(id);
    newTodoItem.innerText = textBox.value;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Remove this Item"
    deleteButton.setAttribute("parentdivid", id);
    deleteButton.onclick = removeTodo;
    newTodoItem.appendChild(deleteButton);
    todoListDiv.appendChild(newTodoItem);
    textBox.value = "";
}
function resetToDoList() {
    todoListDiv.innerHTML = "";
    todoIdArr = [];
}
function getTodoArr() {
    let todoArr = [];
    todoIdArr.forEach((e) => {
        let todoItem = document.getElementById(e).innerText;
        todoArr.push(todoItem.substring(0, todoItem.length - 16));
    });
    return todoArr;
}
document
    .getElementById("addTodoBtn")
    .setAttribute("onclick", "addTodo()");
document
    .getElementById("todoStr")
    .setAttribute("onkeypress", "if(event.key == 'Enter') addTodo()");
document
    .getElementById("resetTodoBtn")
    .setAttribute("onclick", "resetToDoList()");
