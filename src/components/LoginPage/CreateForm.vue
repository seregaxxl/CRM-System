<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { signUp } from '../../api';
import { RegStatus } from '../../types/authTypes';

interface Emits {
  (event: 'created', login: boolean): void;
}

const emit = defineEmits<Emits>()
function emitFunc() {
  emit('created', true)
  popUp
}

const popUpVisible = ref<RegStatus>(0)
const popUp = (value:RegStatus=0) => {
  popUpVisible.value = value
}

interface FormState {
    email: string;
    login: string;
    password: string;
    username: string;
    phoneNumber: string;
    passwordRepeat: string;
  }
const formState = reactive<FormState>({
    email: '',
    login: '',
    password: '',
    username: '',
    phoneNumber: '',
    passwordRepeat: '',
  });

const  onFinish = async (values: any) => {
    const {passwordRepeat, ...req} = values;
    const res:any = await signUp(req);
    if (res.status == 201) {
      popUp('ok')
    } else if (res.response.status === 400) {
      popUp('invalid')
    } else if (res.response.status === 409 ) {
      popUp('dupl')
    } else {
      popUp('err')
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validatePasswordRepeat = (_: any, value: string) => {
  if (value === formState.password) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error('Passwords do not match!'));
  }
};
</script>

<template>
    <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#7F265B',
      },
    }"
  >
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
        label="Login"
        name="login"
        class="ant-item"
        :rules="[{ required: true, message: 'Please input your login!' },
            {min: 2, max: 60, message: 'Lenght 2 - 60'},
            {pattern: /^[a-zA-Z]*$/gm , message:'Only latin letters'}]"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        :colon="false"
      >
        <a-input v-model:value="formState.login" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        class="ant-item"
        :rules="[{ required: true, message: 'Please input your password!' },
        {min: 6, max: 60, message: 'Lenght 6 - 60'}
        ]"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        :colon="false"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
  
      <a-form-item
        label="PasswordRepeat"
        name="passwordRepeat"
        class="ant-item"
        :rules="[{validator: validatePasswordRepeat , message: 'Password need to be same'}]"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        :colon="false"
      >
        <a-input-password v-model:value="formState.passwordRepeat" />
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
        <a-button class="ant-button" type="primary" html-type="submit">SignUp</a-button>
      </a-form-item>
    </a-form>
    <div v-if="popUpVisible != 0" class="popup-overlay">
      <div class="popup-container" v-if="popUpVisible=='ok'">
        <div><span>Your registration is succesfull</span></div>
        <div><a-button @click="emitFunc" type="primary">Go to login page</a-button></div>
      </div>
      <div class="popup-container" v-if="popUpVisible=='invalid'">
        <div><span>Invalid data entered</span></div>
        <div><a-button @click="() => popUp()" type="primary">Close</a-button></div>
      </div>
      <div class="popup-container" v-if="popUpVisible=='dupl'">
        <div><span>User with such data already exists</span></div>
        <div><a-button @click="() => popUp()" type="primary">Close</a-button></div>
      </div>
      <div class="popup-container" v-if="popUpVisible=='err'">
        <div><span>Internal server error, please try again later</span></div>
        <div><a-button @click="() => popUp()" type="primary">Close</a-button></div>
      </div>
    </div>
  </a-config-provider>
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

  
  