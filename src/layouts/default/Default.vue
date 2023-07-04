<script>
import { userMixin } from "@/api/user";
import { capitalize } from "vue";
export default {
  data() {
    return {
      alert: {
        show: false,
        type: "",
        color: "",
        title: "",
        text: "",
        loadingBtn: "",
      },
      drawer: true,
      rail: true,
      user: {},
    };
  },
  mixins: [userMixin],
  methods: {
    async getUser() {
      const { data } = await this.userInfo();
      this.user = data;
    },
    showAlert(data) {
      this.alert.type = data.type;
      this.alert.color = data.color;
      this.alert.title = data.title;
      this.alert.text = data.text;
      this.alert.show = true;
      setTimeout(() => {
        this.alert.show = false;
      }, 2000);
    },
    logOut() {
      localStorage.removeItem("access_token");
      location.replace("/");
    },
    checkDashboard() {
      if (this.$route.path == "/dashboard") {
        this.rail = true;
      }
    },
    capitalize(username) {
      return username?.charAt(0).toUpperCase() + username?.slice(1);
    },
  },
  mounted() {
    this.checkDashboard();
    this.getUser();
  },
};
</script>

<template>
  <div>
    <v-fade-transition>
      <v-alert
        style="z-index: 20001"
        class="mt-4 w-100 justify-space-between elevation-15 rounded-lg"
        max-width="344"
        position="fixed"
        location="top"
        v-show="alert.show"
        :type="alert.type"
        :color="alert.color"
        :title="alert.title"
        :text="alert.text"
      >
      </v-alert>
    </v-fade-transition>
  </div>

  <v-app>
    <v-card height="100vh">
      <v-layout>
        <v-navigation-drawer
          color="grey-darken-4"
          v-model="drawer"
          :rail="rail"
          permanent
        >
          <v-list-item
            @click="rail = !rail"
            :title="capitalize(user.username)"
            nav
          >
            <template v-slot:append>
              <v-btn
                color="#01f6a8"
                variant="text"
                icon="mdi-chevron-left"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
            <template v-slot:prepend>
              <v-avatar color="grey-darken-3">
                <v-icon color="#01f6a8"> mdi-account </v-icon>
              </v-avatar>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item
              to="/dashboard"
              color="#01f6a8"
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              value="Dashboard"
              @click="this.$router.push('/dashboard')"
            ></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-6">
              <v-btn color="#01f6a8" v-show="!rail" @click="logOut" block>
                Log Out
              </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 100vh; overflow-y: auto">
          <router-view @showAlert="showAlert" />
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<style scoped></style>
