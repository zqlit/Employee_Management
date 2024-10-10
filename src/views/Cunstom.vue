<template>
    <n-page>
        <n-page-header title="Employee Management" />
        <n-card>
            <n-data-table :columns="columns" :data="data" />
        </n-card>
    </n-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { NPage, NPageHeader, NCard, NDataTable } from 'naive-ui';

export default defineComponent({
    name: 'EmployeeManagement',
    components: {
        NPage,
        NPageHeader,
        NCard,
        NDataTable
    },
    setup() {
        const columns = ref([
            { title: 'ID', key: 'id' },
            { title: 'Name', key: 'name' },
            { title: 'Position', key: 'position' },
            { title: 'Department', key: 'department' }
        ]);

        const data = ref([
            { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'IT' },
            { id: 2, name: 'Jane Smith', position: 'Project Manager', department: 'Operations' }
        ]);

        return {
            columns,
            data
        };
    }
});
</script>

<style scoped></style></n-page>