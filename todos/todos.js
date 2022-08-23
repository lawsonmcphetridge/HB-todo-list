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


async function handleComplete(todo) {
    await completeTodo(todo.id);
    displayTodos();
}


async function displayTodos() {
    todosEl.innerHTML = '';
    const todos = await getTodos();
    for (let todo of todos) {
        const todoList = renderTodo(todo, handleComplete);
        todosEl.append(todoList);
    }
}


async function onLoad() {
    await getTodos();
    displayTodos();
    handleComplete();
}

onLoad();

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    await deleteAllTodos();
    displayTodos();
});
