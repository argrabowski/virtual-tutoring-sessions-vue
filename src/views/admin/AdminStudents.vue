<template>
  <div class="home">
    <AdminStudentsTable />
  </div>
</template>

<script>
import AdminStudentsTable from '@/components/admin/AdminStudentsTable.vue';

export default {
  name: 'AdminStudents',
  components: {
    AdminStudentsTable,
  },
};
</script>
