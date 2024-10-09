<template>
    <n-space vertical size="large" align="center" justify="center" style="height: 100vh;width: 100%;">
      <n-card title="登录" style="width: 800px;">
        <n-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <n-form-item label="用户名" path="username">
            <n-input v-model:value="loginForm.username" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item label="密码" path="password">
            <n-input type="password" v-model:value="loginForm.password" placeholder="请输入密码" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleLogin">登录</n-button>
          </n-form-item>
        </n-form>
      </n-card>
    </n-space>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useMessage } from "naive-ui";
  
  const loginForm = ref({
    username: "",
    password: "",
  });
  
  const loginFormRules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  };
  
  const message = useMessage();
  
  function handleLogin() {
    if (loginForm.value.username === "admin" && loginForm.value.password === "123") {
      message.success("登录成功");
      // 触发登录成功事件
      window.dispatchEvent(new Event('login-success'));
    } else {
      message.error("用户名或密码错误");
    }
  }
  </script>
  
  <style scoped>
  </style>