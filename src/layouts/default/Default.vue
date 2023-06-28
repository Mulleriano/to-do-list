<script>
import DefaultBar from "./AppBar.vue";

export default {
  components: {
    DefaultBar
  },
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
  }
};
</script>

<template>
      <div>
        <v-fade-transition>
          <v-alert
            style= "z-index:20001"
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

    <v-app>
    <default-bar />

    <v-main class="bgBlack">
      <router-view @showAlert="showAlert" />
    </v-main>
  </v-app>
</template>

<style scoped>
/* Estilo removido para melhorar visualização
.bgBlack {
  background: #212121;
} */
</style>
