<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="students"
      :sort-by="['score']"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
      :search="search"
      :custom-filter="filterName"
    >
      <template v-slot:top>
        <v-card-title class="display-1">
          Students
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary darken-1"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="assignStudents()"
              >
                Assign Selected Students to Tutors
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Assign Meeting</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="selectedDisplay[0]"
                        label="Student 1"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="selectedDisplay[1]"
                        label="Student 2"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete
                        v-model="tutor"
                        label="Tutor"
                        :items="tutorNames"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="menu"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          no-title
                          scrollable
                          :allowed-dates="allowedDates"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="submitDate">
                            Submit
                          </v-btn>
                          <v-btn text color="primary" @click="closeDate">
                            Cancel
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="startTime"
                        label="Start Time"
                        type="time"
                        suffix="PST"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="endTime"
                        label="End Time"
                        type="time"
                        suffix="PST"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!isValidSubmit()"
                  color="blue darken-1"
                  text
                  @click="
                    submitAssign(
                      tutor,
                      selectedDisplay[0],
                      selectedDisplay[1],
                      date,
                      startTime,
                      endTime
                    )
                  "
                >
                  Submit
                </v-btn>
                <v-btn color="blue darken-1" text @click="closeAssign">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-text-field
            v-model="search"
            label="Search Name"
            class="mx-4"
          ></v-text-field>
        </v-card-title>
      </template>
      <template v-slot:[`item.struggle`]="{ item }">
        <ul>
          <li v-for="strug in item.struggle" :key="strug">
            {{ strug }}
          </li>
        </ul>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <a href="https://new.assistments.org/">
          {{ item.status }}
        </a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import data from '../../store/mock/data.json';
import { vtsAxios } from '../../plugins/axios';

export default {
  name: 'AdminStudentsTable',
  data() {
    return {
      search: '',
      singleSelect: false,
      dialog: false,
      selected: [],
      selectedDisplay: ['', ''],
      tutor: '',
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      startTime: '',
      endTime: '',
      students: data.admins[0].students,
      tutors: data.admins[0].tutors,
      tutorNames: [''],
      menu: false,
      selectedDate: '',
      headers: [
        {
          text: 'Student Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Benchmark Score', value: 'score' },
        { text: 'Areas of Struggle', value: 'struggle' },
        { text: 'Permission Status', value: 'status' },
      ],
    };
  },
  methods: {
    filterName(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value === item.name &&
        value.toString().indexOf(search) !== -1
      );
    },
    isValidSubmit() {
      return (
        this.selectedDisplay[0] != '' &&
        this.selectedDisplay[1] != '' &&
        this.tutor != '' &&
        this.date != '' &&
        this.startTime != '' &&
        this.endTime != ''
      );
    },
    assignStudents() {
      this.tutors.forEach((element) => {
        this.tutorNames.push(element.name);
      });
      this.tutorNames.splice(0, 1);

      if (this.selected[0]) {
        this.selectedDisplay[0] = this.selected[0].name;
      } else {
        this.selectedDisplay[0] = '';
      }
      if (this.selected[1]) {
        this.selectedDisplay[1] = this.selected[1].name;
      } else {
        this.selectedDisplay[1] = '';
      }
    },
    closeDate() {
      this.date = this.selectedDate;
      this.menu = false;
    },
    submitDate() {
      this.selectedDate = this.date;
      this.closeDate();
    },
    allowedDates(val) {
      return parseInt(val.split('-')[2], 11) % 2 === 0;
    },
    submitAssign(tutor, student1, student2, date, startTime, endTime) {
      const dS = date.split('-');
      const sS = startTime.split(':');
      const eS = endTime.split(':');
      const em = '00';
      const epochStartDate =
        new Date(dS[0], dS[1] - 1, dS[2], sS[0], sS[1], em).getTime() / 1000;
      const epochEndDate =
        new Date(dS[0], dS[1] - 1, dS[2], eS[0], eS[1], em).getTime() / 1000;
      const duration = Math.abs((epochEndDate - epochStartDate) / 60);

      const meeting = {
        supervisorID: 111,
        tutorID: 222,
        studentID1: 333,
        studentID2: 444,
        expectedStartTime: epochStartDate,
        expectedDuration: duration,
      };
      vtsAxios
        .put('/virtualtutoring/createMeeting', meeting)
        .then((response) => response.data)
        .then((data) => console.log(data));

      this.closeAssign();
    },
    closeAssign() {
      this.dialog = false;
    },
  },
};
</script>
