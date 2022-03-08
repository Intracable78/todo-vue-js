<template>
  <div>
    <div>
      <h2 class="mt-5">Tasks Filter - {{ filteredTasks.length }}</h2>
      <select
        class="form-select"
        aria-label="Default select example"
        v-model="selected"
      >
        <option disabled selected>Select filter</option>
        <option value="all">All</option>
        <option value="in progress">in progress</option>
        <option value="completed">completed</option>
      </select>
    </div>
    <div v-for="(task, i) in filteredTasks" :key="i">
      <h3>{{ task.name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tasks"],
  methods: {},

  computed: {
    filteredTasks: function () {
      switch (this.selected) {
        case "all":
          return this.tasks;
        default:
          return this.tasks.filter((x) => x.state === this.selected);
      }
    },
  },

  data() {
    return {
      selected: "all",
    };
  },
};
</script>


<style>
</style>