class TodoItem {
    static counter = 0;
    constructor(title, dueDate) {
        this._id = TodoItem.counter++;
        this.title = title;
        this.dueDate = dueDate;
    }
}

const todoTitleInput = document.getElementById('todoTitleInput');
const todoDateInput = document.getElementById('todoDateInput');
const todoListDiv = document.getElementById('todoListDiv');
const todoListTable = document.getElementById('todoListTable');
const addButton = document.getElementById('addTodoBtn');
const resetButton = document.getElementById('resetTodoBtn');
todoListTable.style.borderCollapse = "collapse";

clearTableRender();
let todoArr = JSON.parse(localStorage.getItem("todoArray"));
if (!Array.isArray(todoArr))
    todoArr = []
else
    initRender();

function initRender() {
    todoArr.forEach(element => {
        renderNewTodo(element);
    });
}

function clearTableRender() {
    const headerBorder = "1px solid black";
    const headerPadding = "4px";
    todoListTable.innerHTML = "";
    const headerRow = document.createElement("tr");
    const titleHeader = document.createElement("th");
    titleHeader.innerText = "Title";
    const dateHeader = document.createElement("th");
    dateHeader.innerText = "Due Date";
    const editHeader = document.createElement("th");
    editHeader.innerText = "Edit";
    const deleteHeader = document.createElement("th");
    deleteHeader.innerText = "Delete";
    titleHeader.style.border = headerBorder;
    titleHeader.style.padding = headerPadding;
    dateHeader.style.border = headerBorder;
    dateHeader.style.padding = headerPadding;
    editHeader.style.border = headerBorder;
    editHeader.style.padding = headerPadding;
    deleteHeader.style.border = headerBorder;
    deleteHeader.style.padding = headerPadding;
    headerRow.appendChild(titleHeader);
    headerRow.appendChild(dateHeader);
    headerRow.appendChild(editHeader);
    headerRow.appendChild(deleteHeader);
    todoListTable.appendChild(headerRow);
}


function addTodo() {
    const title = todoTitleInput.value;
    const date = todoDateInput.value;
    if (title === '' || date === '') {
        alert("You have to fill all the fields first!");
        return;
    }
    todoTitleInput.value = "";
    todoDateInput.value = "";
    const newTodoItem = new TodoItem(title, date);
    renderNewTodo(newTodoItem);
    todoArr.push(newTodoItem);
    localStorage.setItem("todoArray", JSON.stringify(todoArr));
}

function renderNewTodo(todoItem) {
    const cellBorder = "1px solid black";
    const cellPadding = "4px";
    const newTodoItemTableRow = document.createElement("tr");
    const newTodoTitleData = document.createElement("td");
    const newTodoDateData = document.createElement("td");
    const newTodoEditButtonData = document.createElement("td");
    const newTodoDeleteButtonData = document.createElement("td");
    const newTodoEditButton = document.createElement("button");
    const newTodoDeleteButton = document.createElement("button");
    newTodoTitleData.style.border = cellBorder;
    newTodoTitleData.style.padding = cellPadding;
    newTodoDateData.style.border = cellBorder;
    newTodoDateData.style.padding = cellPadding;
    newTodoEditButtonData.style.border = cellBorder;
    newTodoEditButtonData.style.padding = cellPadding;
    newTodoDeleteButtonData.style.border = cellBorder;
    newTodoDeleteButtonData.style.padding = cellPadding;
    newTodoItemTableRow.appendChild(newTodoTitleData);
    newTodoItemTableRow.appendChild(newTodoDateData);
    newTodoItemTableRow.appendChild(newTodoEditButtonData);
    newTodoItemTableRow.appendChild(newTodoDeleteButtonData);
    newTodoEditButtonData.appendChild(newTodoEditButton);
    newTodoDeleteButtonData.appendChild(newTodoDeleteButton);
    newTodoTitleData.innerText = todoItem.title;
    newTodoDateData.innerText = todoItem.dueDate;
    newTodoEditButton.innerText = "Edit";
    newTodoDeleteButton.innerText = "Delete"
    todoListTable.appendChild(newTodoItemTableRow);
}

function reset() {
    clearTableRender();
    todoArr = [];
    localStorage.removeItem("todoArray");
}

todoTitleInput.onkeyup = event => {
    if (event.key == "Enter")
        addTodo();
};
todoDateInput.onkeyup = event => {
    if (event.key == "Enter")
        addTodo();
};
addButton.onclick = addTodo;
resetButton.onclick = reset;