<script>
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
    showPassword: false,
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
      var emailRegex = /.+@.+\..+/;
      return !emailRegex.test(input) ? "Invalid email" : true;
    },
    checkPassword(input) {
      return input.length < 8 ? "At least 8 characters" : true;
    },
  },
};
</script>

<template>
  <v-sheet>
    <v-card
      class="w-100 px-6 py-8 elevation-15"
      max-width="344"
      position="fixed"
      location="center"
    >
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :rules="[required, checkMail]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[required, checkPassword]"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          placeholder="Enter your password"
          hint="At least 8 characters"
          counter
          @click:append="showPassword = !showPassword"
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
