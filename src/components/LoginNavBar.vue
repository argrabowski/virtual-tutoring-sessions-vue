<template>
  <div>
    <v-app-bar class="primary darken-3" app>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          class="white--text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-img
          alt="ASSISTments Logo"
          class="shrink mr-2"
          contain
          :src="require('../assets/iu.png')"
          transition="scale-transition"
          width="35"
        />
        <v-toolbar-title class="white--text">{{ vtsTitle }}</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-btn icon class="ml-4">
          <v-avatar class="white black--text darken-2">
            <v-icon large color="primary darken-3"> mdi-account </v-icon>
          </v-avatar>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer app floating temporary v-model="drawer">
      <v-list nav> </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'LoginNavBar',
  data() {
    return {
      drawer: false,
      vtsTitle: `Virtual Tutoring Sessions${
        process.env.VUE_APP_APPEND_TITLE
          ? ' ' + process.env.VUE_APP_APPEND_TITLE
          : ''
      }`,
    };
  },
};
</script>
