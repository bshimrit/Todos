<template>
  <div id="app">
    <header>
        <TodoHeader></TodoHeader>
    </header>
    <main>
        <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TodoHeader from './components/Todo/TodoHeader.vue'

export default {
  components:{
    TodoHeader
  } 
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

</style>
