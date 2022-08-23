import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(todoForm);
    const todo = data.get('todo');
    await createTodo(todo);
    todoForm.reset();
    displayTodos();
}); 



let todo = [];

async function completeTodo() {
    completeTodo();

    displayTodos();
}

// add async complete todo handler function
    // call completeTodo
    // swap out todo in array
    // call displayTodos

   

async function displayTodos() {
    todosEl.innerHTML = '';
    const todos = await getTodos();
    for (let todo of todos) {
        const todoList = renderTodo(todo);
        todosEl.append(todoList);
    }
}


async function onLoad() {
    const response = await getTodos();
    todo = response.data;
    displayTodos();
}

onLoad();

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
     await deleteAllTodos();
    // modify state to match

    // re displayTodos
    displayTodos();
});
