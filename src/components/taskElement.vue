<script setup lang="ts">
import { ref } from 'vue';
import { updateTask, deleteTask } from '../api';
import editImg from '../assets/edit.png';
import deleteImg from '../assets/delete.png';
import saveImg from '../assets/save.png';
import cancelImg from '../assets/cancel.png';

const emit = defineEmits(['dataUpdated'])
const editMode = ref<boolean>(false)
const titleBuffer = ref<string>('')
const props = defineProps<{
  task: { id: number; isDone: boolean; title: string };
}>();

async function updateTaskAndRefresh(id:number,isDone?:boolean, title?:string) {
  try {
    await updateTask(id, isDone, title)
    emit('dataUpdated')
  } catch (error) {
    console.error('Error saving edit:', error)
  }
}

async function deleteTaskAndRefresh(id:number) {
  try {
    await deleteTask(id)
    emit('dataUpdated')
  } catch (error) {
    console.error('Error saving edit:', error)
  }
    
}

async function saveEdit (id:number, title:string) {
    if (props.task) {
        try {
        await updateTaskAndRefresh(id, undefined, title)
        editMode.value = false;
        } catch (error) {
        console.error('Error saving edit:', error)
        }
    }
}

function toggleOnEdit (title:string) {
    editMode.value = true;
    titleBuffer.value = title;
}

function toggleOffEdit () {
    editMode.value = false;
    titleBuffer.value = '';
}
</script>

<template>
  <div v-if="editMode" class="editModeLI">
    <input type="text" v-model="titleBuffer" />
    <div class="twoButtons">
      <button @click="saveEdit(props.task.id, titleBuffer)"><img :src="saveImg" alt="Save" /></button>
      <button @click="toggleOffEdit"><img :src="cancelImg" alt="Cancel" /></button>
    </div>
  </div>
  <div v-else class="viewModeLI">
    <div class="checkboxAndTitle">
        <input :id="'checkbox-' + props.task.id" class="checkbox" @change="updateTaskAndRefresh(props.task.id, !props.task.isDone)" type="checkbox" :checked="props.task.isDone">
        <div :class="{taskDoneClass: (props.task.isDone)}">{{ props.task.title }}</div>
    </div>
    <div class="twoButtons">
        <button class="editButtons" @click="toggleOnEdit(props.task.title)"><img :src=editImg alt=""></button>
        <button class="editButtons" @click="deleteTaskAndRefresh(props.task.id)"><img :src=deleteImg alt=""></button>
    </div>
  </div>
</template>

<style scoped>
.editButtons {
  background-color: #fff;
  border: none;
}
.twoButtons {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
button {
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    margin-right: 10px;
    img {
      width: 20px;
      height: 20px;
      object-fit: cover; 
    }
}
button.active {
    color: #5AB6E6;
    text-decoration: underline;
    font-weight: bold;
}
.viewModeLI, .editModeLI {
  margin-bottom: 10px;
  background-color: #fff;
  height: 30px;
  border-radius: 2px;
  display: flex;
  justify-content: space-between;
  color: black;
  padding: 5px;
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
.checkboxAndTitle {
  max-width: 140px;
  overflow: hidden;
}
.checkbox {
  min-width: 14px;
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
