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
      if (!input.includes("@")) return "Missing '@'";
      if (!input.includes(".com")) return "Missing '.com'";
      return true;
    },
    checkPassword(input) {
      let regexSpecial = /\W|_/;
      let regexNumber = /(\d+)| /g;
      if (input.includes(" ")) return "No spaces";
      if (input.length < 8)
        return "At least 8 characters";
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
  <v-sheet>
    <v-card
      class="w-100 px-6 py-8 elevation-15"
      location="center"
      position="fixed"
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
