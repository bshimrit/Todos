<template>
  <section class="todo-header container flex space-between align-start">
        <div>
            <UserPreview></UserPreview>
        </div>
        <div>
            <h1 class="todo-title font-bold base-color" >To Do</h1>
        </div>
        <div class="menu-list flex justify-end align-center">
            <router-link exact to="/">Home</router-link> | 
            <router-link exact to="/todo">To Do</router-link> | 
            <router-link to="/about">About</router-link>
        </div>
    </section>
</template>

<script>
    import UserPreview from "../../components/UserPreview.vue"
    export default {
        components: {
            UserPreview
        }
}
</script>

<style>

.todo-header {
    font-size: 20px;
}
.menu-list {
    margin-left: 10px;
}

.todo-title {
    font-size: 50px;
}
</style>
