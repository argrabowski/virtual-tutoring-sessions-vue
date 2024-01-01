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
          <div class="mt-1">
            <v-btn
              class="primary darken-1 mr-4"
              :loading="loading"
              :href="loginHref"
              @click="setLoading"
            >
              Login
            </v-btn>
          </div>
        </form>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'LoginFormAuth',
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    callbackUrl() {
      const currentUrl = `${process.env.VUE_APP_FRONT_URL}`;
      const redirectUrl =
        process.env.VUE_APP_DEPLOYED === 'true'
          ? currentUrl
          : `${process.env.VUE_APP_VTS_URL}/redirect/returnToLocalhost`;
      return encodeURIComponent(redirectUrl);
    },
    loginHref() {
      return `https://accounts${process.env.VUE_APP_URL_SUB}.assistments.org/?callbackText=VTS&callbackURL=${this.callbackUrl}&callingPartnerRef=VTS`;
    },
  },
  methods: {
    setLoading() {
      this.loading = true;
    },
  },
};
</script>
