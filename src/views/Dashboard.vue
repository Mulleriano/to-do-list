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
      removeTitle: false,
      updateTitle: false,
      selectedToDo: null,
      listTitle: "",
      title: "",
      selected: "",
      toDoList: [],
      alert: {
        type: "success",
        color: "#01f6a8",
        title: "Lista criada com sucesso!",
      },
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
        this.alert.title = "Lista criada com sucesso"
        this.$emit("showAlert", this.alert)
      } catch (err) {
        const status = err.response.status;
        if (status >= 500 && status < 600) {
          this.alert.type = "error";
          this.alert.color = "error";
          this.alert.title = "Ocorreu um erro no servidor";
          this.alert.text = "Pedimos desculpa pelo inconveniente";
          this.$emit("showAlert", this.alert);
        } else {
          this.alert.type = "error";
          this.alert.color = "error";
          this.alert.title = "Algo deu errado :(";
          this.alert.text = "Pedimos desculpa pelo inconveniente";
          this.$emit("showAlert", this.alert);
        }
      } finally {
        this.listTitle = "";
        this.loadingBtn = false;
      }
    },

    async removeList() {
        try {
        await this.remove(this.selected);
        this.alert.title = "Lista excluída com sucesso"
        this.$emit("showAlert", this.alert)
        this.closeModal();
        this.getLists();
      } catch (err) {
        const status = err.response.status;
        if (status >= 500 && status < 600) {
          this.alert.type = "error";
          this.alert.color = "error";
          this.alert.title = "Ocorreu um erro no servidor";
          this.alert.text = "Pedimos desculpa pelo inconveniente";
          this.$emit("showAlert", this.alert);
        } else {
          this.alert.type = "error";
          this.alert.color = "error";
          this.alert.title = "Algo deu errado :(";
          this.alert.text = "Pedimos desculpa pelo inconveniente";
          this.$emit("showAlert", this.alert);
        }
      }
    },

    async saveEdit() {
      this.loadingBtn = true;
      try {
        this.updateTitle = false;
        const payload = {
          title: this.title,
        };
        await this.update(this.selected, payload);
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
      this.removeTitle = true;
    },

    closeModal() {
      this.removeTitle = false;
    },

    startEdit(toDo) {
      this.updateTitle = true;
      this.title = toDo.title;
      this.selected = toDo.id
    },

    stopEdit() {
      this.updateTitle = false;
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

    <div v-if="removeTitle">
      <v-card>
        <v-card-title>Deletar Lista</v-card-title>
        <v-card-subtitle>Tem certeza que quer deletar a lista '{{ selectedToDo.title }}'?</v-card-subtitle>
        <v-btn @click="closeModal">Cancelar</v-btn>
        <v-btn @click="removeList">Deletar</v-btn>
      </v-card>
    </div>

    <div v-if="updateTitle">
      <v-text-field v-model="title" outlined></v-text-field>
      <v-btn @click="stopEdit">Cancelar</v-btn>
      <v-btn @click="saveEdit" :loading="loadingBtn">Salvar</v-btn>
    </div>

    <v-form class="w-50">
      <v-text-field v-model="listTitle" placeholder="Título da lista"></v-text-field>
      <v-btn :disabled="listTitle === ''" @click="createList()" :loading="loadingBtn">Criar</v-btn>
    </v-form>
  </div>
</template>