<template>
  <div class="home">
    <TeacherReportTable />
  </div>
</template>

<script>
import TeacherReportTable from '@/components/teacher/TeacherReportTable.vue';

export default {
  name: 'TeacherReport',
  components: {
    TeacherReportTable,
  },
};
</script>
