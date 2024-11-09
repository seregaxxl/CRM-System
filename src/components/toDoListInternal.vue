<script setup lang="ts">
import { Task } from '../types'
import taskElement from './taskElement.vue';

const props = defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits(['dataUpdated'])
function refresh() {
    emit('dataUpdated')
}

</script>

<template>
  <section>
    <taskElement
      v-for="task in props.tasks"
      :key="task.id"
      :task="task"
      @dataUpdated="refresh"
    />
  </section>
</template>


<style scoped>

</style>
