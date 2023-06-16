<script>
export default {
  data: () => ({
    form: false,
    username: null,
    email: null,
    password: null,
    confirmPassowrd: null,
    loading: false,
  }),
  methods: {
    onSubmit() {
      if (!this.form) return;

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.$refs.forms.reset();
      }, 2000);
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
      if (!input.includes("@")) return "Missing '@'";
      if (!input.includes(".com")) return "Missing '.com'";
      return true;
    },
    checkPassword(input) {
      let regexSpecial = /\W|_/;
      let regexNumber = /(\d+)| /g;
      if (input.length < 8)
        return "Must have 8 letters, 1 special character and 1 number";
      if (!regexSpecial.test(input)) return "At least 1 special character";
      if (!regexNumber.test(input)) return "At least 1 number";
      return true;
    },
    testPassowrd(input) {
      if (input !== this.password) return "Passwords don't match";
      return true;
    },
  },
};
</script>

<template>
  <v-alert
    v-show="loading"
    type="success"
    title="User registered"
    text="The user was succesfully registered"
  ></v-alert>

  <v-sheet
    class="bg-grey-lighten-2 pa-12 h-screen d-flex justify-center align-center"
    rounded
  >
    <v-card
      class="w-100 px-6 py-8 elevation-15"
      max-width="344"
      title="User Registration"
    >
      <v-form v-model="form" @submit.prevent="onSubmit" ref="forms">
        <v-container>
          <v-text-field
            v-model="username"
            color="primary"
            label="Username"
            :rules="[required, checkUsername]"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="email"
            color="primary"
            label="Email"
            :rules="[required, checkMail]"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="password"
            color="primary"
            label="Password"
            :rules="[required, checkPassword]"
            placeholder="Enter your password"
            variant="underlined"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassowrd"
            color="primary"
            label="Confirm  Password"
            :rules="[required, testPassowrd]"
            variant="underlined"
            type="password"
          ></v-text-field>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Register
          </v-btn>
        </v-card-actions>

        <router-link to="/">
          <v-card-actions class="d-flex justify-center">
            <v-btn block color="grey-darken-4" size="large" variant="elevated">
              Sign In
            </v-btn>
          </v-card-actions>
        </router-link>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.v-alert {
  position: fixed;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
