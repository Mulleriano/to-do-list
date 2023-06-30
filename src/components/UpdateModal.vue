<script>
import loading from "@/mixins/loading";
export default {
  mixins: [loading],
  props: {
    showUpdate: Boolean,
    selectedTitle: String,
  },
  data() {
    return {
      show: null,
      title: "",
    };
  },
  methods: {
    save() {
      this.loadingUpdate = true;
      this.$emit("save", this.title);
      setTimeout(() => {
        this.loadingUpdate = false;
      }, 1000);
    },
  },
  updated() {
    this.show = this.showUpdate;
    this.title = this.selectedTitle;
  },
};
</script>
<template>
  <v-dialog width="400px" class="d-flex align-center" v-model="show">
    <v-card color="grey-darken-4" width="auto" class="pa-4 d-flex align-center">
      <v-card-title class="text-h5 py-4">Edit</v-card-title>
      <v-form @submit.prevent="save">
        <v-text-field
          class="w-100"
          v-model="title"
          variant="underlined"
        ></v-text-field>
        <v-card-actions>
          <v-btn @click="this.$emit('close')">close</v-btn>
          <v-btn
            class="bg-green-accent-2"
            @click="save"
            :loading="loadingUpdate"
            >Save</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
