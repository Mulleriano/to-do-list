<script>
export default {
  data: () => ({
    form: true,
    username: null,
    email: null,
    password: null,
    confirmPassowrd: null,
    loading: false,
    showPassword: false,
    showConfirm: false,
  }),
  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.$refs.forms.reset();
        this.$emit("registered");
        this.$router.push("/");
      }, 3000);
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
      if (input.length < 8) return "At least 8 characters";
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
      position="absolute"
      class="w-100 elevation-0"
      location="center"
      title="Register"
    >
      <v-form v-model="form" @submit.prevent="onSubmit" ref="forms">
        <v-container>
          <v-text-field
            v-model="username"
            color="primary"
            label="Username"
            :rules="[required, checkUsername]"
            append-icon="mdi-account-outline"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="email"
            color="primary"
            label="Email"
            :rules="[required, checkMail]"
            append-icon="mdi-email-outline"
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
            counter
            @click:append="showPassword = !showPassword"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassowrd"
            color="primary"
            :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[required, testPassowrd]"
            :type="showConfirm ? 'text' : 'password'"
            label="Confirm Password"
            placeholder="Enter your password"
            counter
            @click:append="showConfirm = !showConfirm"
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
          <router-link to="/">
            Sing in
          </router-link>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>
