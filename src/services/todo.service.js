// import utilService from './util.service.js'

import storageService from './storage.service.js'

const KEY = 'todosAppKey';

// When app is loaded - init our initial storage
(() => {
    if (!localStorage[KEY]) {
        localStorage[KEY] = JSON.stringify([{id: 1, text:'wash the todo',isComplete:true},{id: 2,text:'call grandmother',isComplete:false}])
    }
})();

function query(filter = null) {
    return storageService.load(KEY)
        .then(todos => {
            if (filter === null) return todos;
            else return todos.filter(todo => {                
                var isInText = (filter.text === '' || todo.text.includes(filter.text));
                var isInStatus = (filter.todoStatus === 'All' || 
                (todo.isComplete && filter.todoStatus === 'Completed') ||
                (!todo.isComplete && filter.todoStatus === 'Active'));
                return isInText && isInStatus;
            })
        })
}

function getById(todoId) {
    return storageService.load(KEY)
        .then(todos => {
            return todos.find(todo => todo.id === todoId);
        })
}

function deleteTodo(todoId) {
    return storageService.load(KEY)
        .then(todos => {
            todos = todos.filter(todo => todo.id !== todoId)
            return storageService.store(KEY, todos);
        })
}

function saveTodo(todo) {
    return new Promise((resolve, reject)=>{
        storageService.load(KEY)
        .then(todos => {
            if (todo.id) {
                var todoIdx = todos.findIndex(currTodo => currTodo.id === todo.id)
                todos.splice(todoIdx, 1, todo);
            } else {
                todo.id = Date.now();
                todos.push(todo);
            }
            storageService.store(KEY, todos);
            resolve(todo)
        });
    });



}

export default {
    query,
    getById,
    deleteTodo,
    saveTodo
}

