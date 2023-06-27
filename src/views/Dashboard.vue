<script>
import ToDoList from "@/components/ToDoList.vue";
import { toDoListsApiMixin } from "@/api/toDoList";

export default {
  components: {
    ToDoList,
  },
  data() {
    return {
      loadingBtn: false,
      deleteTitle: false,
      editTitle: false,
      selectedToDo: null,
      listTitle: "",
      title: "",
      selected: "",
      toDoList: [],
    };
  },
  mixins: [toDoListsApiMixin],
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
      this.loadingBtn = true;
      try {
        const payload = {
          title: this.listTitle,
        };
        const { data } = await this.create(payload);
        this.toDoList.push(data);
      } catch (err) {
        console.log(err);
      } finally {
        this.listTitle = "";
        this.loadingBtn = false;
      }
    },

    async deleteList() {
        try {
          const payload = {
          title: this.title,
        };
        console.log(this.selected, payload);
        await this.delete(this.selected, payload);
        this.closeModal();
        this.getLists();
      } catch (err) {
        console.log(err);
      }
    },

    async saveEdit() {
      this.loadingBtn = true;
      try {
        this.editTitle = false;
        const payload = {
          title: this.title,
        };
        console.log(this.selected, payload)
        await this.edit(this.selected, payload);
        this.getLists();
      } 
      catch (err) {
        alert("Erro ao editar a lista");
      } finally {
        this.loadingBtn = false;
      }
    },
  
    openModal(toDo) {
      this.selectedToDo = toDo;
      this.selected = toDo.id
      this.deleteTitle = true;
    },

    closeModal() {
      this.deleteTitle = false;
    },

    startEdit(toDo) {
      this.editTitle = true;
      this.title = toDo.title;
      this.selected = toDo.id
    },

    stopEdit() {
      this.editTitle = false;
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>

<template>
  <div>
    <div v-for="toDo in toDoList" :key="toDo.id">
      <router-link :to="`/Dashboard/listdetail/${toDo.id}`">
        {{ toDo.title }}
      </router-link>
      <v-icon class="mdi mdi-delete" size="large" @click="openModal(toDo)"></v-icon>

      <v-icon class="mdi mdi-pencil" size="large" @click="startEdit(toDo)"></v-icon>
    </div>

    <div v-if="deleteTitle">
      <v-card>
        <v-card-title>Deletar Lista</v-card-title>
        <v-card-subtitle>Tem certeza que quer deletar a lista '{{ selectedToDo.title }}'?</v-card-subtitle>
        <v-btn @click="deleteList">Confirmar</v-btn>
        <v-btn @click="closeModal">Cancelar</v-btn>
      </v-card>
    </div>

    <div v-if="editTitle">
      <v-text-field v-model="title" outlined></v-text-field>
      <v-btn @click="saveEdit" :loading="loadingBtn">Salvar</v-btn>
      <v-btn @click="stopEdit">Cancelar</v-btn>
    </div>

    <v-form class="w-50">
      <v-text-field v-model="listTitle"></v-text-field>
      <v-btn @click="createList()" :loading="loadingBtn">Criar</v-btn>
    </v-form>
  </div>
</template>