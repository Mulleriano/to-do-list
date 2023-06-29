<script>
import { toDoListsApiMixin } from "@/api/toDoList";
import { itemsApiMixin } from "@/api/Items";
import handleAlertMixin from "@/mixins/handleAlert";
import loadingMixin from "@/mixins/loading";

export default {
  mixins: [toDoListsApiMixin, itemsApiMixin, handleAlertMixin, loadingMixin],
  data() {
    return {
      items: [],
      listTitle: "",
      listId: this.$route.params.id,
      showRemove: false,
      showUpdate: false,
      createTitle: "",
      updateTitle: "",
      selectedId: null,
    };
  },
  methods: {
    async showList() {
      try {
        const { data } = await this.view(this.listId);
        this.items = data.items;
        this.listTitle = data.title;
      } catch (err) {
        console.log(err);
      }
    },

    async handleCreate() {
      try {
        this.loadingCreate = true;
        const item = {
          title: this.createTitle,
          deadline: "2012-01-26T13:51:50.417-07:00",
          listId: this.listId,
        };
        const { data } = await this.createItem(item);
        this.items.push(data);
        this.createAlert();
      } catch (err) {
        console.log(err);
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.createTitle = "";
        this.loadingCreate = false;
      }
    },

    async handleRemove(id) {
      try {
        this.loadingRemove = true;
        await this.removeItem(id);
        this.items = this.items.filter((item) => item.id !== id);
        this.showList();
        this.deleteAlert();
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.loadingRemove = false;
        this.showRemove = false;
      }
    },

    async handleUpdate(id) {
      try {
        this.loadingUpdate = true;
        const title = {
          title: this.updateTitle,
        };
        await this.updateItem(id, title);
        this.showList();
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.loadingUpdate = false;
        this.showUpdate = false;
      }
    },

    async handleStatus(item) {
      try {
        let payload = {
          done: item.done,
        };
        await this.updateItem(item.id, payload);
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      }
    },
    startRemove(item) {
      this.showRemove = true;
      this.selectedId = item.id;
    },
    startUpdate(item) {
      this.showUpdate = true;
      this.updateTitle = item.title;
      this.selectedId = item.id;
    },
  },
  mounted() {
    this.showList();
  },
};
</script>

<template>
  <h2>{{ listTitle }}</h2>
  <v-form class="w-50" @submit.prevent="handleCreate">
    <v-text-field
      v-model="createTitle"
      type="text"
      placeholder="Título do item"
    ></v-text-field>
  </v-form>
  <v-btn
    :disabled="createTitle === ''"
    @click="handleCreate"
    :loading="loadingCreate"
    >Criar</v-btn
  >

  <v-card v-for="item in items" :key="item.id">
    <v-list-item>
      <template v-slot:prepend>
        <v-checkbox-btn
          v-model="item.done"
          @change="handleStatus(item)"
          color="grey"
        ></v-checkbox-btn>
      </template>

      <v-list-item-title>
        <span :class="item.done ? 'text-grey' : 'text-primary'">
          {{ item.title }}
        </span>

        <v-icon
          size="large"
          class="mdi mdi-delete"
          @click="startRemove(item)"
        ></v-icon>
        <v-icon
          size="large"
          class="mdi mdi-pencil"
          @click="startUpdate(item)"
        ></v-icon>
      </v-list-item-title>

      <template v-slot:append>
        <v-expand-x-transition>
          <v-icon v-if="item.done" color="success">mdi-check</v-icon>
        </v-expand-x-transition>
      </template>
    </v-list-item>
  </v-card>

  <v-card v-show="showUpdate">
    <v-card-title>Edit</v-card-title>
    <v-form @submit.prevent="handleUpdate(selectedId)">
      <v-text-field v-model="updateTitle" outlined></v-text-field>
    </v-form>
    <v-card-actions>
      <v-btn @click="showUpdate = !showUpdate">Close</v-btn>
      <v-btn
        :loading="loadingUpdate"
        color="success"
        @click="handleUpdate(selectedId)"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>

  <v-card v-show="showRemove">
    <v-card-title>Delete</v-card-title>
    <v-card-text>Are you shure you want to delete this item?</v-card-text>
    <v-card-actions>
      <v-btn @click="showRemove = !showRemove">Close</v-btn>
      <v-btn
        @click="handleRemove(selectedId)"
        color="error"
        :loading="loadingRemove"
        >Delete</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
