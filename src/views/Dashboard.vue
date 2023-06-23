<script>
import ToDoList from "@/components/ToDoList.vue";
import { toDoListsApiMixin } from "@/api/toDoList";

export default {
  components: {
    ToDoList,
  },
  data() {
    return {
      listTitle: "",
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
      try {
        const title = {
        title: this.listTitle
      }
        const { data } = await this.create(title);
        this.toDoList.push(data);
      } catch (err) {
        console.log(err);
      } finally {
        this.listTitle = "";
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>

<template>
  <to-do-list :toDoList="toDoList" />

  <v-form @submit.prevent="createList">
    <v-text-field
    v-model = "listTitle">
    </v-text-field>
    <v-btn @click="createList">
      Criar
    </v-btn>
  </v-form>
</template>
