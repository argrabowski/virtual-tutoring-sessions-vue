<template>
  <div>
    <v-alert
      v-model="alert"
      dismissible
      type="success"
      border="left"
      elevation="1"
      colored-border
    >
      <span v-html="datas()"></span>
    </v-alert>
    <v-alert
      v-model="error"
      dismissible
      type="error"
      border="left"
      elevation="1"
      colored-border
    >
      <strong> Please enter a valid email address. </strong> Request to add
      tutor was not sent, try again.
    </v-alert>
    <v-data-table
      :headers="headers"
      :items="tutors"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterName"
    >
      <template v-slot:top>
        <v-card-title class="display-1">
          Tutors
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog2" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Assign Meeting</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete
                        v-model="selectedDisplay[0]"
                        label="Student 1"
                        :items="studentNames"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-autocomplete
                        v-model="selectedDisplay[1]"
                        label="Student 2"
                        :items="studentNames"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="tutor"
                        label="Tutor"
                        readonly
                      ></v-text-field>
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
          <v-dialog v-model="dialog" max-width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary darken-1"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                + Add Tutors
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Request Tutor</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="tutorEmail"
                        label="Tutor Email"
                        placeholder="example@gmail.com"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="submitAddTutor(tutorEmail)"
                >
                  Submit
                </v-btn>
                <v-btn color="blue darken-1" text @click="closeAddTutor">
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
      <template v-slot:[`item.email`]="{ item }">
        <a href="https://new.assistments.org/">
          {{ item.email }}
        </a>
      </template>
      <template v-slot:[`item.days`]="{ item }">
        <ul>
          <li v-for="day in item.days" :key="day">
            {{ day }}
          </li>
        </ul>
      </template>
      <template v-slot:[`item.times`]="{ item }">
        <ul>
          <li v-for="time in item.times" :key="time">
            {{ time }}
          </li>
        </ul>
      </template>
      <template v-slot:[`item.location`]="{ item }">
        <a href="https://new.assistments.org/">
          {{ item.location }}
        </a>
      </template>
      <template v-slot:[`item.assign`]="{ item }">
        <v-icon large class="primary--text mr-2" @click="assignStudents(item)">
          mdi-account-multiple-plus
        </v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon medium class="primary--text mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import data from '../../store/mock/data.json';
import { vtsAxios } from '../../plugins/axios';

export default {
  name: 'AdminTutorsTable',
  data() {
    return {
      alert: false,
      error: false,
      search: '',
      tutors: data.admins[0].tutors,
      students: data.admins[0].students,
      editedItem: {
        name: '',
        days: [],
        times: [],
        location: '',
      },
      editedIndex: -1,
      newItem: {
        name: '',
        days: [],
        times: [],
        location: '',
      },
      newIndex: -1,
      defaultItem: {
        name: '',
        days: [],
        times: [],
        location: '',
      },
      dialog: false,
      dialog2: false,
      dialogDelete: false,
      selectedDisplay: ['', ''],
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      selectedDate: '',
      startTime: '',
      endTime: '',
      tutor: '',
      tutorEmail: '',
      tutorEmailDisp: '',
      studentNames: [''],
      tutorNames: [''],
      selected: [],
      headers: [
        {
          text: 'Tutor Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Days Available', value: 'days' },
        { text: 'Times Available', value: 'times' },
        { text: 'Location', value: 'location' },
        { text: 'Assign Students', value: 'assign', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    datas() {
      return (
        '<strong> Successfully requested tutor! </strong> An email requesting to join ASSISTments Virtual Tutoring Sessions was sent to <strong>' +
        this.tutorEmailDisp +
        '</strong>.'
      );
    },
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
    setupTutors() {
      this.tutors.forEach((element) => {
        this.tutorNames.push(element.name);
      });
      this.tutorNames.splice(0, 1);
    },
    getTutorNames() {
      let names = [];
      this.tutors.forEach((element) => {
        names.push(element.name);
      });
      names.splice(0, 1);
      return names;
    },
    assignStudents(item) {
      this.tutor = item.name;
      this.dialog2 = true;
      this.students.forEach((element) => {
        this.studentNames.push(element.name);
      });
      this.studentNames.splice(0, 1);

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
    deleteItem(item) {
      this.newIndex = this.tutors.indexOf(item);
      this.newItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.tutors.splice(this.newIndex, 1);
    },
    isValidEmail() {
      let validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (this.tutorEmail.match(validRegex)) {
        return true;
      }
      return false;
    },
    submitAddTutor() {
      if (this.isValidEmail()) {
        this.alert = true;
        this.error = false;
        this.tutorEmailDisp = this.tutorEmail;
      } else {
        this.error = true;
        this.alert = false;
      }
      this.closeAddTutor();
    },
    closeAddTutor() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
      this.dialog2 = false;
    },
  },
};
</script>
