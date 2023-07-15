class TodoItem {
    constructor(title, dueDate) {
        this._id = "" + new Date().getTime();
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
const headerBorder = "1px solid black";
const headerPadding = "4px";
const cellBorder = "1px solid black";
const cellPadding = "4px";
const inputFieldsLeftMargin = "5px";

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

const saveToLocalStorage = () =>
    localStorage.setItem("todoArray", JSON.stringify(todoArr));


function clearTableRender() {
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
    addTodoToArray(newTodoItem);
}

const addTodoToArray = todoItem => {
    todoArr.push(todoItem);
    saveToLocalStorage();
}

const removeTodoFromArray = todoId => {
    todoArr = todoArr.filter(todoItem => {
        if (todoItem._id === todoId)
            return false;
        return true;
    })
    saveToLocalStorage();
}

const updateTodoArray = (todoId, newTitle, newDate) => {
    todoArr = todoArr.map(todoItem => {
        if (todoItem._id === todoId) {
            todoItem.title = newTitle;
            todoItem.dueDate = newDate;
        }
        return todoItem;
    });
    saveToLocalStorage();
}

function renderNewTodo(todoItem) {
    const newTodoItemTableRow = document.createElement("tr");
    const newTodoTitleData = document.createElement("td");
    const newTodoDateData = document.createElement("td");
    const newTodoEditButtonData = document.createElement("td");
    const newTodoDeleteButtonData = document.createElement("td");
    const newTodoEditButton = document.createElement("button");
    const newTodoDeleteButton = document.createElement("button");
    newTodoItemTableRow.id = todoItem._id;
    newTodoEditButton.dataset.todoId = todoItem._id;
    newTodoDeleteButton.dataset.todoId = todoItem._id;
    newTodoEditButton.onclick = editTodo;
    newTodoDeleteButton.onclick = deleteTodo;
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

function removeTodoRender(todoId) {
    const todoRow = document.getElementById(todoId);
    todoRow.remove();
}

function renderResetRow(todoId) {
    const todoRow = document.getElementById(todoId);
    const titleTableCell = todoRow.childNodes[0];
    const dateTableCell = todoRow.childNodes[1];
    const editTableCell = todoRow.childNodes[2];
    titleTableCell.childNodes[1].remove();
    dateTableCell.childNodes[1].remove();
    editTableCell.innerHTML = "";
    const editButton = document.createElement("button");
    editButton.dataset.todoId = todoId;
    editButton.onclick = editTodo;
    editButton.innerText = "Edit";
    editTableCell.appendChild(editButton);
}

function editTodoRender(todoId) {
    const todoRow = document.getElementById(todoId);
    const titleTableCell = todoRow.childNodes[0];
    const dateTableCell = todoRow.childNodes[1];
    const editTableCell = todoRow.childNodes[2];
    const newTitleInput = document.createElement("input");
    newTitleInput.type = "text";
    newTitleInput.placeholder = "Type your new title here";
    newTitleInput.style.marginLeft = inputFieldsLeftMargin;
    titleTableCell.appendChild(newTitleInput);
    const newDateInput = document.createElement("input");
    newDateInput.type = "date";
    newDateInput.style.marginLeft = inputFieldsLeftMargin;
    dateTableCell.appendChild(newDateInput);
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save Changes";
    saveButton.dataset.todoId = todoId;
    saveButton.onclick = saveChanges;
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.dataset.todoId = todoId;
    cancelButton.onclick = cancelChanges;
    editTableCell.innerHTML = "";
    editTableCell.appendChild(saveButton);
    editTableCell.appendChild(cancelButton);
}

function updateTodoRender(todoId, newTitle, newDate) {
    const todoRow = document.getElementById(todoId);
    todoRow.childNodes[0].textContent = newTitle;
    todoRow.childNodes[1].textContent = newDate;
    const editTableCell = todoRow.childNodes[2];
    editTableCell.innerHTML = "";
    const editButton = document.createElement("button");
    editButton.dataset.todoId = todoId;
    editButton.onclick = editTodo;
    editButton.innerText = "Edit";
    editTableCell.appendChild(editButton);
}

function reset() {
    clearTableRender();
    todoArr = [];
    localStorage.removeItem("todoArray");
}

function editTodo(event) {
    const todoId = event.target.dataset.todoId;
    editTodoRender(todoId);
}

function deleteTodo(event) {
    const todoId = event.target.dataset.todoId;
    removeTodoRender(todoId);
    removeTodoFromArray(todoId);
}

function saveChanges(event) {
    const todoId = event.target.dataset.todoId;
    const todoRow = document.getElementById(todoId);
    const newTitle = todoRow.childNodes[0].childNodes[1].value;
    const newDate = todoRow.childNodes[1].childNodes[1].value;
    if (newTitle === '' || newDate === '') {
        alert("You have to fill all the fields first!");
        return;
    }
    updateTodoRender(todoId, newTitle, newDate);
    updateTodoArray(todoId, newTitle, newDate);
}

function cancelChanges(event) {
    const todoId = event.target.dataset.todoId;
    renderResetRow(todoId);
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