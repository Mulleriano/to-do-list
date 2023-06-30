<script>
import { setupPrivateApi } from "./api";
export default {
  mounted() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      this.$router.push("/");
      return;
    }
    setupPrivateApi(token);
  },
};
</script>

<template>
  <router-view />
</template>

<style>
a {
  text-decoration: none !important;
}
a:hover {
  opacity: 0.7;
}
</style>
