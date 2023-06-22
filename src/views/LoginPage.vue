<script>
import Login from "@/components/Login.vue";
import { authAPiMixin } from "@/api/auth";
import { setupPrivateApi } from "@/api";
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
  mixins: [authAPiMixin],
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
        console.log(payload, access_token);
        localStorage.setItem("access_token", access_token);
        this.$router.push("/dashboard");
      } catch (err) {
        const status = err.response.status;
        if (status == 401) {
          this.$emit("showAlert", this.alert);
        } else {
          this.alert.title = "Ocorreu um erro!";
          this.alert.text = "Tente novamente mais tarde";
          this.$emit("showAlert", this.alert);
        }
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
