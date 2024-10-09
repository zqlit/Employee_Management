<script setup>
import { defineComponent, h } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink } from "vue-router";
import EmployeeVue from "./views/Employee.vue";
import Employee from "./views/Employee.vue";

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
        { default: () => "客户管理" }
      ),
    key: "go-back-employee",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/",
          },
        },
        { default: () => "员工管理" }
      ),
    key: "go-to-humen",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/",
          },
        },
        { default: () => "商品管理" }
      ),
    
  components: { Employee },key: "go-to-goods",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/",
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
            path: "/",
          },
        },
        { default: () => "运费管理" }
      ),
    key: "go-to-fare",
  },
];
</script>

<template>
  <n-space vertical size="large">
    <n-layout has-sider>
      <n-layout-sider content-style="padding: 24px;">
        <n-menu :options="menuOptions" />
      </n-layout-sider>
      <n-layout style="width: 1200px">
        <router-view/>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<style scoped>

</style>
