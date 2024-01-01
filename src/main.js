import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';
import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import Login from './views/Login.vue';
import AdminDashboard from './views/admin/AdminDashboard';
import AdminTutors from './views/admin/AdminTutors.vue';
import AdminStudents from './views/admin/AdminStudents.vue';
import TutorDashboard from './views/tutor/TutorDashboard.vue';
import TutorReport from './views/tutor/TutorReport.vue';
import TutorFeedback from './views/tutor/TutorFeedback.vue';
import TeacherReport from './views/teacher/TeacherReport.vue';
import StudentDashboard from './views/student/StudentDashboard.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

/**
 * Checks authentication status in store.
 * If it fails, it requests auth status from server
 * @param {Route} to newly requested route
 * @param {Route} from previous route
 * @param {Function} next allows navigation or redirects
 */
function checkAuthenticated(to, from, next) {
  return store
    .dispatch('requestIsAuth')
    .then(() => {
      console.log(store.state.auth.userRole);
      switch (store.state.auth.userRole) {
        case 1: // admin
          return next('/adminDashboard');
        case 2: // tutor
          return next('/tutorDashboard');
        case 3: // teacher
          return next('/teacherReport');
        case 4: // student
          return next('/studentDashboard');
      }
    })
    .catch(() => next('/login'));
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login,
    beforeEnter: checkAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/adminDashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
  {
    path: '/adminTutors',
    name: 'AdminTutors',
    component: AdminTutors,
  },
  {
    path: '/adminStudents',
    name: 'AdminStudents',
    component: AdminStudents,
  },
  {
    path: '/tutorDashboard',
    name: 'TutorDashboard',
    component: TutorDashboard,
  },
  {
    path: '/tutorReport',
    name: 'TutorReport',
    component: TutorReport,
  },
  {
    path: '/tutorFeedback',
    name: 'TutorFeedback',
    component: TutorFeedback,
  },
  {
    path: '/teacherReport',
    name: 'TeacherReport',
    component: TeacherReport,
  },
  {
    path: '/studentDashboard',
    name: 'StudentDashboard',
    component: StudentDashboard,
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

const app = new Vue({
  render: (h) => h(App),
  store,
  vuetify,
  router,
}).$mount('#app');

if (window.Cypress) {
  window.app = app;
}
