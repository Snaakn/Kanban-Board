<script setup>
    import { defineProps } from 'vue';
    const { todo } = defineProps(['todo'])

</script>
<template>
    <div class="container">
        <div class="titlebar">
            <h1>{{this.todo.title}}</h1>
        </div>
        <p>{{ this.todo.text }}</p>
    </div>
</template>

<style scoped>
.container {
    display: block;
    width: 300px;
    background-color: rgb(247, 248, 250);
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
}
.container h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
}
.container:hover{
    background-color: rgb(230, 238, 253);
}
</style>