<script lang="ts" setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { signIn } from '../../api';
  import { LoginData } from '../../types/authTypes';
  import { useTokensStore } from '../../stores/loginStore';

  const store = useTokensStore()
  const router = useRouter()
  
  interface FormState {
    login: string;
    password: string;
    remember: boolean;
  }
   
  const formState = reactive<FormState>({
    login: '',
    password: '',
    remember: true,
  });
  const onFinish = async (values: LoginData) => {
    const res = await signIn(values)
    if (formState.remember) {
      store.setTokensSave(res.data.accessToken, res.data.refreshToken)
    } else {
      store.setTokens(res.data.accessToken, res.data.refreshToken)
    }
    console.log('store:', store.$state)
    router.push('/Profile')
  };  
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
        label="Login"
        name="login"
        :rules="[{ required: true, message: 'Please input your login!' }]"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        :colon="false"
      >
        <a-input v-model:value="formState.login" />
      </a-form-item>
  
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        :colon="false"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>
  
      <a-form-item name="remember-n-forgot" :wrapper-col="{ offset: 0, span: 16 }">
        <a-checkbox class="checkbox" v-model:checked="formState.remember">Remember me</a-checkbox>
        <a href="#">Forgot password?</a>
      </a-form-item>
  
      <a-form-item :wrapper-col="{ offset: 0, span: 16 }">
        <a-button type="primary" html-type="submit">Login</a-button>
      </a-form-item>
    </a-form>
  </a-config-provider>
</template>
<style scoped> 
</style>

  
  