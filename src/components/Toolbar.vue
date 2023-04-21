<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const { todos } = defineProps(["todos"]);
const emits = defineEmits(["search", "toggleCreateDialog"]);
const search = ref("");
const filteredTodos = ref(todos);

const doSearch = () => {
    emits("search", search.value);
}

watch(search, () => {
    doSearch()
});


</script>

<template>
  <div class="toolbar-container">
    <div class="filter-field">
      <input
        type="search"
        id="filterField"
        v-model.trim="search"
        placeholder="Filter Todos"
      />
    </div>
    <div class="button-container-r">
      <button id="add" class="btn btn-add" @click="emits('toggleCreateDialog')">Add</button>
      <button class="btn btn-del">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.toolbar-container {
  display: flex;
  justify-content: space-between;
  background-color: rgba(247, 248, 250, 0.63);
  width: 100%;
  height: fit-content;
  align-items: center;
  overflow: hidden;
  padding: 10px 20px;
}

.filter-field input {
  font-size: 20px;
  border-radius: 30px;
  padding: 5px 15px;
  font-family: "Roboto", sans-serif;
}

.button-container-r {
  padding: 0 25px;
}

.btn {
  margin: 2px;
  font-weight: bolder;
  font-size: large;
  font-family: "Roboto", sans-serif;
  height: 40px;
  border-radius: 5px;
  border-style: none;
  border-color: rgb(60, 40, 80);
  color: rgb(255, 255, 255);
  text-align: center;
  align-items: center;
  cursor: pointer;
}
.btn:active {
  border-style: ridge;
}

.btn-add {
  background-color: rgb(98, 133, 98);
  border-color: rgb(24, 116, 24);
  border-style: solid;
}
.btn-del {
  background-color: rgb(190, 115, 115);
  border-color: rgb(196, 42, 42);
  border-style: solid;
}
</style>
