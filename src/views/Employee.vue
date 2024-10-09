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
      <n-modal v-model:show="showModal" preset="dialog" title="添加用户" :content="modalContent" positive-text="确认"
        negative-text="算了" @positive-click="submitCallback" @negative-click="cancelCallback">
        <n-form ref="addFormRef" :model="newEmployee" :rules="addFormRules">
          <n-form-item label="名字" path="name">
            <n-input v-model:value="newEmployee.name" />
          </n-form-item>
          <n-form-item label="性别" path="gender">
            <n-select v-model:value="newEmployee.gender" :options="genderOptions" />
          </n-form-item>
        </n-form>
      </n-modal>
    </n-form-item>
  </n-form>
  <n-data-table :columns="columns" :data="updateData" />
</template>

<style scoped></style>

<script>
import { defineComponent, ref, h } from "vue";
import { NButton, useMessage, NSelect } from "naive-ui";

let data = ref([
  { id: 1, name: "李冠", gender: "男" },
  { id: 2, name: "陈文博", gender: "男" },
  { id: 3, name: "华新武", gender: "男" },
  { id: 4, name: "田建松", gender: "男" },
]);

let updateData = ref([...data.value]);

let keyWord = ref("");

const message = useMessage();

function createColumns() {
  return [
    { title: "编号", key: "id" },
    { title: "名字", key: "name" },
    { title: "性别", key: "gender" },
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
  if (index !== -1) data.value.splice(index, 1);
  updateData.value = [...data.value];
}

function search() {
  updateData.value = data.value.filter((item) => item.name.includes(keyWord.value));
}

export default defineComponent({
  setup() {
    const showModal = ref(false);
    const newEmployee = ref({ name: "", gender: "" });
    const addFormRef = ref(null);
    const addFormRules = {
      name: [{ required: true, message: "请输入名字", trigger: "blur" }],
      gender: [{ required: true, message: "请选择性别", trigger: "change" }],
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

    return {
      data,
      columns: createColumns(),
      search,
      keyWord,
      updateData,
      message,
      showModal,
      newEmployee,
      addFormRef,
      addFormRules,
      genderOptions,
      submitCallback,
      cancelCallback,
    };
  },
});
</script>