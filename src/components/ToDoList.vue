<script>
import { toDoListsApiMixin } from "@/api/toDoList";
export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      title: [],
    };
  },
  props: {
    toDoList: Array,
  },
  methods: {
    async deleteList(ListId) {
      console.log(ListId);
      try {
        const { data } = await this.delete(ListId);
        this.toDoList = this.toDoList.filter(
          (toDoList) => this.toDoList.id !== ListId
        );
        console.log(`Item com ID ${ListId} excluído com sucesso.`);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <div v-for="toDo in toDoList" :key="toDo.id">
    <router-link :to="`/Dashboard/listdetail/${toDo.id}`">
      {{ toDo.title }}
    </router-link>
    <span class="mdi mdi-delete" @click.once="deleteList(toDo.id)"></span>
  </div>
</template>
