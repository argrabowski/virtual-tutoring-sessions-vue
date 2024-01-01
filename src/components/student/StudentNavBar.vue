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
          :src="require('../../assets/iu.png')"
          transition="scale-transition"
          width="35"
        />
        <v-toolbar-title class="white--text">{{ vtsTitle }}</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-toolbar-title class="white--text">Student Name</v-toolbar-title>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="ml-4" v-bind="attrs" v-on="on">
              <v-avatar class="white black--text darken-2">
                <v-icon large color="primary darken-3"> mdi-account </v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item link to="/">
              <v-list-item-icon>
                <v-icon> mdi-account </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Account </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-icon>
                <v-icon> mdi-cog </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Settings </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/">
              <v-list-item-icon>
                <v-icon> mdi-logout </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Logout </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer app floating temporary v-model="drawer">
      <v-list nav>
        <v-list-item data-cy="home" link to="/studentDashboard" exact>
          <v-list-item-content>
            <v-list-item-title>Tutoring</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'StudentNavBar',
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
  methods: {
    logout() {
      this.$router.push('/login');
    },
  },
};
</script>
