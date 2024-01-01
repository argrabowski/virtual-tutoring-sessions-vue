<template>
  <div>
    <v-row>
      <v-col>
        <div class="pa-md-2 elevation-1 rounded">
          <v-row>
            <v-col>
              <v-card-title> Assignment Name </v-card-title>
              <v-card-subtitle> Problem 1 </v-card-subtitle>
            </v-col>
            <v-col class="text-right mt-4">
              <v-btn class="primary darken-1 mt-2 mr-4">
                Submit Tutor Reporting
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="pa-md-4 elevation-1 rounded">
          <v-row>
            <v-col>
              <b> Student 1 Name </b> <br />
              <br />
              <b>Time Spent:</b> <br />
              {{ student1.timeSpent }} <br />
              <br />
              <b>Class Average Time:</b> <br />
              {{ student1.averageTime }} <br />
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <br />
              <br />
              <b>Correct Answer:</b> <br />
              {{ student1.correctAnswer }} <br />
              <br />
              <b>Answers:</b> <br />
              <ul>
                <li v-for="(answer, index) in student1.answers" :key="answer">
                  Attempt {{ index + 1 }}: {{ answer }}
                </li>
              </ul>
            </v-col>
            <v-col> </v-col>
            <v-col>
              <b> Tutor Reporting Data </b>
              <v-checkbox
                label="Student could not start"
                color="primary darken-1"
                hide-details
              ></v-checkbox>
              <v-checkbox
                label="I suggested to ask for a hint"
                color="primary darken-1"
                hide-details
              ></v-checkbox>
              <v-checkbox
                label="I helped the student a little"
                color="primary darken-1"
                hide-details
              ></v-checkbox>
              <v-checkbox
                label="I helped the student a lot"
                color="primary darken-1"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col></v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="pa-md-4 elevation-1 rounded">
          <v-row>
            <v-col>
              <b> Student 2 Name </b> <br />
              <br />
              <b>Time Spent:</b> <br />
              {{ student2.timeSpent }} <br />
              <br />
              <b>Class Average Time:</b> <br />
              {{ student2.averageTime }} <br />
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <br />
              <br />
              <b>Correct Answer:</b> <br />
              {{ student2.correctAnswer }} <br />
              <br />
              <b>Answers:</b> <br />
              <ul>
                <li v-for="(answer, index) in student2.answers" :key="answer">
                  Attempt {{ index + 1 }}: {{ answer }}
                </li>
              </ul>
            </v-col>
            <v-col> </v-col>
            <v-col>
              <b> Tutor Reporting Data </b>
              <v-checkbox
                label="Student could not start"
                color="primary darken-1"
                hide-details
              ></v-checkbox>
              <v-checkbox
                label="I suggested to ask for a hint"
                color="primary darken-1"
                hide-details
              ></v-checkbox>
              <v-checkbox
                label="I helped the student a little"
                color="primary darken-1"
                hide-details
              ></v-checkbox>
              <v-checkbox
                label="I helped the student a lot"
                color="primary darken-1"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-col> </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import data from '../../store/mock/data.json';

export default {
  name: 'TutorFeedbackTable',
  data() {
    return {
      student1: data.tutors[0].feedback[0],
      student2: data.tutors[0].feedback[1],
    };
  },
};
</script>
