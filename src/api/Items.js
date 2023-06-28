import { privateApi } from "./index";

export const itemsApiMixin = {
  methods: {
    async createItem(item) {
      return await privateApi.post("/items/new", item);
    },
    async removeItem(id) {
      return await privateApi.delete(`/items/${id}`)
    },
    async updateItem(id, payload) {
      return await privateApi.patch(`/items/${id}`, payload);
    },
  }, 
};