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
};
</script>

<template>
  <v-sheet
    v-show="loading"
    style="transform: translate(-25%, -60%); z-index: 1"
    position="absolute"
    location="center"
  >
    <lottie-player
      src="https://assets8.lottiefiles.com/packages/lf20_poqmycwy.json"
      background="transparent"
      speed="1.5"
      style="width: 60%"
      loop
      autoplay
    ></lottie-player>
  </v-sheet>

  <v-sheet
    v-if="toDoList.length == 0"
    position="fixed"
    location="center"
    align="center"
  >
    <p class="font-italic text-grey-darken-1">No To Do's yet, create one!</p>
  </v-sheet>

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

  <v-sheet align="center">
    <v-card
      class="w-50 my-4 pa-4 pr-6"
      color="#01f6a8"
      align="left"
      v-for="toDo in toDoList"
      :key="toDo.id"
    >
      <v-list-item>
        <v-list-title>
          <router-link :to="`/Dashboard/listdetail/${toDo.id}`">
            <v-card-title class="text-grey-darken-4">{{
              toDo.title
            }}</v-card-title>
          </router-link>
        </v-list-title>
        <template v-slot:append>
          <v-icon
            class="mdi mdi-delete"
            size="large"
            @click="startRemove(toDo)"
          ></v-icon>
          <v-icon
            class="mdi mdi-pencil"
            size="large"
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
</template>
