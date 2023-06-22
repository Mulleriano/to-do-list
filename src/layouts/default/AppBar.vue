<script>
export default {
  methods: {
    logOut() {
      localStorage.removeItem("access_token");
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <v-app-bar color="#01f6a8" class="px-4">
    <v-app-bar-title>To Do</v-app-bar-title>

    <v-menu
      transition="scale-transition"
      class="d-flex align-center justify-center"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="grey-darken-4" v-bind="props" icon="mdi-account"> </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <button @click="logOut">Log Out</button>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
