import { api } from "./index";

export const authAPiMixin = {
  methods: {
    async register(payload) {
      const res = await api.post("/auth/register", payload);
      return res;
    },
  },
};
