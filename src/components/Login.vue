<script>
export default {
  props: {
    loading: Boolean,
  },
  data: () => ({
    form: false,
    email: null,
    password: null,
    showPassword: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;
      
      const payload = {
        email: this.email,
        password: this.password,
      };

      this.$emit("submitLogin", payload);
    },
    required(input) {
      return !!input || "Field is required";
    },
    checkMail(input) {
      var emailRegex = /.+@.+\..+/;
      return !emailRegex.test(input) ? "Invalid email" : true;
    },
  },
};
</script>

<template>
  <v-sheet min-width="300">
    <v-card
      color="transparent"
      class="w-100 elevation-0"
      title="Login"
    >
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-container>
          <v-text-field
            class="mb-2"
            v-model="email"
            :rules="[required, checkMail]"
            label="Email"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            class="pb-2"
            v-model="password"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            :rules="[required]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="Enter your password"
            counter
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
            <router-link to="/register"> Sign Up </router-link>
          </div>
        </v-container>
      </v-form>
    </v-card>
  </v-sheet>
</template>
