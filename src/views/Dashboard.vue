<script>
import ToDoList from "@/components/ToDoList.vue";
import CreateModal from "@/components/CreateModal.vue";
import UpdateModal from "@/components/UpdateModal.vue";
import RemoveModal from "@/components/RemoveModal.vue";
import { toDoListsApiMixin } from "@/api/toDoList";
import handleAlertMixin from "@/mixins/handleAlert";
import loadingMixin from "@/mixins/loading";

export default {
  components: {
    ToDoList,
    UpdateModal,
    RemoveModal,
    CreateModal,
  },
  data() {
    return {
      showCreate: false,
      showRemove: false,
      showUpdate: false,
      selectedTitle: "",
      selectedId: "",
      toDoList: [],
      loading: false,
    };
  },
  mixins: [toDoListsApiMixin, handleAlertMixin, loadingMixin],
  methods: {
    async getLists() {
      try {
        this.loading = true;
        const { data } = await this.list();
        this.toDoList = data;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    async createList(title) {
      try {
        this.loadingCreate = true;
        const payload = {
          title: title,
        };
        const { data } = await this.create(payload);
        this.toDoList.push(data);
        this.createAlert();
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.createTitle = "";
        this.loadingCreate = false;
        this.showCreate = false;
      }
    },
    async removeList() {
      try {
        this.loadingRemove = true;
        await this.remove(this.selectedId);
        this.deleteAlert();
        this.getLists();
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.showRemove = false;
        this.loadingRemove = false;
      }
    },

    async updateList(title) {
      try {
        const payload = {
          title: title,
        };
        await this.update(this.selectedId, payload);
        this.selectedTitle = "";
        this.getLists();
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.loadingUpdate = false;
        this.showUpdate = false;
      }
    },

    startRemove(toDo) {
      this.showRemove = true;
      this.selectedTitle = toDo.title;
      this.selectedId = toDo.id;
      if (this.showUpdate) this.showUpdate = false;
    },

    startUpdate(toDo) {
      this.showUpdate = true;
      this.selectedTitle = toDo.title;
      this.selectedId = toDo.id;
      if (this.showRemove) this.showRemove = false;
    },
    closeUpdate() {
      this.showUpdate = false;
    },
  },
  mounted() {
    this.getLists();
  },
  computed: {
    width() {
      return {
        "w-50": this.$vuetify.display.mdAndUp,
        "w-75": this.$vuetify.display.smAndDown,
      };
    },
    actionSize() {
      return this.$vuetify.display.smAndDown ? "small" : "large";
    },
  },
};
</script>

<template>
  <lottie-player
    v-if="loading"
    style="
      width: 300px;
      position: fixed;
      top: 0%;
      right: 50%;
      transform: translateX(55%);
      z-index: 1;
    "
    src="https://assets9.lottiefiles.com/private_files/lf30_ykdoon9j.json"
    background="transparent"
    speed="1"
    loop
    autoplay
  ></lottie-player>

  <v-sheet
    v-else-if="toDoList.length == 0"
    position="relative"
    location="center"
    align="center"
  >
    <p class="font-italic text-grey-darken-1">No To Do's yet, create one!</p>
  </v-sheet>

  <v-sheet v-else align="center">
    <v-card
      class="my-4 pa-sm-4 pr-sm-6"
      :class="width"
      color="#01f6a8"
      align="left"
      v-for="toDo in toDoList"
      :key="toDo.id"
    >
      <v-list-item>
        <v-list-title>
          <router-link :to="`/dashboard/list-detail/${toDo.id}`">
            <v-card-title class="text-grey-darken-4 pr-0">{{
              toDo.title
            }}</v-card-title>
          </router-link>
        </v-list-title>
        <template v-slot:append>
          <v-icon
            class="mdi mdi-delete"
            :size="actionSize"
            @click="startRemove(toDo)"
          ></v-icon>
          <v-icon
            class="mdi mdi-pencil"
            :size="actionSize"
            @click="startUpdate(toDo)"
          ></v-icon>
        </template>
      </v-list-item>
    </v-card>
  </v-sheet>

  <create-modal
    :showCreate="showCreate"
    @close="showCreate = false"
    @save="createList"
  />

  <remove-modal
    :showRemove="showRemove"
    :selectedTitle="selectedTitle"
    @close="showRemove = false"
    @remove="removeList"
  />

  <update-modal
    :showUpdate="showUpdate"
    :selectedTitle="selectedTitle"
    @close="showUpdate = false"
    @save="updateList"
  />

  <v-sheet
    color="transparent"
    class="ma-6"
    style="z-index: 20001"
    position="fixed"
    location="bottom"
  >
    <v-btn
      color="#01f6a8"
      icon="mdi-plus"
      size="x-large"
      @click="showCreate = !showCreate"
    >
      <v-icon color="grey-darken-4" size="x-large"> </v-icon
    ></v-btn>
  </v-sheet>
</template>
