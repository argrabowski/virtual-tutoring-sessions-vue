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
          Tutoring
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
      <template v-slot:[`item.tutorLoc`]="{ item }">
        <a href="https://new.assistments.org/">
          {{ item.tutorLoc }}
        </a>
      </template>
      <template v-slot:[`item.session`]="{ item }">
        <v-icon large class="primary--text mr-2" @click="joinSession(item)">
          mdi-arrow-right-drop-circle
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { vtsAxios } from '../../plugins/axios';
import moment from 'moment';

export default {
  name: 'StudentDashboardTable',
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
        { text: 'School Supervisor', value: 'supervisor' },
        { text: 'Tutor Location', value: 'tutorLoc' },
        { text: 'Join Session', value: 'session' },
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
    joinSession(item) {
      console.log('Session Joined');
      window.open(item.joinLink, '_blank');
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

          const studentMeeting = {
            date: dateStr,
            start: startTimeStr,
            end: endTimeStr,
            tutor: meeting.tutorID,
            supervisor: meeting.supervisorID,
            tutorLoc: 'Zoom',
            joinLink: meeting.zoomLink,
          };
          this.$store.state.auth.meetings.unshift(studentMeeting);
        });
      });
  },
};
</script>
