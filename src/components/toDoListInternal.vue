<script setup lang="ts">
import { ref, watch } from 'vue';
import {activeTab} from '../store/activeTabBus'
import { allTasks, Task } from '../store/allTasksBus'
import { updateTask, deleteTask, getAllTasks } from '../api';

import editImg from '../assets/edit.png'
import deleteImg from '../assets/delete.png'
import saveImg from '../assets/save.png'
import cancelImg from '../assets/cancel.png'

const tasks = ref<Task[]>(allTasks.value.tasks)
const editId = ref<number>(0)
const titleBufer = ref<string>('')

async function updateTaskAndRefresh(id:number,isDone?:boolean, title?:string) {
    await updateTask(id, isDone, title)
    getAllTasks('all')
}

async function deleteTaskAndRefresh(id:number) {
    await deleteTask(id)
    getAllTasks('all')
}

async function saveEdit (id:number, title:string) {
    const task = allTasks.value.tasks.find((t) => t.id === id)
    if (task) {
        try {
        await updateTaskAndRefresh(id, undefined, title)
        editId.value = 0;
        } catch (error) {
        console.error('Error saving edit:', error)
        }
    }
}

function toggleOnEdit (id:number, title:string) {
    editId.value = id;
    titleBufer.value = title;
}

function toggleOffEdit () {
    editId.value = 0;
    titleBufer.value = '';
}

watch([activeTab, allTasks.value], async ([newActiveTab]) => {
    switch (newActiveTab) {
        case 'tasks-all' : 
        tasks.value = allTasks.value.tasks
        break
        case 'tasks-in-progress' : 
        tasks.value = allTasks.value.tasks.filter(task => !task.isDone)
        break
        case 'tasks-done' : 
        tasks.value = allTasks.value.tasks.filter(task => task.isDone)
        break
    }    
}) 
</script>

<template>
<section class="tasks-all">
        <div  class="list-item" v-for="item in  tasks" :key="item.id">
            <div v-if="item.id==editId" class="editModeLI">
                <div class="checkboxAndTitle">
                <input type="text" v-model="titleBufer">
                </div>
                <div class="twoButtons">
                <button class="editButtons" @click="saveEdit(item.id, titleBufer)"><img :src=saveImg alt=""></button>
                <button class="editButtons" @click="toggleOffEdit"><img :src=cancelImg alt=""></button>
                </div>
          </div>
          <div v-else class="viewModeLE">
              <div class="checkboxAndTitle">
              <input :id="'checkbox-' + item.id" class="checkbox" @change="updateTaskAndRefresh(item.id, false)" v-if="item.isDone" type="checkbox" checked>
              <input :id="'checkbox-' + item.id" class="checkbox" @change="updateTaskAndRefresh(item.id, true)" v-else type="checkbox">
              <div :class="{taskDoneClass: (item.isDone)}">{{ item.title }}</div>
            </div>
            <div class="twoButtons">
              <button class="editButtons" @click="toggleOnEdit(item.id, item.title)"><img :src=editImg alt=""></button>
              <button class="editButtons" @click="deleteTaskAndRefresh(item.id)"><img :src=deleteImg alt=""></button>
            </div>
          </div>
        </div>
      </section>
</template>

<style scoped>
.editButtons {
  background-color: #fff;
  border: none;
}
.twoButtons {
  display: flex;
  align-items: center;
}
button {
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
}
button.active {
    color: #5AB6E6;
    text-decoration: underline;
    font-weight: bold;
}
.viewModeLE, .editModeLI {
  margin-bottom: 10px;
  background-color: #fff;
  height: 30px;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  color: black;
  .checkboxAndTitle {
    display: flex;
    justify-content: start;
    align-items: center;
    .taskDoneClass{
      color: #8F9093;
      text-decoration: line-through;
    }
  }
}
.checkbox {
  width: 14px;
  height: 14px;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid #ddd;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  margin: 0 3px 0 7px;
}
.checkbox:checked {
  width: 20px;
  height: 20px;
  background-image: url('../assets/blueMark.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: none;
  margin: 0 0 0 4px;
}
</style>
