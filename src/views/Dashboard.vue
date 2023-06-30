<script>
import ToDoList from "@/components/ToDoList.vue";
import { toDoListsApiMixin } from "@/api/toDoList";
import handleAlertMixin from "@/mixins/handleAlert";
import loadingMixin from "@/mixins/loading";

export default {
  components: {
    ToDoList,
  },
  data() {
    return {
      showCreate: false,
      showRemove: false,
      showUpdate: false,
      createTitle: "",
      updateTitle: "",
      selectedTitle: "",
      selectedId: "",
      toDoList: [],
    };
  },
  mixins: [toDoListsApiMixin, handleAlertMixin, loadingMixin],
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        this.toDoList = data;
      } catch (err) {
        console.log(err);
      }
    },

    async createList() {
      try {
        this.loadingCreate = true;
        const title = {
          title: this.createTitle,
        };
        const { data } = await this.create(title);
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
    async removeList(id) {
      try {
        this.loadingRemove = true;
        await this.remove(id);
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

    async updateList(id) {
      try {
        this.loadingUpdate = true;
        const title = {
          title: this.updateTitle,
        };
        await this.update(id, title);
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
      this.updateTitle = toDo.title;
      this.selectedId = toDo.id;
      if (this.showRemove) this.showRemove = false;
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>

<template>
  <v-dialog class="w-50 d-flex align-center" v-model="showCreate">
    <v-card color="grey-darken-4" width="auto" class="pa-6 d-flex align-center">
      <v-card-title class="py-4 text-h5">Create List</v-card-title>
      <v-form @submit.prevent="createList">
        <v-text-field
          v-model="createTitle"
          label="List title"
          variant="underlined"
          clearable
        ></v-text-field>
        <v-card-actions>
          <v-btn @click="showCreate = !showCreate">Close</v-btn>
          <v-btn
            class="bg-green-accent-2"
            :disabled="createTitle === ''"
            @click="createList()"
            :loading="loadingCreate"
            >Create</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>

  <v-sheet
    color="transparent"
    class="mb-6"
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

  <v-dialog v-model="showRemove" class="w-50 d-flex align-center">
    <v-card color="grey-darken-4" width="auto" class="pa-6 d-flex align-center">
      <v-card-title class="text-h5">Delete</v-card-title>
      <v-card-text
        >Are you shure you want to delete '{{ selectedTitle }}'?</v-card-text
      >
      <v-card-actions>
        <v-btn @click="showRemove = !showRemove">Close</v-btn>
        <v-btn
          class="bg-error"
          :loading="loadingRemove"
          @click="removeList(selectedId)"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog class="w-50 d-flex align-center" v-model="showUpdate">
    <v-card color="grey-darken-4" width="auto" class="pa-6 d-flex align-center">
      <v-card-title class="text-h5 py-4">Edit</v-card-title>
      <v-form @submit.prevent="updateList(selectedId)">
        <v-text-field
          class="w-100"
          v-model="updateTitle"
          variant="underlined"
        ></v-text-field>
        <v-card-actions>
          <v-btn @click="showUpdate = !showUpdate">close</v-btn>
          <v-btn
            class="bg-green-accent-2"
            @click="updateList(selectedId)"
            :loading="loadingUpdate"
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
