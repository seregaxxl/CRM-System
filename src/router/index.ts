import { createMemoryHistory, createRouter } from 'vue-router'

import ToDoList from '../pages/ToDoList.vue'

const routes = [
  { path: '/', component: ToDoList },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})