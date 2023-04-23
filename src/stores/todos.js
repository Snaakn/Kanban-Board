import { defineStore } from "pinia"

export const useTodosStore = defineStore("todos", {
    state: () => ({
      todos: [],
      searchText: "",
      nextId: 0,
      nextListId: 1,
      lists: []
    }),
    actions: {
      incrementNextId() {
        ++this.nextId
      },
  
    }
  })