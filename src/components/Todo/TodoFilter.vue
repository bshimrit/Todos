<template>
  <section class="ctrl-bar todo-filter">
        <input class="input is-primary" type="text" v-model="filter.text" @input="searchTodo" placeholder="Search"/>
        <div class="radio-group"> 
            <input id="all" type="radio" v-model="filter.todoStatus" value="All" name="todoStatus" @change="emitFilter">
            <label for="all">All</label>
            <input id="read" type="radio" v-model="filter.todoStatus" value="Active" name="todoStatus" @change="emitFilter">
            <label for="read">Active</label>
            <input id="unread" type="radio" v-model="filter.todoStatus" value="Completed" name="todoStatus" @change="emitFilter">
            <label for="unread">Completed</label>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return {
            filter:{text:'',todoStatus:'All'}
        }
    },
    methods: {
        emitFilter(){
            this.$emit('filtered',this.filter);
        },
        searchTodo: _.debounce(function (e) {
                this.emitFilter();
        }, 500),
        
    }
}
</script>

<style>

.todo-filter input[type=radio] {
    position: absolute;
    visibility: hidden;
    display: none;
  }
  
  .todo-filter label {
    color: #00d1b2; /* 40% */
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    padding: 5px 20px;
  }
  
  .todo-filter input[type=radio]:checked + label{
    color: black; /* 60% */
    /* background-color: #00d1b2; */
    background: #00d1b2;
  }
  
  .todo-filter label + .todo-filter input[type=radio] + .todo-filter label {
    border-left: solid 3px #332f35;
  }
  .todo-filter .radio-group {
    border: solid 3px #00d1b2;
    display: inline-block;
    margin-top: 10px;
    border-radius: 10px;
    overflow: hidden;
  }
</style>
