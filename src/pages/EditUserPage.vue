<script lang="ts" setup>
import { reactive } from 'vue';
interface FormState {
    email: string;
    username: string;
    phoneNumber: string;
  }
const formState = reactive<FormState>({
    email: '',
    username: '',
    phoneNumber: '',
  });

const  onFinish = async () => {

  };
  
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

</script>

<template>
    <a-form
      :model="formState"
      hideRequiredMark="true"
      noStyle="true"
      name="basic"
      :label-col="{ span: 0 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
    <a-form-item
        label="Username"
        name="username"
        class="ant-item"
        :rules="[{ required: true, message: 'Please input your username!' },
            {min: 1, max: 60, message: 'Lenght 1 - 60'}
        ]"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        :colon="false"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>
  

      <a-form-item
        label="Email"
        name="email"
        class="ant-item"
        :rules="[{ required: true, message: 'Please input your email!' },
        {type:'email', message: 'must be valid email'}
        ]"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        :colon="false"
      >
        <a-input v-model:value="formState.email" />
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
        <a-input v-model:value="formState.phoneNumber" />
      </a-form-item>
      
      <a-form-item :wrapper-col="{ offset: 0, span: 16 }">
        <a-button class="ant-button" type="primary" html-type="submit">Save</a-button>
      </a-form-item>
    </a-form>
</template>
<style scoped> 
.ant-item {
  margin-bottom: 0px; 
}
.ant-button {
    margin-top: 10px;
}
.popup-overlay {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(22,22,22,0.5);
}
.popup-container {
  width: 400px;
  height: 200px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly
}
</style>

  
  