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
  <v-sheet min-width="300">
    <v-card
      color="transparent"
      position="absolute"
      class="w-100 elevation-0"
      location="center"
      title="Login"
    >
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-container>
          <v-text-field
            v-model="email"
            :rules="[required, checkMail]"
            class="mb-2"
            clearable
            label="Email"
            append-icon="mdi-account-outline"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            class="pb-2"
            v-model="password"
            color="primary"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[required, checkPassword]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="Enter your password"
            hint="At least 8 characters"
            counter
            @click:append="showPassword = !showPassword"
            variant="underlined"
          ></v-text-field>
          <v-card-actions>
            <v-btn
              :disabled="!form"
              :loading="loading"
              block
              color="#01f6a8"
              size="large"
              type="submit"
              variant="elevated"
            >
              Sign In
            </v-btn>
          </v-card-actions>
          <div class="d-flex flex-column align-center">
            <p>Don't have an account?</p>
            <router-link to="/register"> Sing Up </router-link>
          </div>
        </v-container>
      </v-form>
    </v-card>
  </v-sheet>
</template>
