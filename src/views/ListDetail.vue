<script>
import { toDoListsApiMixin } from "@/api/toDoList";
import { itemsApiMixin } from "@/api/Items";

export default {
    mixins: [toDoListsApiMixin,
            itemsApiMixin],
    data() {
        return{
            itemTitle: "",
            items: [],
            listTitle: "",
            listId: this.$route.params.id
        }
    },
    methods: {
        async showList() {
            try{
                const { data } = await this.view(this.listId);
                this.items = data.items;
                this.listTitle = data.title;
            }catch(err) {
                console.log(err)
            }
        },
        async handleCreate() {
            try {
                this.loading = true;
                 const item = {
                title: this.itemTitle,
                deadline: "2012-01-26T13:51:50.417-07:00",
                listId: this.listId,};
                const { data } = await this.createItem(item);
                this.items.push(data);
                } catch (err) {
                    console.log(err);
                } finally {
                    this.itemTitle = "";
                    this.loading = false;
                }
        }
    },
    mounted() {
        this.showList()
    }
}
</script>



<template>
    {{ listTitle }}
    <div v-for="item in items" :key="item.id"> 
        <h3>{{ item.title }}</h3>
    </div>

    <v-form @submit.prevent="handleCreate" class="w-50">
    <v-text-field
    v-model = "itemTitle">
    </v-text-field>
    <v-btn @click="handleCreate">
      Criar
    </v-btn>
  </v-form>
</template>