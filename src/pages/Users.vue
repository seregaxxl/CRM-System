<script lang="ts" setup>
import { onMounted, ref, reactive, watch } from 'vue';
import { getAllUsers, getSortedUsers, deleteUser, updateUser } from '../api/admin';
import type { UserData, SearchData } from '../types/authTypes';
import { useProfileStore } from '../stores/profileStore';
// import { useRouter } from 'vue-router';
// import { routeNames } from '../router';

// const router = useRouter()

interface EditUserFormState {
    email: string;
    username: string;
    phoneNumber: string;
  }
const editUserFormState = reactive<EditUserFormState>({
    email: '',
    username: '',
    phoneNumber: '',
  });
const profileStore = useProfileStore();
const editView = ref<number>(0)
const filter = ref<SearchData>({})
interface FormState {
  searchReq: string;
}
const formState = reactive<FormState>({
  searchReq: ''
});
const loading = ref<boolean>(true)
const data = ref<UserData[] | null>([]);
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
function toggleEdit(id:number, username?:string, email?:string, phoneNumber?:string) {
    editView.value=id
    if (username) {editUserFormState.username = username}
    if (email) {editUserFormState.email = email}
    if (phoneNumber) {editUserFormState.phoneNumber = phoneNumber}
}

onMounted(async () => {
    try {
        const res = await getAllUsers()
        data.value = res.data
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


watch(() => profileStore.profilesData, (newVal) => {
  data.value = newVal
})


</script>

<template>
  <h1>Users</h1>
    <a-list bordered :data-source="data" :loading="loading">
      <template #renderItem="{ item }" v-if="!loading">
        <a-list-item class="userContainer">
          <a-form
          class="editForm"
          v-if = "editView === item.id"
            :model="formState"
            hideRequiredMark="true"
            noStyle="true"
            name="basic"
            :label-col="{ span: 0 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="() => {
              editUser(updateUser, item.id, {
                username: editUserFormState.username,
                email: editUserFormState.email,
                phoneNumber: editUserFormState.phoneNumber
              });
              toggleEdit(0);
            }"
            @finishFailed="() => {failed(); toggleEdit(0)}"
          >
          <a-form-item
              label="Username"
              name="username"
              class="ant-item"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
              :colon="false"
            >
              <a-input v-model:value="editUserFormState.username" />
            </a-form-item>
            <a-form-item
              label="Email"
              name="email"
              class="ant-item"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
              :colon="false"
            >
              <a-input v-model:value="editUserFormState.email" />
            </a-form-item>
            <a-form-item
              label="PhoneNumber"
              name="phoneNumber"
              class="ant-item"
              :rules="[{pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, message: 'must be valid phone number'}
              ]"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
              :colon="false"
            >
              <a-input v-model:value="editUserFormState.phoneNumber" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 0, span: 16 }">
              <a-button class="ant-button" type="primary" html-type="submit">Save</a-button>
            </a-form-item>
          </a-form>
          <div>
            
          </div>
          <template #actions>
            <a v-if = "editView !== item.id" @click="() => {toggleEdit(item.id, item.username, item.email, item.phoneNumber)}" key="edit-button">edit</a>
            <a-popconfirm
              title="Are you sure to delete this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(deleteUser, item.id, {})}"
            >
              <a v-if = "editView !== item.id">delete</a>
            </a-popconfirm>
            <a-popconfirm v-if="item.isBlocked"
              title="Are you sure to unblock this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(updateUser, item.id, {block:'unblock'})}"
            >
              <a v-if = "editView !== item.id">unblock</a>
            </a-popconfirm>
            <a-popconfirm v-else
              title="Are you sure to block this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(updateUser, item.id, {block:'block'})}"
            >
              <a v-if = "editView !== item.id">block</a>
            </a-popconfirm>
            <a-popconfirm v-if="item.isAdmin"
              title="Are you sure to remove admin rights from this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(updateUser, item.id, {isAdmin: false})}"
            >
              <a v-if = "editView !== item.id">- admin</a>
            </a-popconfirm>
            <a-popconfirm v-else
              title="Are you sure to add admin rights to this user?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="() => {editUser(updateUser, item.id, {isAdmin: true})}"
            >
              <a v-if = "editView !== item.id">- admin</a>
            </a-popconfirm>
          </template>
          <!-- <input v-if = "editView !== item.id" type="checkbox"> -->
          <div v-if = "editView !== item.id" class="username">{{ item.username }}</div>
          <div v-if = "editView !== item.id" class="email">{{ item.email }}</div>
          <div v-if = "editView !== item.id" class="date">{{ item.date }}</div>
          <div v-if = "editView !== item.id" class="blocked">{{status(item.isBlocked,'+', '-')}}</div>
          <div v-if = "editView !== item.id" class="phoneNumber">{{ item.phoneNumber }}</div>
          <div v-if = "editView !== item.id" class="role">{{status(item.isAdmin,'Admin', 'User')}}</div>
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
          <a-pagination @change="paginationFunction" :defaultPageSize="20" :total="profileStore.totalAmount" />
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
    grid-template-columns: 10px 100px 150px 150px 75px 100px 30px 300px;
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
  