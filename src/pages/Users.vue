<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { getAllUsers, getSortedUsers, deleteUser, updateUser } from '../api/admin';
import type { SearchData } from '../types/authTypes';
import { useProfileStore } from '../stores/profileStore';
import { useRouter } from 'vue-router';
import { routeNames } from '../router';

const router = useRouter()

const profileStore = useProfileStore();
const filter = ref<SearchData>({})
interface FormState {
  searchReq: string;
}
const formState = reactive<FormState>({
  searchReq: ''
});
const loading = ref<boolean>(true)
function status (isAdmin:boolean, yes: string, no: string) {
  if (isAdmin) {
    return yes
  } else return no
}
async function sendSearchReq(data:SearchData) {
  filter.value = data
  const res = await getSortedUsers(data)
  profileStore.profilesData = res.data
  profileStore.totalAmount = res.meta.totalAmount
}

function failed () {
  console.log('Failed')
}

function paginationFunction(page:number) {
  filter.value.offset = Number(page-1)
  sendSearchReq(filter.value)
}

function navigateToEditUserPage(id: number, username: string, email: string, phoneNumber: string) {
  router.push({
    name: routeNames.editUser,
    params: { id },
    query: { username, email, phoneNumber },
  });
}

onMounted(async () => {
    try {
        const res = await getAllUsers()
        profileStore.profilesData = res.data
        profileStore.totalAmount = res.meta.totalAmount
        loading.value = false
    } catch (e) {
        console.error('Failed to fetch users:', e);
    }
}); 

async function editUser( action:(id:number, userData:{username?:string,email?:string, phoneNumber?:string,isAdmin?:boolean, block?: 'block'|'unblock'
}) => void, id: number, userData:{username?:string,email?:string, phoneNumber?:string,isAdmin?:boolean, block?: 'block'|'unblock'}) {
  await action(id, userData)
  await new Promise(resolve => setTimeout(resolve, 100));
  const res = await getSortedUsers(filter.value)
  profileStore.totalAmount = res.meta.totalAmount
  profileStore.profilesData = res.data
}




</script>

<template>
  <h1>Users</h1>
    <a-list bordered :data-source="profileStore.profilesData || []" :loading="loading">
      <template #renderItem="{ item }" v-if="!loading">
        <a-list-item class="userContainer">
          <template #actions>
            <a  @click="() => {navigateToEditUserPage(item.id, item.username, item.email, item.phoneNumber)}" key="edit-button">edit</a>
            <a-popconfirm
              title="Are you sure to delete this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(deleteUser, item.id, {})}"
            >
              <a >delete</a>
            </a-popconfirm>
            <a-popconfirm v-if="item.isBlocked"
              title="Are you sure to unblock this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(updateUser, item.id, {block:'unblock'})}"
            >
              <a >unblock</a>
            </a-popconfirm>
            <a-popconfirm v-else
              title="Are you sure to block this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(updateUser, item.id, {block:'block'})}"
            >
              <a >block</a>
            </a-popconfirm>
            <a-popconfirm v-if="item.isAdmin"
              title="Are you sure to remove admin rights from this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(updateUser, item.id, {isAdmin: false})}"
            >
              <a >- admin</a>
            </a-popconfirm>
            <a-popconfirm v-else
              title="Are you sure to add admin rights to this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(updateUser, item.id, {isAdmin: true})}"
            >
              <a >- admin</a>
            </a-popconfirm>
          </template>
          <div  class="username">{{ item.username }}</div>
          <div  class="email">{{ item.email }}</div>
          <div  class="date">{{ item.date }}</div>
          <div  class="blocked">{{status(item.isBlocked,'+', '-')}}</div>
          <div  class="phoneNumber">{{ item.phoneNumber }}</div>
          <div  class="role">{{status(item.isAdmin,'Admin', 'User')}}</div>
        </a-list-item>
      </template>
      <template #header>
          <div class="searchBar">
            Users
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                Filters
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="sendSearchReq({})">All</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="sendSearchReq({isBlocked:true})">Blocked</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="sendSearchReq({isBlocked:false})">Active</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <div>
              <a-form
                :model="formState"
                name="basic"
                layout="inline"
                hideRequiredMark="true"
                :label-col="{ span: 0 }"
                :wrapper-col="{ span: 0 }"
                autocomplete="off"
                @finish="() => sendSearchReq({search:formState.searchReq})"
                @finishFailed="failed"
              >
                <a-form-item
                  name="searchReq"
                >
                  <a-input v-model:value="formState.searchReq" placeholder="Enter search request" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 0, span:0 }">
                  <a-button type="primary" html-type="submit">Search</a-button>
                </a-form-item>
              </a-form>
          </div>
          </div>
          <div class="sortingHeader">
            <div>
              Name
            <a-button @click="() => sendSearchReq({sortBy:'username', sortOrder:'asc'})" size="small" class="sortingButton">△</a-button>
            <a-button @click="() => sendSearchReq({sortBy:'username', sortOrder:'desc'})" size="small" class="sortingButton">▽</a-button>
            </div>
            <div>
              Email
              <a-button @click="() => sendSearchReq({sortBy:'email', sortOrder:'asc'})" size="small" class="sortingButton">△</a-button>
              <a-button @click="() => sendSearchReq({sortBy:'email', sortOrder:'desc'})" size="small" class="sortingButton">▽</a-button>
            </div>
            <div>
              Date
            </div>
            <div>
              Is Blocked
            </div>
            <div>
              Phone
            </div>
            <div>
              Role
            </div>
          </div>
        </template>
        <template #footer>
          <a-pagination @change="paginationFunction" :defaultPageSize="20" :showSizeChanger="false" :total="profileStore.totalAmount" />
        </template>
    </a-list>
</template>

<style scoped>
  .searchBar {
    display: flex;
    justify-content: space-between;
  }
  .userContainer {
    display: grid;
    grid-template-columns: 100px 150px 150px 75px 100px 30px 300px;
    column-gap: 20px;
  }
  .sortingHeader {
    border: solid;
    border-color: #D9D9D9;
    border-radius: 5px;
    border-width: 1px;
    margin-top: 20px;
    padding: 5px;
    padding-left: 30px;
    display: grid;
    grid-template-columns: 100px 150px 150px 80px 90px 20px 300px;
    column-gap: 20px;
    div {
      display: flex;
      align-items: center;
    }
  }
  .sortingButton {
    box-shadow: none;
    border: none;
    font-size: 10px;
  }
  .editForm {
    grid-column-start: 1;
    grid-column-end: 4;
  }
</style>
  