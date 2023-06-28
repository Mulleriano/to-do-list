<script>
import { toDoListsApiMixin } from "@/api/toDoList";
import { itemsApiMixin } from "@/api/Items";

export default {
  mixins: [toDoListsApiMixin, itemsApiMixin],
  data() {
    return {
    listId: this.$route.params.id,
    itemId: null, 
    deleteObj: false,
    loadingBtn: false,
    editItems: false,
    itemTitle: "",
    items: [],
    editedItem: {title: ""}
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
      this.loadingBtn = true;
      try {
        const item = {
          title: this.itemTitle,
          deadline: "2012-01-26T13:51:50.417-07:00",
          listId: this.listId,
        };
        const { data } = await this.createItem(item);
        this.items.push(data);
      } catch (err) {
        console.log(err);
      } finally {
        this.itemTitle = "";
        this.loadingBtn = false;
      }
    },

    async handleDelete(id) {
        this.loadingBtn = true;
      try {
        const { data } = await this.deleteItem(id);
        this.items = this.items.filter((item) => item.id !== id);
        this.showList();
      } catch (err) {
        console.log(err);
      } finally {
        this.loadingBtn = false;
        this.closemodalDelete(); 
      }
    },
    
    async saveeditItem() {
    try {
        this.editItems = false;
        const payload = {
        title: this.editedItem.title,
        };
    
        await this.editItem(this.id, payload);
        this.showList();
    } catch (err) {
        console.log(err)
    }
    },

    async updateItemStatus(item) {
      try {
        let payload = {
          done: item.done,
        };
        await this.updateItem(item.id, payload);
      } catch (err) {
        console.log(err);
      }
    },

    starteditItem(item) {
    this.editedItem = { ...item }; // faz uma cópia independente
    this.editItems = true;
    this.id = item.id;
    },

    stopeditItem() {
      this.editItems = false;
    },
    openmodalDelete(itemId) {
        this.selectedToDo = itemId;
      this.itemId = itemId; 
      this.deleteObj = true;
    },
    closemodalDelete() {
      this.deleteObj = false;
    },
  },
  mounted() {
    this.showList();
  },
};
</script>

<template>
  <v-form class="w-50">
    <v-text-field v-model="itemTitle" type="text" placeholder="Título do item"></v-text-field>
    <v-btn @click="handleCreate" :loading="loadingBtn">Criar</v-btn>

    <v-card v-for="item in items" :key="item.id">
      <v-list-item @click="item.done = !item.done">
        <template v-slot:prepend>
          <v-checkbox-btn v-model="item.done" @change="updateItemStatus(item)" color="grey"></v-checkbox-btn>
         
        </template>

        <v-list-item-title>
          <span :class="item.done ? 'text-grey' : 'text-primary'">
            {{ item.title }}
          </span>

          <v-icon size="large" class="mdi mdi-delete" @click="openmodalDelete(item.id)"></v-icon>
          <v-icon size="large" class="mdi mdi-pencil" @click="starteditItem(item)"></v-icon>
        </v-list-item-title>

        <template v-slot:append>
          <v-expand-x-transition>
            <v-icon v-if="item.done" color="success">mdi-check</v-icon>
          </v-expand-x-transition>
        </template>
      </v-list-item>
    </v-card>

    <div v-if="editItems">
      <v-text-field v-model="editedItem.title" outlined></v-text-field>
      <v-btn @click="saveeditItem">Salvar</v-btn>
      <v-btn @click="stopeditItem">Cancelar</v-btn>
    </div>

    <div v-if="deleteObj">
      <v-card>
        <v-card-title>Deletar Item</v-card-title>
        <v-card-subtitle>Tem certeza que quer deletar esse item?</v-card-subtitle>
        <v-btn @click="handleDelete(itemId)" :loading="loadingBtn">Confirmar</v-btn>
        <v-btn @click="closemodalDelete">Cancelar</v-btn>
      </v-card>
    </div>
    </v-form>
</template>

