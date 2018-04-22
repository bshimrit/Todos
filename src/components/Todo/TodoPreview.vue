<template>
  <section  @mouseenter= "showDelete = !showDelete" @mouseleave= "showDelete = !showDelete" class="todos flex align-center">
        <input :id="cbClass" type="checkbox" v-model="curTodo.isComplete" @change="updateTodo"/>
        <label :for="cbClass"><span></span></label>
        <input type="text" v-model="curTodo.text" @input="updateTodo">
        <button v-if="showDelete" class="delete-btn fa clear-btn" @click="deleteTodo"></button>
    </section>
</template>

<script>
export default {
    props: ['todoId'],
    watch: {
        todoId: {
            immediate: true,
            handler (newId) {
                if (newId){
                    return this.$store.dispatch({type:'getTodoById', todoId: newId})
                    .then(todo => {
                        this.curTodo = JSON.parse(JSON.stringify(todo))
                    })
                }
            }
        }
    },
    data() {
        return {
            curTodo: {id:null, text:'',isComplete:false},
            showDelete: false
        }
    },
    computed: {
        cbClass(){
            return "cb" + this.todoId;
        }
    },
    methods : {
        deleteTodo() {
            this.$emit('deleteTodo',this.curTodo.id);
        },  
        updateTodo(){
            this.$emit('updateTodo', this.curTodo)
        }
    }
}
</script>

<style>

</style>
