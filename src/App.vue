<script setup>
import { ref } from "vue";
import Toolbar from "./components/Toolbar.vue";
import DragZone from "./components/DragZone.vue"
import { useTodosStore } from '@/stores/todos';

const store = useTodosStore()
const todos = store.todos

// create main list
const lists = store.lists
lists.push({
        id: 0,
        isProtected: true,
        data: todos,
        title: "My TODOS",
      })

lists.push({
  id: 1,
  isProtected: false,
  data: [],
  title: "Test"

})

const showCreateDialog = ref(false)
let newTitle = ""
let newText = ""



// Create todo dialog
const validateNewNote = () => {
  let inputTitle = document.getElementById("inputTitle");
  let note = document.getElementById("note");

  if (newTitle == "") {
    inputTitle.className = "input-invalid";
    console.log("Title is empty");
    return false;
  }
  inputTitle.className = "input-valid";

  if (newText == "") {
    note.className = "input-invalid";
    return false;
  }
  note.className = "input-valid";

  return true;
};

const createNewNote = () => {
  if (!validateNewNote()) return;
  let todo = {
    id: store.nextId,
    title: newTitle,
    text: newText,
  };
  store.todos.push(todo);
  store.incrementNextId()
  console.log(store.searchText.toLowerCase());
  closeAndClear();
};

const closeAndClear = () => {
  newTitle = "";
  newText = "";
  showCreateDialog.value = false;
};
const handleToggleDialog = () => {
  showCreateDialog.value = !showCreateDialog.value;
};



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
      <hr />
      <h2>Title:</h2>
      <input
        type="text"
        required="required"
        id="inputTitle"
        v-model="newTitle"
      />
      <div style="overflow:initial;">
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
    <div class="toolbar">
      <Toolbar
        @toggleCreateDialog="handleToggleDialog"
      />
    </div>
    <div class="content">
           
      <DragZone v-for="list in lists" :list="list" :isMainList="true"/>
      
    </div>
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
  position: fixed;
  filter: drop-shadow(0 0 2px #000000);
  overflow: hidden;
  user-select: none;
  z-index: 1;
  width: 100%;
  top: 0;
}

header h1,
.h-content {
  height: 70px;
  background-color: rgb(60, 40, 80);
  color: aliceblue;
  font-weight: bolder;
  font-size: 60px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.toolbar {
  top: 70px;
  position: fixed;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  overflow: hidden;
  z-index: 1;
}

.content {
  display: inline-flex;
  width: 100%;
  top: 140px;
  overflow-y: auto;
  position: relative;
  height: 100vh;
  /* justify-content: center; */
}

.overlay {
  backdrop-filter: blur(5px);
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
  font-weight: 300;
  width: 100%;
  resize: none;
}

.create-dialog .input-valid {
}

.create-dialog .input-invalid {
  border-color: red;
}
.create-dialog .input-invalid:focus-visible {
  border-color: red;
  outline: red auto 1px;
}

</style>
