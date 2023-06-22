<script>
import { authAPiMixin } from "@/api/auth";
export default {
  mixins: [authAPiMixin],
  data() {
    return {
      alert: {
        show: false,
        type: "",
        color: "",
        title: "",
        text: "",
        loadingBtn: "",
      },
    };
  },
  methods: {
    showAlert(data) {
      this.alert.type = data.type;
      this.alert.color = data.color;
      this.alert.title = data.title;
      this.alert.text = data.text;
      this.alert.show = true;
      setTimeout(() => {
        this.alert.show = false;
      }, 2000);
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
            v-show="alert.show"
            :type="alert.type"
            :color="alert.color"
            :title="alert.title"
            :text="alert.text"
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
          <router-view @showAlert="showAlert" />
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
