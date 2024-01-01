<template>
  <v-row>
    <v-col>
      <div class="pa-md-4 elevation-1 rounded">
        <v-row>
          <v-col class="ml-2">
            <v-text-field
              class="mr-4 mx-lg-auto"
              label="Student 1"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field class="mx-lg-auto" label="Student 2"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field class="mx-lg-auto" label="Weekly View"></v-text-field>
          </v-col>
          <v-col class="text-right mt-4">
            <v-btn class="primary darken-1 mr-4">
              Start Tutoring Session
            </v-btn>
          </v-col>
          <v-col class="mt-4">
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="primary darken-1" v-bind="attrs" v-on="on">
                  Write Session Notes to Teacher
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Session Notes</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="newNote.student"
                          label="Student"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="newNote.notes"
                          label="Notes"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="submit">
                    Submit
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TutorReportHeader',
  data() {
    return {
      newNote: {
        student: '',
        notes: '',
      },
      dialog: false,
    };
  },
  method: {
    submit() {
      console.log('Submit');
    },
    close() {
      console.log('Close');
    },
  },
};
</script>
