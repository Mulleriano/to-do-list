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
      showRemove: false,
      showUpdate: false,
      listTitle: "",
      updateTitle: "",
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
          title: this.listTitle,
        };
        const { data } = await this.create(title);
        this.toDoList.push(data);
        this.createAlert();
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.listTitle = "";
        this.loadingCreate = false;
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
  <v-form @submit.prevent="createList" class="w-50">
    <v-text-field
      v-model="listTitle"
      placeholder="Título da lista"
    ></v-text-field>
    <v-btn
      :disabled="listTitle === ''"
      @click="createList()"
      :loading="loadingCreate"
      >Criar</v-btn
    >
  </v-form>

  <v-card v-for="toDo in toDoList" :key="toDo.id">
    <v-list-item>
      <v-list-title>
        <router-link :to="`/Dashboard/listdetail/${toDo.id}`">
          {{ toDo.title }}
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

  <v-card v-show="showRemove">
    <v-card>
      <v-card-title>Delete</v-card-title>
      <v-card-text>Are you shure you want to delete?</v-card-text>
      <v-card-actions>
        <v-btn @click="showRemove = !showRemove">Close</v-btn>
        <v-btn
          :loading="loadingRemove"
          color="error"
          @click="removeList(selectedId)"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-card>

  <v-card v-show="showUpdate">
    <v-card-title>Edit</v-card-title>
    <v-text-field v-model="updateTitle" outlined></v-text-field>
    <v-card-actions>
      <v-btn @click="showUpdate = !showUpdate">close</v-btn>
      <v-btn
        color="success"
        @click="updateList(selectedId)"
        :loading="loadingUpdate"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
