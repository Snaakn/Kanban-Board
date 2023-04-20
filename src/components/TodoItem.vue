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
    font-family: 'Roboto', sans-serif;
    display: block;
    width: 300px;
    background-color: rgba(247, 248, 250, 0.2);
    margin: 10px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    -webkit-box-shadow: 5px 5px 5px #0000003f;
     -khtml-box-shadow: 5px 5px 5px #0000003f;
      -icab-box-shadow: 5px 5px 5px #0000003f;
       -moz-box-shadow: 5px 5px 5px #0000003f; 
         -o-box-shadow: 5px 5px 5px #0000003f;
            box-shadow: 5px 5px 5px #0000003f;
 
}

.container .titlebar {
    padding: 5px;
    border-top-left-radius: inherit  ;
    border-top-right-radius: inherit ;
    background-color: rgba(240, 255, 255, 0.534);
}
.container h1 {
    margin: 5px;
    font-weight: bold;
    width: 100%;
}

.container p {
    margin: 5px;
    padding: 10px 0;
}
.container:hover{
    background-color: rgb(255, 255, 255,0.5);
}
</style>