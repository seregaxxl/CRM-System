import { createMemoryHistory, createRouter } from 'vue-router';
import { useTokensStore } from '../stores/loginStore';

import ToDoList from '../pages/ToDoList.vue';
import Profile from '../pages/Profile.vue';
import LoginPage from '../pages/LoginPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/ToDoList', component: ToDoList, meta: { requiresAuth: true } },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  const authStore = useTokensStore();

  if (to.meta.requiresAuth) {
    if (!authStore.accessToken) {
      try {
        const res = await authStore.refreshAccessToken();
        if (res) {
          next(); 
        } else {
          next('/'); 
        }
      } catch {
        next('/'); 
      }
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});
