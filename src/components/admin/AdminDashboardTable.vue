<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="this.$store.state.auth.meetings"
      item-key="date"
      class="elevation-1"
      :search="search"
      :custom-filter="filterDate"
    >
      <template v-slot:top>
        <v-card-title class="display-1">
          Oversight Dashboard
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search Date"
            class="mx-4"
          ></v-text-field>
        </v-card-title>
      </template>
      <template v-slot:[`item.student1Loc`]="{ item }">
        <a href="https://new.assistments.org/">
          {{ item.student1Loc }}
        </a>
      </template>
      <template v-slot:[`item.student2Loc`]="{ item }">
        <a href="https://new.assistments.org/">
          {{ item.student2Loc }}
        </a>
      </template>
      <template v-slot:[`item.tutorLoc`]="{ item }">
        <a href="https://new.assistments.org/">
          {{ item.tutorLoc }}
        </a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { vtsAxios } from '../../plugins/axios';
import moment from 'moment';

export default {
  name: 'AdminDashboardTable',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'date',
        },
        { text: 'Start Time', value: 'start' },
        { text: 'End Time', value: 'end' },
        { text: 'Tutor', value: 'tutor' },
        { text: 'Student 1', value: 'student1' },
        { text: 'Student 2', value: 'student2' },
        { text: 'School Supervisor', value: 'supervisor' },
        { text: 'Student 1 Location', value: 'student1Loc' },
        { text: 'Student 2 Location', value: 'student2Loc' },
        { text: 'Tutor Location', value: 'tutorLoc' },
      ],
    };
  },
  methods: {
    filterDate(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value === item.date &&
        value.toString().indexOf(search) !== -1
      );
    },
  },
  beforeMount() {
    this.$store.state.auth.meetings = [];
    vtsAxios
      .get('/virtualtutoring/getMeetings')
      .then((response) => response.data)
      .then((data) => {
        data.forEach((meeting) => {
          let startDate = new Date(0);
          let endDate = new Date(0);
          startDate.setUTCSeconds(meeting.expectedStartTime);
          endDate.setUTCSeconds(
            meeting.expectedStartTime + 60 * meeting.expectedDuration
          );
          const dateStr = moment(startDate).format('MMM D[,] YYYY');
          const startTimeStr = moment(startDate).format('hh:mm A');
          const endTimeStr = moment(endDate).format('hh:mm A');

          const adminMeeting = {
            date: dateStr,
            start: startTimeStr,
            end: endTimeStr,
            tutor: meeting.tutorID,
            student1: meeting.studentID1,
            student2: meeting.studentID2,
            supervisor: meeting.supervisorID,
            student1Loc: 'Zoom',
            student2Loc: 'Zoom',
            tutorLoc: 'Zoom',
          };
          this.$store.state.auth.meetings.unshift(adminMeeting);
        });
      });
  },
};
</script>
