export default {
  computed: {
    heightAuto() {
      return {
        "h-auto": this.$vuetify.display.smAndDown,
      };
    },
    widthClass() {
      return {
        "w-50": this.$vuetify.display.mdAndUp,
        "w-75": this.$vuetify.display.smAndDown,
      };
    },
    width() {
      return this.$vuetify.display.smAndDown ? "75%" : "50%";
    },
    actionSize() {
      return this.$vuetify.display.smAndDown ? "small" : "large";
    },
  },
};
