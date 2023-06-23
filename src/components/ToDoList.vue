<script>
export default {
  props: {
    toDoList: Array,
  },
};
</script>
<template>
  <div v-for="toDo in toDoList" :key="toDo.id">
    {{ toDo.title }}
  </div>
</template>
