<template>
  <div class="home">
    <LoginNavBar />
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginFormAuth.vue';
import LoginNavBar from '../components/LoginNavBar.vue';

export default {
  name: 'Login',
  components: {
    LoginForm,
    LoginNavBar,
  },
};
</script>
