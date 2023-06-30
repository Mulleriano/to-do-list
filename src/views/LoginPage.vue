<script>
import Login from "@/components/Login.vue";
import { authAPiMixin } from "@/api/auth";
import { setupPrivateApi } from "@/api";
import handleAlert from "@/mixins/handleAlert";
export default {
  data() {
    return {
      loadingBtn: false,
      alert: {
        type: "error",
        color: "error",
        title: "Ocorreu um erro",
        text: "Usuário ou senha incorretos",
      },
    };
  },
  mixins: [authAPiMixin, handleAlert],
  components: {
    Login,
  },
  methods: {
    async submitLogin(payload) {
      this.loadingBtn = true;
      try {
        const { data } = await this.login(payload);
        const { access_token } = data;
        setupPrivateApi(access_token);
        localStorage.setItem("access_token", access_token);
        this.$router.push("/dashboard");
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.loadingBtn = false;
      }
    },
  },
};
</script>
<template>
  <Login @submitLogin="submitLogin" :loading="loadingBtn" />
</template>
