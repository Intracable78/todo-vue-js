<script>
import Task from "./Task.vue";
export default {
  components: {
    Task,
  },
  data() {
    return {
      categories: [
        { id: 1, name: "Category1", color: "#z66465" },
        { id: 2, name: "Category2", color: "#a66465" },
        { id: 3, name: "Category3", color: "#e66465" },
      ],
    };
  },
  methods: {
    createCategory() {
      //  console.log(this.categories);
      if (this.categories.name.length === 0) return;
      this.categories.push({
        id: this.categories.length + 1,
        name: this.categories.name,
      });
    },
  },
};
</script>
<template>
  <div class="container">
    <h2 class="text-center mt-5">My todo App</h2>
    <div class="d-flex">
      <input
        v-model="categories.name"
        type="text"
        placeholder="Create an category"
        class="form-control"
      />
      <input type="color" id="head" name="head" value="#e66465" />
      <label for="head">Head</label>
      <button class="btn btn-primary" @click="createCategory" type="submit">
        Create
      </button>
    </div>
    <Task :categories="categories" />
  </div>
</template>

<style>
</style>