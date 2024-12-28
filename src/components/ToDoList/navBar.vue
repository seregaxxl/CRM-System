<script setup lang="ts">

import { ref, watch } from 'vue';
import { TaskInfo } from '../../types/tasksTypes';
import { MenuProps } from "ant-design-vue";
import { Filter } from '../../types/tasksTypes';

interface Emits {
  (event: 'activeTab', tab: Filter): void;
}

const emit = defineEmits<Emits>()

const props = defineProps<{
  info: TaskInfo;
}>();

const current = ref<(Filter)[]>(['all']);

function changeActiveTab (filter:Filter) {
  current.value[0] = filter
  emit('activeTab', filter)
}

const items = ref<MenuProps["items"]>([])

watch(
  () => props.info,
  (newInfo) => {
    if (newInfo) {
      items.value = [
        {
          key: 'all',
          label: `Все(${newInfo.all})`
        },
        {
          key: 'inWork',
          label: `в работе(${newInfo.inWork})`
        },
        {
          key: 'completed',
          label: `сделано(${newInfo.completed})`
        },
      ];
    }
  },
  { immediate: true }
);
</script>

<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @select="() => changeActiveTab(current[0])" />
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
