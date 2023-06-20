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
    <v-main class="bgGreen d-flex flex-column justify-center align-center">
      <div>
        <v-fade-transition>
          <v-alert
            class="mt-4 w-100 justify-space-between elevation-15 rounded-lg"
            max-width="344"
            position="fixed"
            location="top"
            v-show="showAlert"
            type="success"
            color="white"
            title="User registered!"
            text="Log in"
            closable
          >
          </v-alert>
        </v-fade-transition>
      </div>

      <v-sheet
        color="white"
        max-width="800"
        height="550"
        class="rounded-lg mx-8 d-flex justify-left flex-column flex-sm-row align-center elevation-15"
      >
        <div
          class="bg-grey-darken-4 h-100 w-100 pa-8 d-flex flex-column align-center justify-center rounded-s-lg"
        >
          <h1 class="text-green-accent-2">TO DO LIST</h1>
          <lottie-player
            src="https://assets9.lottiefiles.com/packages/lf20_KWqh4bY8YV.json"
            background="transparent"
            speed="1"
            style="width: 100%; height: auto"
            loop
            autoplay
          ></lottie-player>
        </div>

        <v-sheet position="relative" class="w-auto ma-8">
          <router-view @registered="registered" />
        </v-sheet>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<style scoped>
.bgGreen {
  background: #01f6a8;
}
</style>
