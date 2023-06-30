<script>
import { toDoListsApiMixin } from "@/api/toDoList";
import { toDoItemsApiMixin } from "@/api/toDoItems";
import handleAlertMixin from "@/mixins/handleAlert";
import loadingMixin from "@/mixins/loading";
import CreateModal from "@/components/CreateModal.vue";

import UpdateModal from "@/components/UpdateModal.vue";
export default {
  components: { CreateModal, UpdateModal },
  mixins: [
    toDoListsApiMixin,
    toDoItemsApiMixin,
    handleAlertMixin,
    loadingMixin,
  ],
  data() {
    return {
      items: [],
      listTitle: "",
      listId: this.$route.params.id,
      showCreate: false,
      showRemove: false,
      showUpdate: false,
      createTitle: "",
      selectedTitle: "",
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
    async handleCreate(title) {
      try {
        const item = {
          title: title,
          deadline: "2012-01-26T13:51:50.417-07:00",
          listId: this.listId,
        };
        const { data } = await this.createItem(item);
        this.items.push(data);
        this.createAlert();
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.createTitle = "";
        this.showCreate = false;
      }
    },
    async handleRemove(id) {
      try {
        await this.removeItem(id);
        this.showList();
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
        this.showRemove = false;
      }
    },
    async handleUpdate(title) {
      try {
        const payload = {
          title: title,
        };
        await this.updateItem(this.selectedId, payload);
        this.showList();
      } catch (err) {
        const message = err.message;
        this.errorAlert(message);
      } finally {
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
    startUpdate(item) {
      this.showUpdate = true;
      this.selectedTitle = item.title;
      this.selectedId = item.id;
      if (this.showRemove) this.showRemove = false;
    },
  },
  mounted() {
    this.showList();
  },
};
</script>

<template>
  <v-sheet
    v-if="items.length == 0"
    position="fixed"
    location="center"
    align="center"
  >
    <p class="font-italic text-grey-darken-1">No Tasks yet, create one!</p>
  </v-sheet>

  <v-sheet
    color="transparent"
    class="ma-6"
    style="z-index: 20001"
    position="fixed"
    location="left-top"
  >
    <v-btn
      color="#01f6a8"
      icon="mdi-arrow-left"
      size="large"
      @click="this.$router.push('/dashboard')"
    >
      <v-icon color="grey-darken-4" size="x-large"> </v-icon
    ></v-btn>
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

  <v-sheet class="ma-4" align="center">
    <h2 class="text-grey-darken-4">
      {{ listTitle.toUpperCase() }}
    </h2>
  </v-sheet>

  <v-card color="grey-darken-4" class="w-50 mx-auto">
    <v-list-item v-for="item in items" :key="item.id">
      <template v-slot:prepend>
        <v-checkbox-btn
          v-model="item.done"
          @change="handleStatus(item)"
          color="#01f6a8"
        ></v-checkbox-btn>
      </template>

      <v-list-item-title>
        <span
          style="color: #01f6a8"
          :class="['font-weight-medium', item.done ? 'text-grey' : '']"
        >
          {{ item.title }}
        </span>
      </v-list-item-title>
      <template v-slot:append>
        <v-expand-x-transition>
          <v-icon v-if="item.done" color="green-accent-3">mdi-check</v-icon>
        </v-expand-x-transition>
        <v-btn :loading="loadingRemove" color="transparent" class="elevation-0">
          <v-icon color="#01f6a8" size="large" @click="handleRemove(item.id)">
            mdi-delete
          </v-icon>
        </v-btn>
        <v-btn color="transparent" class="elevation-0">
          <v-icon color="#01f6a8" size="large" @click="startUpdate(item)">
            mdi-pencil
          </v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-card>

  <create-modal
    :showCreate="showCreate"
    @close="showCreate = false"
    @save="handleCreate"
  />

  <update-modal
    :showUpdate="showUpdate"
    :selectedTitle="selectedTitle"
    @close="showUpdate = false"
    @save="handleUpdate"
  />
</template>
