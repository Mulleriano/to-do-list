<script>
import ToDo from "@/components/ToDo.vue";
import { toDoListsApiMixin } from "@/api/toDoList";

export default {
  mixins: [toDoListsApiMixin],
  methods: {
    async getLists() {
      try {
        const { data } = await this.list();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getLists();
  },
};
</script>

<template>
  <to-do />
</template>
