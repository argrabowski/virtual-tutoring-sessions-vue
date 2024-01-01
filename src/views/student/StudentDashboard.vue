<template>
  <div class="home">
    <StudentDashboardTable />
  </div>
</template>

<script>
import StudentDashboardTable from '@/components/student/StudentDashboardTable.vue';

export default {
  name: 'StudentDashboard',
  components: {
    StudentDashboardTable,
  },
};
</script>
