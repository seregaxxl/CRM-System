<script setup lang="ts">
import { ref } from 'vue';
import {addTask, getAllTasks} from '../api/index'

const newTask = ref('')
const errorMessage = ref('');

async function addTaskAndRefresh(title:string) {
    if (title.length < 64 && title.length > 2) {
        await addTask(title)
        getAllTasks('all')
    } else {
        errorMessage.value = 'XXX';
        setTimeout(() => {
            errorMessage.value = '';
        }, 2000);
    }
}

</script>

<template>
    <form class="task-adder">
        <input type="text" class="add-input" v-model="newTask" id="task" name="task" placeholder="Task To Be Done...">
        <button @click.prevent='addTaskAndRefresh(newTask)' class="add-button">Add</button>
        <div v-if="errorMessage == 'XXX'" class="error-message">{{ errorMessage }}</div>
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
    margin: 0 4px 0 6px;
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
    padding: 4px;
}
.error-message {
    color: black;
}
</style>
