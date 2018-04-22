<template>
  <section class="container todo-app">
        <h1 class="font-bold">Completed tasks</h1>
        <progressBar :progressValue="completedTasks">{{completedTasks}}</progressBar>
        <todo-filter @filtered="filterTodos"></todo-filter>
        <section class="paper">
            <ul>
                <li v-for="todo in todos" :key="todo.id">
                    <todo-preview @updateTodo="updateTodo" @deleteTodo="deleteTodo" :todoId="todo.id"></todo-preview>
                </li>
            </ul>
        </section>
        <button class="compose-btn fa clear-btn base-btn" @click="addTodo"></button>
    </section>
</template>

<script>
// @ is an alias to /src
import TodoPreview from '../../components/Todo/TodoPreview.vue'
import TodoFilter from '../../components/Todo/TodoFilter.vue'
import ProgressBar from '../../components/ProgressBar.vue'

export default {
    name:'todoApp',
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch({type: 'loadTodos'})
        .then(() => {
            this.$store.commit({ type:'updateCompleted', todos: this.todos});
        })
    },
    methods: {
        deleteTodo(todoId) {
            this.$store.dispatch({type: 'deleteTodo', todoId })
            .then(() => {
                this.$store.dispatch({type: 'loadTodos'});
                this.$store.dispatch({ type:'setCompleted'});    
                this.$store.dispatch({type:'addAction',action:'Delete todo'});        
            })
        },  
        addTodo() {
            var newTodo = {id:null, text:'',isComplete:false}
            this.$store.dispatch({type: 'saveTodo', todo: JSON.parse(JSON.stringify(newTodo))})
            .then(() => {
                this.$store.dispatch({ type:'setCompleted'});
                this.$store.dispatch({type:'addAction',action:'Add todo'});        
            })
        },
        filterTodos(filter){
            this.$store.commit({type:'setTodoFilter', filter: JSON.parse(JSON.stringify(filter))})
            this.$store.dispatch({type: 'loadTodos'});
        },
        updateTodo(todo){
            this.$store.dispatch({type: 'saveTodo', todo: JSON.parse(JSON.stringify(todo))})
            .then(() => {
                this.$store.dispatch({ type:'setCompleted'});  
                if (todo.isComplete)              
                    this.$store.dispatch({type:'addAction',action:'Completed todo'});        
            })
        }

    },
    computed: {
        todos() {     
            return this.$store.getters.todosForDisplay;
        },
        completedTasks(){
            var progress = Math.floor(this.$store.state.progress);
            return (progress != progress ? 0 : progress);   
        }
    },
    components: {
        TodoPreview,
        TodoFilter,
        ProgressBar
    }
}
</script>
