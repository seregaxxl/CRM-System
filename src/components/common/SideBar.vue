<script lang="ts" setup>
import { reactive, watchEffect } from 'vue';
import { ItemType } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { signOut } from '../../api';

const state = reactive({
  selectedKeys: ['1'],
  openKeys: ['sub1'],
});

const accessToken = localStorage.getItem('accessToken')

const router = useRouter()
const route = useRoute()

function logOut() {
  signOut(accessToken)
  router.push('/')
}

function onSelectMenu({ key }: { key: string }) {
  if (key === '1') {
    router.push('/ToDoList'); 
  } else if (key === '2') {
    router.push('/Profile'); 
  }
}

function getItem(
  label: string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem('ToDo List', '1'),
  getItem('Profile', '2')
]);

watchEffect(() => {
  if (route.path === '/') {
    state.selectedKeys = ['1']; 
  } else if (route.path === '/Profile') {
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
  