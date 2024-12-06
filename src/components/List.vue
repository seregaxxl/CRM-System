<script lang="ts" setup>
import { Task } from '../types'
import { ref, watch, computed  } from 'vue';
import { updateTask, deleteTask } from '../api';
import editImg from '../assets/edit.png';
import deleteImg from '../assets/delete.png';
import saveImg from '../assets/save.png';
import cancelImg from '../assets/cancel.png';

const props = defineProps<{
  tasks: Task[];
}>();
const data = ref<Task[]>([]);
const titleBuffer = ref<string>('')
const editMode = ref<number[]>([])
const emit = defineEmits(['dataUpdated'])

const isEditing = computed(() => {
  return (id: number) => editMode.value.includes(id);
});


async function updateTaskAndEmit(id:number,isDone?:boolean, title?:string) {
  try {
    await updateTask(id, {isDone, title})
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
    if (data.value.find(task => task.id === id)) {
        try {
        await updateTaskAndEmit(id, undefined, title)
        editMode.value = editMode.value.filter(editingId => editingId !== id);;
        } catch (error) {
        console.error('Error saving edit:', error)
        }
    }
}

function toggleOnEdit (id:number, title:string) {
    editMode.value.push(id);
    titleBuffer.value = title;
}

function toggleOffEdit (id:number) {
    editMode.value = editMode.value.filter(editingId => editingId !== id);;
    titleBuffer.value = '';
}

watch(
  () => props.tasks,
  (newInfo) => {
    if (newInfo) {
        data.value = [...newInfo]
        }
    },
  {immediate: true }
);

</script>

<template>
  <a-list
    class="todo-list"
    item-layout="horizontal"
    :data-source="data"
  >
    <template #renderItem="{ item }">
      <a-list-item class="listItem">
        <template #actions>
          <a-button @click="()=>saveEdit(item.id, titleBuffer)" v-if="isEditing(item.id)" key="todo-list-save"><img :src="saveImg" alt="Save" /></a-button>
          <a-button @click="()=>toggleOnEdit(item.id, item.title)" v-else key="todo-list-edit"><img :src=editImg alt=""></a-button>
          <a-button @click="()=>toggleOffEdit(item.id)" v-if="isEditing(item.id)" key="todo-list-cancel"><img :src="cancelImg" alt="Cancel" /></a-button>
          <a-button @click="()=>deleteTaskAndRefresh(item.id)" v-else key="todo-list-delete"><img :src=deleteImg alt=""></a-button>
        </template>
        <a-skeleton active :loading="false">
          <div v-if="isEditing(item.id)">
              <input type="text" v-model="titleBuffer" />
          </div>
          <div v-else class="checkboxAndTitle">
              <input :id="'checkbox-' + item.id" class="checkbox" @change="updateTaskAndEmit(item.id, !item.isDone)" type="checkbox" :checked="item.isDone">
              <div :class="{taskDoneClass: (item.isDone)}">{{ item.title }}</div>
          </div>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
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
.listItem {
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
    max-width: 140px;
    overflow: hidden;
    .taskDoneClass{
      color: #8F9093;
      text-decoration: line-through;
    }
  }
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
  