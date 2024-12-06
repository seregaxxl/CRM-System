import { createMemoryHistory, createRouter } from 'vue-router'

import ToDoList from '../pages/ToDoList.vue'
import Profile from '../pages/Profile.vue'

const routes = [
  { path: '/', component: ToDoList },
  { path: '/Profile', component: Profile },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})