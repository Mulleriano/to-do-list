import { privateApi } from "./index";

export const itemsApiMixin = {
  methods: {
    async createItem(item) {
      return await privateApi.post("/items/new", item);
    },
    async deleteItem(id) {
      return await privateApi.delete(`/items/${id}`)
    },
    async editItem(id, payload) {
      return await privateApi.patch(`/items/${id}`, payload)
    },
    async updateItem(id, payload) {
      return await privateApi.patch(`/items/${id}`, payload);
    },
  }, 
};