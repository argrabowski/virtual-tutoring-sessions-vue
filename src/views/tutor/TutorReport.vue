<template>
  <div class="home">
    <TutorReportHeader />
    <TutorReportTable />
  </div>
</template>

<script>
import TutorReportTable from '@/components/tutor/TutorReportTable.vue';
import TutorReportHeader from '@/components/tutor/TutorReportHeader.vue';

export default {
  name: 'TutorReport',
  components: {
    TutorReportTable,
    TutorReportHeader,
  },
};
</script>
