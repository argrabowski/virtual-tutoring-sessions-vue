<template>
  <div class="home">
    <AdminDashboardTable />
  </div>
</template>

<script>
import AdminDashboardTable from '@/components/admin/AdminDashboardTable.vue';

export default {
  name: 'AdminDashboard',
  components: {
    AdminDashboardTable,
  },
};
</script>
