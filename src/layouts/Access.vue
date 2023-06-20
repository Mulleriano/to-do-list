<script>
export default {
  data() {
    return {
      showAlert: false,
    };
  },
  methods: {
    registered() {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },
  },
};
</script>
<template>
  <v-app>
    <v-main class="background d-flex flex-column justify-center align-center">
      <div>
        <v-alert
          class="mt-4 w-100 justify-space-between elevation-15"
          max-width="344"
          position="fixed"
          location="top"
          v-show="showAlert"
          type="success"
          title="User registered!"
          text="Log in"
          closable
        >
        </v-alert>
      </div>

      <v-sheet
        color="transparent"
        max-width="800"
        height="550"
        class="rounded-lg mx-8 d-flex justify-left flex-column flex-sm-row align-center elevation-15 rounded"
      >
        <div
          class="w-50 h-sm-50 pa-8 d-flex flex-column align-center justify-end"
        >
          <h1>TO DO LIST</h1>
          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_mf5j5kua.json"
            background="transparent"
            speed="1"
            style="width: 100%; height: auto"
            loop
            autoplay
          ></lottie-player>
        </div>

        <v-sheet position="relative" class="w-50 ma-8">
          <router-view @registered="registered" />
        </v-sheet>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<style scoped>
.background {
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(186, 170, 212, 1) 61%,
    rgba(109, 164, 228, 1) 100%
  );
}
</style>
