import { privateApi } from "./index";

export const itemsApiMixin = {
  methods: {
    async createItem(item) {
      return await privateApi.post("/items/new", item);
    },
  }, 
};