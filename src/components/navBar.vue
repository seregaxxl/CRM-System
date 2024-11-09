<script setup lang="ts">

import { ref } from 'vue';
import { TaskInfo } from '../types';

const emit = defineEmits(['activeTab'])
const props = defineProps<{
  info: TaskInfo;
}>();
const activeTab = ref<string>('all')
function changeActiveTab (filter:string) {
  activeTab.value = filter
  emit('activeTab', filter)
}
</script>

<template>
    <nav class="tasks-tabs-switcher">
      <button class="switcher-button" :class="{ active: (activeTab === 'all') }" @click="changeActiveTab('all')">
        Все({{ props.info.all}})
      </button>
      <button class="switcher-button" :class="{ active: (activeTab === 'inWork') }" @click="changeActiveTab('inWork')">
        в работе({{props.info.inWork}})
      </button>
      <button class="switcher-button" :class="{ active: (activeTab === 'completed') }" @click="changeActiveTab('completed')">
        сделано({{props.info.completed}})
      </button>
    </nav>
</template>

<style scoped>
.tasks-tabs-switcher {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 10px;
}
.switcher-button {
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: #8F9093;
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
</style>
