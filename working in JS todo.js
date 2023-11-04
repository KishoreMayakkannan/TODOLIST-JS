let todoContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");

// This todoList array doesn't need because we have created localStorage.
// let todolist = [{
//         text: "Learn HTML",
//         uniqueNo: 1
//     },
//     {
//         text: "Learn CSS",
//         uniqueNo: 2
//     },
//     {
//         text: "Learn Python",
//         uniqueNo: 3
//     }
// ]
let todolist = getTodoListfromLocalStorage();
let todoCount = todolist.length;


let saveTodoButton = document.getElementById("saveTodoButton");
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todolist));
}

function getTodoListfromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

function onTodoStatuschange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    // if (checkboxElement.checked === true){
    //     labelElement.classList.add("checkeds");
    // }
    // else{
    //     labelElement.classList.remove("checkeds");
    // }
    labelElement.classList.toggle("checkeds");

    let todoItemIndex = todolist.findIndex(function(eachtodo) {
        let eachTodoId = "todo" + eachtodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }

    })
    let todoObjects = todolist[todoItemIndex];
    if (todoObjects.ischecked === true) {
        todoObjects.ischecked = false;
    } else {
        todoObjects.ischecked = true;
    }
}


function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoContainer.removeChild(todoElement);
    let deleteElemenIndex = todolist.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;

        }
    });

    todolist.splice(deleteElemenIndex, 1);
}

function createandAppendToDo(todo) {

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;


    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.ischecked;

    inputElement.onclick = function() {
        onTodoStatuschange(checkboxId, labelId, todoId);
    }
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    if (todo.ischecked === true) {
        labelElement.classList.add("checkeds");
    }

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId)
    }
    deleteContainer.appendChild(deleteIcon);
}

for (let rock of todolist) {
    createandAppendToDo(rock);
}


function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    todoCount = todoCount + 1;

    if (userInputValue === "") {
        alert("Enter a Valid Text");
        return;
    }

    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        ischecked: false
    }
    todolist.push(newTodo);
    createandAppendToDo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
}