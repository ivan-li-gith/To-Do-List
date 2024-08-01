
//setting the var todo to whatever is in storage (if it exists) or making it into an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector("button");
const deleteButton = document.getElementById("deleteButton");

//initializing the document
//the addEventListener is constantly listening to the website (denoted by the DOMContentLoaded) and runs the function inside
document.addEventListener("DOMContentLoaded", function(){
    //the function that is running is another addEventListener but on the add button. if it senses a click, it is going to run the addTask function
    addButton.addEventListener("click", addTask);

    //the point of this is if it senses a key being pressed and if the key is enter add the task (just another way to add a task instead of pressing the add button)
    todoInput.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            //prevents the website from reloading when u hit the enter button
            event.preventDefault();
            addTask();
        }
    })

    deleteButton.addEventListener("click", deleteAllTask);
    displayTasks();
});

function addTask(){
    //setting newTask to what type in the box
    const newTask = todoInput.value.trim()

    //adding newTask to the array
    if(newTask !== ""){
        todo.push({text: newTask, disabled: false});
    }

    savetoLocalStorage();
    todoInput.value = "";
    displayTasks();
}

function deleteAllTask(){

}

function displayTasks(){
    todoList.innerHTML = "";

    todo.forEach((item, index) => {
        const p = document.createElement("p");

        //back ticks are html code and ${} is referencing back to js
        //so for every input it is going to have a number like input-0 input-1
        //item.disabled ? -> asking if it is true. if it is true then check it otherwise leave it blank

        //for the ids it checks if it is disabled and if it is it puts it in the disabled class where the css file shows it as a line through
        p.innerHTML = 
        `
            <div class="todo-container">       
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
                <p id="todo-${index}" class="${item.disabled ? "disabled": ""}" onclick="editTask(${index})">
                ${item.text}
                </p>
            </div>
        
        `;

        p.querySelector(".todo-checkbox").addEventListener("change", () => {toggleTask(index)});
        todoList.appendChild(p);
        
    });


}

function savetoLocalStorage(){
    localStorage.setItem("todo", JSON.stringify(todo));
}