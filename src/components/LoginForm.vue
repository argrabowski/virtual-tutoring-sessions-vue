<template>
  <div>
    <v-row>
      <v-col> </v-col>
      <v-col>
        <form class="pa-md-4 elevation-1 rounded">
          <v-row class="mb-1">
            <v-img
              alt="ASSISTments Logo"
              class="shrink ml-3"
              contain
              :src="require('../assets/iu.png')"
              transition="scale-transition"
              width="35"
            />
            <v-card-title class="display-1 pb-3">ASSISTments</v-card-title>
          </v-row>
          <v-text-field
            class="mr-4 mx-lg-auto"
            v-model="username"
            label="Username"
          ></v-text-field>
          <v-text-field
            class="mx-lg-auto"
            v-model="password"
            type="password"
            label="Password"
          ></v-text-field>
          <div class="mt-1">
            <v-btn class="primary darken-1 mr-4" @click="submit"> Login </v-btn>
            <v-btn class="primary darken-1" @click="clear"> Clear </v-btn>
          </div>
        </form>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submit() {
      if (this.username === 'admin' && this.password === 'admin') {
        this.$router.push('adminDashboard');
      } else if (this.username === 'tutor' && this.password === 'tutor') {
        this.$router.push('tutorDashboard');
      } else if (this.username === 'teacher' && this.password === 'teacher') {
        this.$router.push('teacherReport');
      } else if (this.username === 'student' && this.password === 'student') {
        this.$router.push('studentDashboard');
      }
    },
    clear() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>
