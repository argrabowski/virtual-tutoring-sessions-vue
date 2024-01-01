<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="assignments"
          item-key="name"
          class="elevation-1"
          :search="search"
          :custom-filter="filterName"
        >
          <template v-slot:top>
            <v-card-title>
              Assignments
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                label="Search Assignment"
                class="mx-4"
              ></v-text-field>
            </v-card-title>
          </template>
          <template v-slot:[`item.name`]="{ item }">
            <a href="/tutorFeedback">
              {{ item.name }}
            </a>
          </template>
          <template v-slot:[`item.percentCorrect`]="{ item }">
            <v-row>
              <template v-if="item.percentCorrect[0] === ''">
                <v-avatar class="my-2 primary white--text darken-2" size="40"
                  >S1</v-avatar
                >
              </template>
              <template v-else> {{ item.percentCorrect[0] }} </template>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <template v-if="item.percentCorrect[1] === ''">
                <v-avatar class="my-2 primary white--text" size="40"
                  >S2</v-avatar
                >
              </template>
              <template v-else> {{ item.percentCorrect[1] }} </template>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            </v-row>
          </template>
          <template v-slot:[`item.timeSpent`]="{ item }">
            <v-row>
              <template v-if="item.timeSpent[0] === ''">
                <v-avatar class="my-2 primary white--text darken-2" size="40"
                  >S1</v-avatar
                >
              </template>
              <template v-else> {{ item.timeSpent[0] }} </template>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <template v-if="item.timeSpent[1] === ''">
                <v-avatar class="my-2 primary white--text" size="40"
                  >S2</v-avatar
                >
              </template>
              <template v-else> {{ item.timeSpent[1] }} </template>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            </v-row>
          </template>
          <template v-slot:[`item.lastWorked`]="{ item }">
            <v-row>
              <template v-if="item.lastWorked[0] === ''">
                <v-avatar class="my-2 primary white--text darken-2" size="40"
                  >S1</v-avatar
                >
              </template>
              <template v-else> {{ item.lastWorked[0] }} </template>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <template v-if="item.lastWorked[1] === ''">
                <v-avatar class="my-2 primary white--text" size="40"
                  >S2</v-avatar
                >
              </template>
              <template v-else> {{ item.lastWorked[1] }} </template>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import data from '../../store/mock/data.json';

export default {
  name: 'TutorReportTable',
  data() {
    return {
      search: '',
      assignments: data.tutors[0].assignments,
      headers: [
        {
          text: 'Assignment Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '% Correct', value: 'percentCorrect' },
        { text: 'Time Spent', value: 'timeSpent' },
        { text: 'Last Worken On', value: 'lastWorked' },
        { text: 'Standards Covered', value: 'standards' },
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
  },
};
</script>
