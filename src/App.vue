<script setup>
  import Toolbar from './components/Toolbar.vue';
  import TodoItem from './components/TodoItem.vue';
  // import { RouterLink, RouterView } from 'vue-router'
  import { ref } from 'vue';
  // const todos = ref([{title:"",text:""}])
   const todos = ref([])


</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">

  <header>
    <h1>#TODO</h1>
  </header>
  <body>
    <div class="toolbar-container">
      <Toolbar :todos="todos"/>
    </div>
    <!-- {{todos}} -->
    <TodoItem v-for="todo in todos" :todo="todo"/>
    
  </body>
  <div>
  </div>
  <!-- <RouterView /> -->
</template>

<style scoped>
body {

}
header{
  background-color: rgb(60, 40, 80);
  height: 70px;
  width: 100%;
  /* margin-bottom: 20px; */
  filter: drop-shadow(0 0 2px #000000);
  overflow: hidden;
  user-select: none;
}
header h1 {
  color:aliceblue;
  font-weight:bolder;
  font-size: 60px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

  .toolbar-container {
  /* background: inherit; */
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.2);  
  backdrop-filter: blur(5px);
}

</style>
