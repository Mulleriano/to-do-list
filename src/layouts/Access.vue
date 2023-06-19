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
    <v-main class="bg-grey-lighten-2">
      <div class="d-flex justify-center">
        <v-alert
          class="mt-4 w-100 justify-space-between elevation-15"
          max-width="344"
          position="fixed"
          v-show="showAlert"
          type="success"
          title="User registered!"
          text="Log in"
          closable
        >
        </v-alert>
      </div>

      <router-view @registered="registered" />
    </v-main>
  </v-app>
</template>
