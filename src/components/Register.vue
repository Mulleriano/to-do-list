<script>
export default {
  props: {
    loading: Boolean,
  },
  data: () => ({
    form: true,
    username: null,
    email: null,
    password: null,
    confirmPassowrd: null,
    showPassword: false,
  }),
  methods: {
    onSubmit() {
      if (!this.form) return;

      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      this.$emit("registered", payload);
      this.$refs.forms.reset();
    },
    required(input) {
      return !!input || "Field is required";
    },
    checkUsername(input) {
      if (input.toLowerCase() !== input) return "Only lower case";
      if (input.includes(" ")) return "No spaces";
      return true;
    },
    checkMail(input) {
      var emailRegex = /.+@.+\..+/;
      return !emailRegex.test(input) ? "Invalid email" : true;
    },
    checkPassword(input) {
      let regexSpecial = /\W|_/;
      let regexNumber = /(\d+)| /g;
      if (input.includes(" ")) return "No spaces";
      if (input.length < 8)
        return "At least 8 characters, 1 special character and 1 number";
      if (!regexSpecial.test(input)) return "At least 1 special character";
      if (!regexNumber.test(input)) return "At least 1 number";
      return true;
    },
    testPassowrd(input) {
      return input !== this.password ? "Passwords don't match" : true;
    },
  },
};
</script>

<template>
  <v-sheet min-width="300">
    <v-card
      color="transparent"
      class="w-100 elevation-0"
      title="Register"
    >
      <v-form v-model="form" @submit.prevent="onSubmit" ref="forms">
        <v-container>
          <v-text-field
            v-model="username"
            label="Username"
            :rules="[required, checkUsername]"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="[required, checkMail]"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            class="pb-2"
            v-model="password"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            :rules="[required, checkPassword]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            placeholder="Enter your password"
            counter
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassowrd"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
            :rules="[required, testPassowrd]"
            :type="showPassword ? 'text' : 'password'"
            label="Confirm Password"
            placeholder="Enter your password"
            counter
            variant="underlined"
          ></v-text-field>
        </v-container>
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
            Register
          </v-btn>
        </v-card-actions>
        <div class="d-flex flex-column align-center">
          <p>Already have an account?</p>
          <router-link to="/"> Sign in </router-link>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>
