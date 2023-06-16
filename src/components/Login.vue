<script>
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.$router.push("/to-do");
      }, 2000);
    },
    required(input) {
      return !!input || "Field is required";
    },
    checkMail(input) {
      if (!input.includes("@")) return "Missing '@'";
      if (!input.includes(".com")) return "Missing '.com'";
      return true;
    },
  },
};
</script>

<template>
  <v-sheet
    class="bg-grey-lighten-2 pa-12 h-screen d-flex justify-center align-center"
    rounded
  >
    <v-card class="w-100 px-6 py-8 elevation-15" max-width="344">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required, checkMail]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br />

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="success"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>

        <router-link to="/register">
          <v-btn
            block
            color="grey-darken-4"
            size="large"
            type="submit"
            variant="elevated"
            class="mt-4"
          >
            Register
          </v-btn>
        </router-link>
      </v-form>
    </v-card>
  </v-sheet>
</template>
