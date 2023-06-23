<script>
import Register from "@/components/Register.vue";
import { authAPiMixin } from "@/api/auth";

export default {
  data() {
    return {
      loadingBtn: false,
      alert: {
        type: "success",
        color: "#01f6a8",
        title: "Usuário criado com sucesso!",
        text: "Log in",
      },
    };
  },
  mixins: [authAPiMixin],
  components: {
    Register,
  },
  methods: {
    async registered(payload) {
      this.loadingBtn = true;
      try {
        await this.register(payload);
        this.$emit("showAlert", this.alert);
        this.$router.push("/");
      } catch (err) {
        const status = err.response.status;
        if (status >= 500 && status < 600) {
          this.alert.type = "error";
          this.alert.color = "error";
          this.alert.title = "Ocorreu um erro no servidor";
          this.alert.text = "Pedimos desculpa pelo inconveniente";
          this.$emit("showAlert", this.alert);
        } else {
          this.alert.type = "error";
          this.alert.color = "error";
          this.alert.title = "Algo deu errado :(";
          this.alert.text = "Pedimos desculpa pelo inconveniente";
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
  <Register @registered="registered" :loading="loadingBtn" />
</template>
