<script setup lang="ts">
import {activeTab} from '../store/activeTabBus'
import { allTasks } from '../store/allTasksBus';




</script>

<template>
    <nav class="tasks-tabs-switcher">
      <button class="switcher-button" :class="{ active: (activeTab === 'tasks-all') }" @click="activeTab = 'tasks-all'">
        Все({{ allTasks.info.all}})
      </button>
      <button class="switcher-button" :class="{ active: (activeTab === 'tasks-in-progress') }" @click="activeTab = 'tasks-in-progress'">
        в работе({{allTasks.info.inWork}})
      </button>
      <button class="switcher-button" :class="{ active: (activeTab === 'tasks-done') }" @click="activeTab = 'tasks-done'">
        сделано({{allTasks.info.completed}})
      </button>
    </nav>
</template>

<style scoped>
.tasks-tabs-switcher {
    display: flex;
    justify-content: space-between;
    /* width: 200px; */
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
