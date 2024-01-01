<template>
  <div class="home">
    <TutorDashboardTable />
  </div>
</template>

<script>
import TutorDashboardTable from '@/components/tutor/TutorDashboardTable.vue';

export default {
  name: 'TutorDashboard',
  components: {
    TutorDashboardTable,
  },
};
</script>
