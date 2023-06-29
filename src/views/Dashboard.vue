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
        this.alert.title = "Lista criada com sucesso";
        this.$emit("showAlert", this.alert);
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
        this.alert.title = "Lista excluída com sucesso";
        this.$emit("showAlert", this.alert);
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
      } catch (err) {
        alert("Erro ao editar a lista");
      } finally {
        this.loadingBtn = false;
      }
    },

    openModal(toDo) {
      this.selectedToDo = toDo;
      this.selected = toDo.id;
      this.removeTitle = true;
    },

    closeModal() {
      this.removeTitle = false;
    },

    startEdit(toDo) {
      this.updateTitle = true;
      this.title = toDo.title;
      this.selected = toDo.id;
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
    <v-form class="my-6 d-flex flex-column align-center">
      <v-text-field
        class="w-25 bg-white"
        v-model="listTitle"
        label="Create List"
        placeholder="List Title"
        variant="underlined"
      ></v-text-field>
      <v-btn
        color="#01f6a8"
        :disabled="listTitle === ''"
        @click="createList()"
        :loading="loadingBtn"
        >Create</v-btn
      >
    </v-form>

    <v-card
      color="#01f6a8"
      class="mx-auto w-50 my-4 py-4 pr-4"
      v-for="toDo in toDoList"
      :key="toDo.id"
    >
      <v-list-item>
        <router-link :to="`/Dashboard/listdetail/${toDo.id}`">
          <v-card-title class="text-grey-darken-4">{{
            toDo.title
          }}</v-card-title>
        </router-link>
        <template v-slot:append>
          <v-icon
            color="grey-darken-4"
            class="mdi mdi-delete"
            size="large"
            @click="openModal(toDo)"
          ></v-icon>
          <v-icon
            class="mdi mdi-pencil"
            size="large"
            @click="startEdit(toDo)"
          ></v-icon>
        </template>
      </v-list-item>
    </v-card>

    <div v-if="removeTitle">
      <v-card>
        <v-card-title>Deletar Lista</v-card-title>
        <v-card-subtitle
          >Tem certeza que quer deletar a lista '{{
            selectedToDo.title
          }}'?</v-card-subtitle
        >
        <v-btn @click="closeModal">Cancelar</v-btn>
        <v-btn @click="removeList">Deletar</v-btn>
      </v-card>
    </div>

    <div class="modal w-100 h-100 mt-0" v-if="updateTitle">
      <v-card class="w-50 mx-auto">
        <v-card-title>Editar</v-card-title>
        <v-text-field
          class="pa-4"
          v-model="title"
          variant="underlined"
        ></v-text-field>
        <v-btn @click="stopEdit">Cancelar</v-btn>
        <v-btn @click="saveEdit" :loading="loadingBtn">Salvar</v-btn>
      </v-card>
    </div>
  </div>
</template>

<style></style>
