<script>
import loading from "@/mixins/loading";
export default {
  mixins: [loading],
  props: {
    showCreate: Boolean,
  },
  data() {
    return {
      show: null,
      title: "",
    };
  },
  methods: {
    save() {
      this.loadingCreate = true;
      this.$emit("save", this.title);
      setTimeout(() => {
        this.loadingCreate = false;
        this.title = "";
      }, 1000);
    },
  },
  updated() {
    this.show = this.showCreate;
  },
};
</script>

<template>
  <v-dialog width="400px" class="d-flex align-center" v-model="show">
    <v-card color="grey-darken-4" width="auto" class="pa-4 d-flex align-center">
      <v-card-title class="py-4 text-h5">Create List</v-card-title>
      <v-form @submit.prevent="save">
        <v-text-field
          v-model="title"
          label="List title"
          variant="underlined"
          clearable
        ></v-text-field>
        <v-card-actions>
          <v-btn @click="this.$emit('close')">Close</v-btn>
          <v-btn
            class="bg-green-accent-2"
            :disabled="title === ''"
            @click="save"
            :loading="loadingCreate"
            >Create</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
