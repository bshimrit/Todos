import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import TodoApp from './views/Todo/TodoApp.vue'
import User from './views/UserEdit.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Home},
    {path: '/todo', component: TodoApp},
    {path: '/about', component: About},
    {path: '/user', component: User},
  ]
})
