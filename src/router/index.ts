import { createMemoryHistory, createRouter } from 'vue-router';
import {refreshAccessToken, refreshProfile} from '../api/auth';
import authModule from '../api/auth';
import authLayout from '../layouts/authLayout.vue';
import appLayout from '../layouts/appLayout.vue';
import ToDoList from '../pages/ToDoList.vue';
import Profile from '../pages/Profile.vue';
import Users from '../pages/Users.vue';
import EditUserPage from '../pages/EditUserPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignUpPage from '../pages/SignUpPage.vue';

export const routeNames = {
  login:'Login',
  signUp: 'SignUp',
  profile: 'Profile',
  toDoList: 'ToDoList',
  users: 'Users',
  editUser: 'EditUser',
}
const routes = [
  { path: '/login', 
    component: authLayout,
    children: [
      { path: '', name: routeNames.login, component: LoginPage},
      { path: 'create', name: routeNames.signUp, component: SignUpPage},
    ], meta: { requiresAuth: false }
  },
  { path: '/',
    component: appLayout,
    children: [
      { path: '', name: routeNames.toDoList, component: ToDoList},
      { path: '/profile', name: routeNames.profile, component: Profile},
      { path: '/users', name: routeNames.users, component: Users,
         meta: { requiresAdmin: true } },
      { path: '/editUser/:id', name: routeNames.editUser, component: EditUserPage,
        props:true,
        meta: { requiresAdmin: true } },
    ],
    meta: { requiresAuth: true } 
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach(async (to, _, next) => {
  if (to.meta.requiresAdmin) {
    const profile = await refreshProfile()
    if (profile.data.isAdmin) {
      next();
    } else return false
  } else
   if (to.meta.requiresAuth) {
    const accessToken = authModule.getAccessToken()
    if (accessToken) {
      next();
    } else {
      try {
        const res = await refreshAccessToken(sessionStorage.refreshToken);
        if (res) {
          next(); 
        } else {
          next({ name: routeNames.login }); 
        }
      } catch {
        next({ name: routeNames.login }); 
      }
    }
  } else {
    next(); 
  }
});
