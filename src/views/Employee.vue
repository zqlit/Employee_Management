<template>
  <n-form ref="formRef" inline :label-width="80" :model="formValue" :rules="rules" :size="size">
    <n-form-item label="请输入您想搜索的姓名" path="">
      <n-input placeholder="输入您想搜索的姓名" v-model:value="keyWord" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="search($event)">搜一下</n-button>
    </n-form-item>
    <n-form-item>
      <n-button @click="showModal = true"> 添加 </n-button>
      <n-modal v-model:show="showModal" preset="dialog" title="添加用户" content="确认添加吗?" positive-text="确认"
        negative-text="算了" @positive-click="submitCallback" @negative-click="cancelCallback" />
    </n-form-item>
  </n-form>
  <n-data-table :columns="columns" :data="updateData" />
</template>

<style scoped></style>

<script>
import { defineComponent, ref, h, onMounted } from "vue";
import { NButton, useMessage } from "naive-ui";

let data = ref([
  {
    id: 1,
    name: "李冠",
    gender: "男",
  },
  {
    id: 2,
    name: "陈文博",
    gender: "男",
  },
  {
    id: 3,
    name: "华新武",
    gender: "男",
  },
  {
    id: 4,
    name: "田建松",
    gender: "男",
  },
]);

let updateData = ref([
  {
    id: 1,
    name: "李冠",
    gender: "男",
  },
  {
    id: 2,
    name: "陈文博",
    gender: "男",
  },
  {
    id: 3,
    name: "华新武",
    gender: "男",
  },
  {
    id: 4,
    name: "田建松",
    gender: "男",
  },
]);

let keyWord = ref("");

const message = useMessage();

function createColumns() {
  return [
    {
      title: "编号",
      key: "id",
    },
    {
      title: "名字",
      key: "name",
    },
    {
      title: "性别",
      key: "gender",
    },
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
}

function del(row) {
  const index = data.value.findIndex((emp) => emp.id == row.id);
  index !== -1 ? data.value.splice(index, 1) : "";
  updateData.value = data.value;
}

function search(row) {
  updateData.value = data.value.filter((item) => item.name.includes(keyWord.value));
}

function add() { }

export default defineComponent({
  setup() {
    return {
      data,
      columns: createColumns(),
      search,
      keyWord,
      updateData,
      message,
      showModal: ref(false),
      cancelCallback() {
        message.success("Cancel");
      },
      submitCallback() {
        message.success("Submit");
      },
    };
  },
});
</script>
