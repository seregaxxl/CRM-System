<script lang="ts" setup>
import { reactive } from 'vue';
import { updateUser } from '../api/admin';
import { useRouter, useRoute } from 'vue-router';
import { routeNames } from '../router';

const router = useRouter()
const route = useRoute();

const props = defineProps<{
  id: number;
}>();

const originalData = {
  email: route.query.email as string || '',
  username: route.query.username as string || '',
  phoneNumber: route.query.phoneNumber as string || '',
};


interface EditUserFormState {
    email: string;
    username: string;
    phoneNumber: string;
  }
  const editUserFormState = reactive<EditUserFormState>({
  email: route.query.email as string || '',
  username: route.query.username as string || '',
  phoneNumber: route.query.phoneNumber as string || '',
});


async function editUser(id:number, username:string, email:string, phoneNumber:string) {
  const res:any = {id}
    if (username != originalData.username) {
      res.username = username
    }
    if (email != originalData.email) {
      res.email = email
    }
    if (phoneNumber != originalData.phoneNumber) {
      res.phoneNumber = phoneNumber
    }
    if (res.email || res.username || res.phoneNumber) {
      await updateUser(id,res)
      console.log('changes')
      router.push({name: routeNames.users})
    }  else {
      alert('ERROR')
    }
    
}


function failed () {
  alert('ERROR')
}

</script>

<template>
  <h1>Users</h1>
        <div class="userContainer">
          <a-form
          class="editForm"
            :model="editUserFormState"
            hideRequiredMark="true"
            noStyle="true"
            name="basic"
            :label-col="{ span: 0 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="() => {
              editUser(props.id, editUserFormState.username, editUserFormState.email, editUserFormState.phoneNumber);
            }"
            @finishFailed="failed"
          >
          <a-form-item
              label="Username"
              name="username"
              class="ant-item"
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
              :colon="false"
              :rules="[{ required: true, message: 'Please input your username!' },
                  {min: 1, max: 60, message: 'Lenght 1 - 60'},
                  { pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/u, message: 'Only Latin and Cyrillic characters are allowed' }
              ]"
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
              :rules="[{ required: true, message: 'Please input your email!' },
              {type:'email', message: 'must be valid email'}
              ]"
            >
              <a-input v-model:value="editUserFormState.email" />
            </a-form-item>
            <a-form-item
              label="PhoneNumber"
              name="phoneNumber"
              class="ant-item"
              :rules="[{pattern: /^(8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))$/, message: 'must be valid phone number' }
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
        </div>
</template>

<style scoped>
  .userContainer {
    display: grid;
    grid-template-columns: 10px 100px 150px 150px 75px 100px 30px 300px;
    column-gap: 20px;
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
  