<script setup>
import Toolbar from "./components/Toolbar.vue";
import TodoItem from "./components/TodoItem.vue";
import draggable from "vuedraggable";

// import { RouterLink, RouterView } from 'vue-router'

// data mess! maybe use Vuex instead
import { ref } from "vue";
const todos = ref([]);
const nextId = ref(0);
const newTitle = ref("");
const newText = ref("");
const showCreateDialog = ref(false);
const filteredTodos = ref(todos.value);
let searchText = ""

// Create todo dialog
const validateNewNote = () => {
  let inputTitle = document.getElementById("inputTitle");
  let note = document.getElementById("note");

  if (newTitle.value == "") {
    inputTitle.className = "input-invalid";
    console.log("Title is empty");
    return false;
  }
  inputTitle.className = "input-valid";

  if (newText.value == "") {
    note.className = "input-invalid";
    return false;
  }
  note.className = "input-valid";

  return true;
};

const createNewNote = () => {
  if (!validateNewNote()) return;
  let todo = {
    id: nextId.value,
    title: newTitle.value,
    text: newText.value,
  }

  todos.value.push(todo);
  ++nextId.value;
  console.log(searchText.toLowerCase())
  if( (todo.title.toLowerCase().includes(searchText.toLowerCase()) 
      || todo.text.toLowerCase().includes(searchText.toLowerCase()))
    && !filteredTodos.value.some( obj => obj.id === todo.id )) filteredTodos.value.push(todo)
  closeAndClear();
};

const closeAndClear = () => {
  newTitle.value = "";
  newText.value = "";
  showCreateDialog.value = false;
};
const handleToggleDialog = () => {
  showCreateDialog.value = !showCreateDialog.value;
};


const handleSearch = (search) => {
  searchText = search
  filteredTodos.value = todos.value.filter((todo) =>
  todo.title.toLowerCase().includes(search.toLowerCase()) ||
    todo.text.toLowerCase().includes(search.toLowerCase()));
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
      <Toolbar
        :todos="todos"
        @search="handleSearch"
        @toggleCreateDialog="handleToggleDialog"
      />
    </div>
    <!-- {{ todos }} -->

    <draggable :list="filteredTodos" item-key="id">
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
