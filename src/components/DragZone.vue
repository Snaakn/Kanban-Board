<script setup>
import { ref, watch, defineProps, computed, compile } from "vue"
import { storeToRefs } from "pinia"
import draggable from "vuedraggable"
import TodoItem from "./TodoItem.vue";
import { useTodosStore } from '@/stores/todos';


const store = useTodosStore()
const { searchText } = storeToRefs(store)

const { list, isMainList } = defineProps(["list", "isMainList"])

const filteredList = ref([]) 

watch( list, () => {
  console.log("list updated. filtering...")
  handleSearch(searchText.value)
})

watch(searchText, () => {
    // console.log(searchText.value)
    handleSearch(searchText.value)
});


const handleSearch = (search) => {
  filteredList.value = list.data.filter(
    (todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.text.toLowerCase().includes(search.toLowerCase())
  );
}

const getPositionInUnfilteredList = ( elem, newIndex ) => {
  if( newIndex == 0 ) {
    // check if there is a next element in the filtered list
    const filterListLenght = computed( () => filteredList.value.length )
    if( filterListLenght.value == 1 ) return 0;

    let nextElem = computed(() => filteredList.value[newIndex+1])
    let index = list.data.findIndex( e => e.id === nextElem.value.id ) 
    if ( index < 0 ) {
      console.error("The index could not be calculated. The element was orderd last")
      return -1
    }

    return index
  }
  
  let prevElem = computed(() => filteredList.value[newIndex-1])
  return list.data.findIndex( e => e.id === prevElem.value.id ) +1
}

const handleChange = (elem) => {
  let dataList =  list.data
  if(elem.removed) {
    console.log("removed:")
    let i = dataList.findIndex((e) => e.id === elem.removed.element.id)
    if (i != -1){
      console.log(i)
      dataList.splice(i,1)
    }
  }

  if(elem.added) {
    console.log("added:")
    console.log(elem.added.newIndex)
    dataList.splice(getPositionInUnfilteredList(elem.added.element, elem.added.newIndex), 0, elem.added.element)
  }
  if(elem.moved) {
    console.log("moved:" + elem.moved)
    console.log(elem)
    let oldIndex = dataList.findIndex( e => e.id === elem.moved.element.id)
    let newIndex = getPositionInUnfilteredList(elem.moved.element, elem.moved.newIndex)
    // using in place operation so filtering does not create duplicates
    dataList.splice( newIndex, 0, dataList.splice(oldIndex, 1)[0])

  }
}
</script>

<template>
  <div class="draggable-column">
    <div class="col-header">
      <h1>{{this.list.title}}</h1>
      <button class="col-options">&#xFE19;</button>
    </div>
    <!-- Data: {{ list.data }}
    Filtered: {{ filteredList }} -->
        <div class="col-container">
          <draggable class="draggable" :list="filteredList" type="transition-group" item-key="id" group="todos" @change="handleChange">
              <template #item="{ element: todo }">
                <TodoItem :todo="todo"/>
              </template>
          </draggable>
        </div>
        <div class="col-footer"></div>
      </div>
</template>

<style scoped>

.draggable-column {
  width: 350px;
  margin: 20px;
  height: 80%;
  background-color: rgba(128, 128, 128, 0.171);
  border: 2px solid #ffffff;
  border-radius: 5px;
  backdrop-filter: blur(5px);
  -webkit-box-shadow: 5px 5px 5px #0000003f;
  -khtml-box-shadow: 5px 5px 5px #0000003f;
  -icab-box-shadow: 5px 5px 5px #0000003f;
  -moz-box-shadow: 5px 5px 5px #0000003f;
  -o-box-shadow: 5px 5px 5px #0000003f;
  box-shadow: 5px 5px 5px #0000003f;
}
.draggable-column .col-header {
  display:inline-flex;
  width: 100%;
  justify-content: space-between;
  background-color: white;
  font-family: "Roboto", sans-serif;
  height: 30px;
  padding: 10px 0 5px 0;
  font-size: 20px;
  user-select: none;
  -webkit-user-select: none;
}
.col-header h1, button {
  margin: 0 5px;
}

.col-header .col-options {
  background: none;
  border: none;
  font-weight: bolder;
  font-size: 20px;
}

.col-footer {
  background-color: white;
  font-family: "Roboto", sans-serif;
  height: 20px;
  padding: 10px;
  /* text-align: center; */
}
.col-container {
  height: 75vh;

}

.draggable {
  height: inherit;
  /* border: solid 5px red; */
  overflow-y: auto;
}

</style>