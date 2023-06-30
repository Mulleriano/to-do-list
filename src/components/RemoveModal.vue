<script>
import loading from "@/mixins/loading";
export default {
  mixins: [loading],
  props: {
    showRemove: Boolean,
    selectedTitle: String,
  },
  data() {
    return {
      show: null,
      title: "",
    };
  },
  methods: {
    remove() {
      this.loadingRemove = true;
      this.$emit("remove", this.title);
      setTimeout(() => {
        this.loadingRemove = false;
      }, 1000);
    },
  },
  updated() {
    this.show = this.showRemove;
    this.title = this.selectedTitle;
  },
};
</script>

<template>
  <v-dialog width="400px" v-model="show" class="d-flex align-center">
    <v-card color="grey-darken-4" width="auto" class="pa-4 d-flex align-center">
      <v-card-title class="text-h5">Delete</v-card-title>
      <v-card-text>Are you shure you want to delete '{{ title }}'?</v-card-text>
      <v-card-actions>
        <v-btn @click="this.$emit('close')">Close</v-btn>
        <v-btn class="bg-error" :loading="loadingRemove" @click="remove"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
