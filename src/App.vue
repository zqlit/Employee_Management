<script setup>
import { defineComponent, h, ref, onMounted } from "vue";
import { NIcon, NMessageProvider, NButton } from "naive-ui";
import { RouterLink, useRouter } from "vue-router";
import Login from "@/views/Login.vue";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/employee",
          },
        },
        { default: () => "员工管理" }
      ),
    key: "go-to-employee",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/customer",
          },
        },
        { default: () => "客户管理" }
      ),
    key: "go-to-customer",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/product",
          },
        },
        { default: () => "商品管理" }
      ),
    key: "go-to-product",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/order",
          },
        },
        { default: () => "订单管理" }
      ),
    key: "go-to-order",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/fare",
          },
        },
        { default: () => "运费管理" }
      ),
    key: "go-to-fare",
  },
];

const isLoggedIn = ref(false);
const router = useRouter();

function handleLogout() {
  isLoggedIn.value = false;
  router.push("/login");
}

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push("/login");
  }

  window.addEventListener('login-success', () => {
    isLoggedIn.value = true;
    router.push("/employee");
  });
});
</script>

<template>
  <n-message-provider>
    <div v-if="!isLoggedIn">
      <Login />
    </div>
    <div v-else>
      <n-space vertical size="large">
        <n-layout has-sider>
          <n-layout-sider content-style="padding: 24px;">
            <n-menu :options="menuOptions" />
            <n-button @click="handleLogout" style="margin-top: 20px;margin-left: 20px;">退出登录</n-button>
          </n-layout-sider>
          <n-layout style="width: 1200px;">
            <router-view/>
          </n-layout>
        </n-layout>
      </n-space>
    </div>
  </n-message-provider>
</template>

<style scoped>
n-layout-sider {
  width: 200px;
  background-color: #f0f2f5;
}
</style>