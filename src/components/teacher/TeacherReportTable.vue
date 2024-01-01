<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="reports"
      item-key="date"
      class="elevation-1"
      :search="search"
      :custom-filter="filterName"
    >
      <template v-slot:top>
        <v-card-title class="display-1">
          Tutoring Report
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search Name"
            class="mx-4"
          ></v-text-field>
        </v-card-title>
      </template>
      <template v-slot:[`item.skillsCovered`]="{ item }">
        <a href="https://new.assistments.org/">
          {{ item.skillsCovered }}
        </a>
      </template>
      <template v-slot:[`item.skillsLearned`]="{ item }">
        <a href="https://new.assistments.org/">
          {{ item.skillsLearned }}
        </a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import data from '../../store/mock/data.json';

export default {
  name: 'TeacherReportTable',
  data() {
    return {
      search: '',
      reports: data.teachers[0].reports,
      headers: [
        {
          text: 'Student Name',
          align: 'start',
          sortable: false,
          value: 'studentName',
        },
        { text: 'Comments from Tutor', value: 'tutorComments' },
        { text: '# Skills Covered', value: 'skillsCovered' },
        { text: '# Skills Learned', value: 'skillsLearned' },
      ],
    };
  },
  methods: {
    filterName(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value === item.studentName &&
        value.toString().indexOf(search) !== -1
      );
    },
  },
};
</script>
