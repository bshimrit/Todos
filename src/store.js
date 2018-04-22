import Vue from 'vue'
import Vuex from 'vuex'

import todoService from './services/todo.service.js'
import userService from './services/user.service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    todos: [],
    user: {},
    todoFilter: null,
    progress: 0
  },
  mutations: {
    setTodoFilter(state, { filter }) {
      state.todoFilter = filter;
    },
    deleteTodo(state, { todoId }) {
      state.todos = state.todos.filter(todo => todo.id !== todoId)
    },
    setSelectedTodo(state, { todo }) {
      state.selectedTodo = todo;
    },
    addTodo(state, { todo }) {
      state.todos = [todo, ...state.todos];
    },
    updateTodo(state, { todo }) {
      const todoIdx = state.todos.findIndex(currTodo => currTodo.id === todo.id)
      state.todos.splice(todoIdx, 1, todo)
    },
    setTodos(state, {todos}) {
      state.todos = todos;
    },
    updateCompleted(state, {todos}) {
      var isCompleteLen = todos.filter(todo => todo.isComplete).length;
      state.progress = 100 * (isCompleteLen / todos.length) ;
    },
    setUser(state,{user}){
      state.user = user;
    }
  },
  getters: {
    todosForDisplay(state) {
      return state.todos;
    },

  },
  actions: {
    loadTodos(store) {
      return todoService.query(store.state.todoFilter)
      .then(todos => {
          store.commit({ type: 'setTodos', todos });
      })
    },
    loadUser(store) {
      return userService.query()
      .then(user => {
          store.commit({ type: 'setUser', user });
      })
    },
    loadTodo(store, {todoId}) {
      return todoService.getById(todoId)
      .then(todo => {
        store.commit({type: 'setSelectedTodo', todo});
        return todo;
      })
    },
    deleteTodo(store, {todoId}) {
      return todoService.deleteTodo(todoId)
      .then(()=>{
        store.commit({type: 'deleteTodo', todoId});
      })
    },
    saveTodo(store, {todo}) {
      const isEdit = !!todo.id;
      return todoService.saveTodo(todo)
      .then(todo => {
        if (isEdit) store.commit({type: 'updateTodo', todo})
        else store.commit({type: 'addTodo', todo})
        return todo;
      })
    },
    getTodoById(store, {todoId}) {
          return todoService.getById(todoId)
            .then(todo => {
              return todo;
        })   
    },
    setCompleted(store) {
      return todoService.query()
      .then(todos => {
          store.commit({ type: 'updateCompleted', todos });
      })
    },
    saveUser(store, {user}) {
      return userService.saveUser(user)
        .then(() => {
          return userService.query()
          .then(user => {
              store.commit({ type: 'setUser', user });
          })
        })
    },
    addAction(store, {action}) {
      return userService.addAction(action)
        .then(() => {
          return userService.query()
          .then(user => {
              store.commit({ type: 'setUser', user });
          })
        })
    }
  }
})
