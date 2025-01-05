<script lang="ts" setup>
import { reactive, watchEffect } from 'vue';
import { ItemType } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import {signOut} from '../../api/auth';
import { useProfileStore } from '../../stores/profileStore';

const profileStore = useProfileStore();

const state = reactive({
  selectedKeys: ['1'],
  openKeys: ['sub1'],
});

const router = useRouter()
const route = useRoute()

function logOut() {
  signOut()
  router.push({ name: 'Login' })
}

function onSelectMenu({ key }: { key: string }) {
  if (key === '1') {
    router.push({ name: 'ToDoList' }); 
  } else if (key === '2') {
    router.push({ name: 'Profile' }); 
  } else if (key === '3') {
    router.push({ name: 'Users' }); 
  }
}

function getItem(
  label: string,
  key: string,
): ItemType {
  return {
    key,
    label
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem('toDo List', '1'),
  getItem('profile', '2')
]);

watchEffect(() => {
  if (profileStore.profileData?.isAdmin) {
    items.splice(0, items.length, ...[
      getItem('users', '3'), 
      getItem('toDo List', '1'),
      getItem('profile', '2'),
    ]);
  } else {
    items.splice(0, items.length, ...[
      getItem('toDo List', '1'),
      getItem('profile', '2'),
    ]);
  }

  if (route.path === '/') {
    state.selectedKeys = ['1']; 
  } else if (route.path === '/profile') {
    state.selectedKeys = ['2']; 
  }
});


</script>

<template>
    <div class="side-menu-container">
      <a-menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        style="width: 256px"
        :items="items"
        @select="onSelectMenu"
      ></a-menu>
    </div>
    <div class="logout">
        <button @click="logOut">Logout</button>
      </div>
</template>


<style scoped>

.logout {
  position: absolute;
  bottom: 15px;
  left: 15px;
}
</style>
  