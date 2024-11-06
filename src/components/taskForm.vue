<script setup lang="ts">
import { ref } from 'vue';
import {addTask, getAllTasks} from '../api/index'

const newTask = ref('')
async function addTaskAndRefresh(title:string) {
    await addTask(title)
    getAllTasks('all')
}

</script>

<template>
<form class="task-adder">
      <input type="text" class="add-input" v-model="newTask" id="task" name="task" placeholder="Task To Be Done...">
      <button @click='addTaskAndRefresh(newTask)' class="add-button">Add</button>
</form>
</template>

<style scoped>
.task-adder {
    margin: auto;
    width: 260px;
    padding: 10px;
}
.add-input {
    outline: 0;
    border-width: 0 0 2px;
    height: 26px;
    width: 160px;
    margin-left: 4px;
    background-color: #F1F4F9;
    color: #2c3e50;
}
.add-button {
    height: 30px;
    width: 80px;
    background-color: #5393FF;
    color: white;
    border: none;
    border-radius: 4px;
}
</style>
