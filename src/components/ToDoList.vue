<script>
export default {
  data(){
    return {
      title: [],
    }
  },
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
