import { privateApi } from "./index";

export const userMixin = {
  methods: {
    async userInfo() {
      return await privateApi.get("/users/me");
    },
  },
};
