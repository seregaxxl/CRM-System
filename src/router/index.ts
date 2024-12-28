import { createMemoryHistory, createRouter } from 'vue-router';
import authModule from '../api/auth';
import loginLayout from '../layouts/loginLayout.vue';
import appLayout from '../layouts/appLayout.vue';
import ToDoList from '../pages/ToDoList.vue';
import Profile from '../pages/Profile.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignUpPage from '../pages/SignUpPage.vue';

const routes = [
  { path: '/login', 
    component: loginLayout,
    children: [
      { path: '', name: 'Login', component: LoginPage},
      { path: 'create', name: 'SignUp', component: SignUpPage},
    ], meta: { requiresAuth: false }
  },
  { path: '/',
    component: appLayout,
    children: [
      { path: '', name: 'ToDoList', component: ToDoList},
      { path: '/profile', name: 'Profile', component: Profile},
    ],
    meta: { requiresAuth: true } 
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  if (to.meta.requiresAuth) {
    const accessToken = authModule.getAccessToken()
    if (accessToken) {
      next();
    } else {
      try {
        const res = await authModule.refreshAccessToken(sessionStorage.refreshToken);
        if (res) {
          next(); 
        } else {
          next({ name: 'Login' }); 
        }
      } catch {
        next({ name: 'Login' }); 
      }
    }
  } else {
    next(); 
  }
});
