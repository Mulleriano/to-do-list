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
   <router-link :to="`/Dashboard/listdetail/${toDo.id}`">
    {{ toDo.title }}
   </router-link> 
  </div>

</template>
