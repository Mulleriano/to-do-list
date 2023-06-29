export default {
  data() {
    return {
      alert: {
        type: "success",
        color: "#01f6a8",
      },
    };
  },
  methods: {
    createAlert() {
      this.alert.title = "Created successfully!";
      this.emitAlertEvent();
    },
    deleteAlert() {
      this.alert.title = "Deleted successfully!";
      this.emitAlertEvent();
    },
    errorAlert(message) {
      this.alert.type = "error";
      this.alert.color = "error";
      this.alert.title = `${message}`;
      this.alert.text = "Sorry for the inconvinent";
      this.emitAlertEvent();
    },
    emitAlertEvent() {
      this.$emit("showAlert", this.alert);
    },
  },
};
