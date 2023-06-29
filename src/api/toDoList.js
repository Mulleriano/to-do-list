import { privateApi } from "./index";

export const toDoListsApiMixin = {
  methods: {
    async list() {
      return await privateApi.get("/lists");
    },
    async create(title) {
      return await privateApi.post("/lists/new", title);
    },
    async view(ListId) {
      return await privateApi.get(`/lists/${ListId}`);
    },
    async remove(ListId) {
      return await privateApi.delete(`/lists/${ListId}`);
    },
    async update(ListId, title) {
      return await privateApi.patch(`/lists/${ListId}`, title);
    },
  },
};
