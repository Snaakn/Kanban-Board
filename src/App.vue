<script setup>
import Toolbar from "./components/Toolbar.vue";
import TodoItem from "./components/TodoItem.vue";
import draggable from "vuedraggable";

// import { RouterLink, RouterView } from 'vue-router'
import { ref } from "vue";
const todos = ref([]);
const nextId = ref(0);
const newTitle = ref("");
const newText = ref("");
const showCreateDialog = ref(false)

// Create todo dialog
const validateNewNote = () => {
  let inputTitle = document.getElementById("inputTitle") 
  let note = document.getElementById("note")

  if (newTitle.value == "") {
    inputTitle.className="input-invalid";
    console.log("Title is empty")
    return false;
  }
  inputTitle.className="input-valid"

  if(newText.value == ""){
    note.className="input-invalid";
    return false;
  }
  note.className="input-valid"

  return true;
}

const createNewNote = () => {
  if (!validateNewNote()) return;

  todos.value.push({
    id: nextId.value,
    title: newTitle.value,
    text: newText.value
  })
  ++nextId.value; 
  closeAndClear()
}

const closeAndClear = () => {
    newTitle.value = "";
    newText.value = "";
    showCreateDialog.value = false;
  }
  const toggleDialog =() =>{
    showCreateDialog.value = !showCreateDialog.value;
  }

</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
    rel="stylesheet"
  />
  <div class="overlay" v-if="showCreateDialog">
    <div class="create-dialog">
      <h1>Create TODO</h1>
      <hr>
      <h2>Title:</h2>
      <input
        type="text"
        required="required"
        id="inputTitle"
        v-model="newTitle"
      />
      <div>
        Description:
        <textarea
          required="required"
          v-model="newText"
          name="note"
          id="note"
          ref="note"
          cols="30"
          rows="10"
        ></textarea>
        <button @click="createNewNote()">Add Note</button>
        <button class="close" @click="closeAndClear">close</button>
      </div>
    </div>
  </div>

  <header>
    <h1>#TODO</h1>
  </header>
  <main>
    <div class="toolbar-container">
      <Toolbar :todos="todos" :toggleDialog="toggleDialog"/>
    </div>
    <!-- {{ todos }} -->

    <draggable :list="todos" item-key="id">
      <template #item="{ element: todo }">
        <TodoItem :todo="todo" />
      </template>
    </draggable>
  </main>

  <!-- <RouterView /> -->
</template>

<style scoped>
.create-todo-dialog {
  display: block;
  position: absolute;
  top: 50%;
  align-items: center;
}
header {
  background-color: rgb(60, 40, 80);
  height: 70px;
  width: 100%;
  filter: drop-shadow(0 0 2px #000000);
  overflow: hidden;
  user-select: none;
}
header h1 {
  color: aliceblue;
  font-weight: bolder;
  font-size: 60px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.toolbar-container {
  /* background: inherit; */
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.301);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.create-dialog {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  width: 30vw;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  margin: 5px;
  position: relative;
  display: flex;
  gap: 5px;
  flex-direction: column;
  filter: drop-shadow(0 0 15px #161616);
}
.create-dialog textarea,
input {
  font-family: inherit;
  font-weight:300;
  width: 100%;
  resize: none;
}

.create-dialog .input-valid {
}

.create-dialog .input-invalid{
  border-color: red;
}
.create-dialog .input-invalid:focus-visible {
  border-color: red;
  outline: red auto 1px;
}
</style>
