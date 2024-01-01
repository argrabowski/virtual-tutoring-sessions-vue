<template>
  <v-app>
    <template v-if="isPath('Login')">
      <LoginNavBar />
    </template>
    <template
      v-if="
        isPath('AdminDashboard') ||
        isPath('AdminTutors') ||
        isPath('AdminStudents')
      "
    >
      <AdminNavBar />
    </template>
    <template
      v-if="
        isPath('TutorDashboard') ||
        isPath('TutorReport') ||
        isPath('TutorFeedback')
      "
    >
      <TutorNavBar />
    </template>
    <template v-if="isPath('TeacherReport')">
      <TeacherNavBar />
    </template>
    <template v-if="isPath('StudentDashboard')">
      <StudentNavBar />
    </template>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LoginNavBar from './components/LoginNavBar.vue';
import AdminNavBar from './components/admin/AdminNavBar.vue';
import TutorNavBar from './components/tutor/TutorNavBar.vue';
import TeacherNavBar from './components/teacher/TeacherNavBar.vue';
import StudentNavBar from './components/student/StudentNavBar.vue';

export default {
  name: 'App',
  components: {
    LoginNavBar,
    AdminNavBar,
    TutorNavBar,
    TeacherNavBar,
    StudentNavBar,
  },
  methods: {
    created() {
      this.$store.dispatch('vueSetup');
    },
    isPath(path) {
      return this.$route.name === path;
    },
  },
};
</script>
