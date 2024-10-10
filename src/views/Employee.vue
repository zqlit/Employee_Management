<template>
  <n-space vertical size="large">
    <n-card title="送水公司后台管理系统">
      <n-form ref="formRef" inline :label-width="80" :model="formValue" :rules="rules" :size="size">
        <n-form-item label="在此添加您的员工姓名" path="">
          <n-input placeholder="输入您想搜索的姓名" v-model:value="keyWord" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" @click="search($event)">搜一下</n-button>
        </n-form-item>
        <n-form-item>
          <n-button @click="showModal = true"> 添加 </n-button>
          <n-modal v-model:show="showModal" preset="dialog" title="添加用户" positive-text="确认"
            negative-text="算了" @positive-click="submitCallback" @negative-click="cancelCallback">
            <n-form ref="addFormRef" :model="newEmployee" :rules="addFormRules">
              <n-form-item label="名字" path="name">
                <n-input v-model:value="newEmployee.name" />
              </n-form-item>
              <n-form-item label="性别" path="gender">
                <n-select v-model:value="newEmployee.gender" :options="genderOptions" />
              </n-form-item>
              <n-form-item label="联系方式" path="phone">
                <n-input v-model:value="newEmployee.phone" />
              </n-form-item>
              <n-form-item label="客户地址" path="address">
                <n-input v-model:value="newEmployee.address" />
              </n-form-item>
              <n-form-item label="水票数量" path="ticket">
                <n-input v-model:value="newEmployee.ticket" />
              </n-form-item>
              <n-form-item label="水票金额" path="money">
                <n-input v-model:value="newEmployee.money" />
              </n-form-item>
            </n-form>
          </n-modal>
        </n-form-item>
      </n-form>
      <n-data-table :columns="columns" :data="updateData" />
    </n-card>
  </n-space>
</template>

<script setup>
import { ref, h } from "vue";
import { NButton, useMessage, NSelect } from "naive-ui";

const data = ref([
  { id: 1, name: "李冠", gender: "男", phone: "12345678901", address: "地址1", ticket: 10, money: 100 },
  { id: 2, name: "陈文博", gender: "男", phone: "12345678902", address: "地址2", ticket: 20, money: 200 },
  { id: 3, name: "华新武", gender: "男", phone: "12345678903", address: "地址3", ticket: 30, money: 300 },
  { id: 4, name: "田建松", gender: "男", phone: "12345678904", address: "地址4", ticket: 40, money: 400 },
  { id: 5, name: "张三", gender: "男", phone: "12345678905", address: "地址5", ticket: 50, money: 500 },
  { id: 6, name: "李四", gender: "男", phone: "12345678906", address: "地址6", ticket: 60, money: 600 },
  { id: 7, name: "王五", gender: "男", phone: "12345678907", address: "地址7", ticket: 70, money: 700 },
  { id: 8, name: "赵六", gender: "男", phone: "12345678908", address: "地址8", ticket: 80, money: 800 },
  { id: 9, name: "孙七", gender: "男", phone: "12345678909", address: "地址9", ticket: 90, money: 900 }
]);

const updateData = ref([...data.value]);

const keyWord = ref("");

const message = useMessage();

const columns = [
  { title: "编号", key: "id" },
  { title: "名字", key: "name" },
  { title: "联系方式", key: "phone" },
  { title: "客户地址", key: "address" },
  { title: "水票数量", key: "ticket" },
  { title: "水票金额", key: "money" },
  {
    title: "操作",
    key: "actions",
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: "medium",
          onClick: () => del(row),
        },
        { default: () => "删除" }
      );
    },
  },
];

function del(row) {
  const index = data.value.findIndex((emp) => emp.id == row.id);
  if (index !== -1) data.value.splice(index, 1);
  updateData.value = [...data.value];
}

function search() {
  updateData.value = data.value.filter((item) => item.name.includes(keyWord.value));
}

const showModal = ref(false);
const newEmployee = ref({ name: "", gender: "", phone: "", address: "", ticket: 0, money: 0 });
const addFormRef = ref(null);
const addFormRules = {
  name: [{ required: true, message: "请输入名字", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
  address: [{ required: true, message: "请输入客户地址", trigger: "blur" }],
  ticket: [{ required: true, message: "请输入水票数量", trigger: "blur" }],
  money: [{ required: true, message: "请输入水票金额", trigger: "blur" }],
};
const genderOptions = ref([
  { label: "男", value: "男" },
  { label: "女", value: "女" },
]);

function submitCallback() {
  const id = data.value.length ? data.value[data.value.length - 1].id + 1 : 1;
  data.value.push({ id, ...newEmployee.value });
  updateData.value = [...data.value];
  showModal.value = false;
  message.success("添加成功");
}

function cancelCallback() {
  message.success("取消");
}
</script>

<style scoped></style>