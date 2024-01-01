<template>
  <div class="home">
    <AdminTutorsTable />
  </div>
</template>

<script>
import AdminTutorsTable from '@/components/admin/AdminTutorsTable.vue';

export default {
  name: 'AdminTutors',
  components: {
    AdminTutorsTable,
  },
};
</script>
