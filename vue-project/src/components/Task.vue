<template>
  <div>
    <div
      class="mt-5"
      v-for="(taskCategory, index) in categoriesTasks"
      :key="index"
    >
      <h2 v-bind:style="{ color: taskCategory.categoryColor }">
        {{ taskCategory.categoryName }}
      </h2>
      <div v-if="taskCategory.tasks.length === 0">Aucune tâche</div>
      <div class="d-flex" v-for="(task, i) in taskCategory.tasks" :key="i">
        <div class="d-flex justify-content-between" v-if="task.name">
          {{ task.name }} - {{ task.state }}
          <p v-if="task.priority === '1'">-Basse priorité</p>
          <p v-if="task.priority === '2'">-Moyenne priorité</p>
          <p v-if="task.priority === '3'">-Haute priorité</p>
          <div
            style="background-color: red"
            v-if="task.dueDate.getTime() < new Date()"
          >
            en retard
          </div>

          <input
            v-model="taskName"
            type="text"
            placeholder="Update task in the category"
          />
          <button
            class="btn btn-primary"
            @click="updateTask(task.id)"
            type="submit"
          >
            Update
          </button>
          <button @click="deleteTask(task.id)" class="btn btn-danger">
            Delete
          </button>
          <button @click="updateStateTask(task.id)" class="btn btn-info">
            Change state
          </button>
          <button @click="updatePriorityTask(task.id)" class="btn btn-warning">
            Change priority
          </button>
          <select
            aria-label="Default select example"
            @change="updatePriorityTask($event, task.id)"
          >
            <option disabled selected>Select priority</option>
            <option value="1">low</option>
            <option value="2">medium</option>
            <option value="3">high</option>
          </select>
        </div>
      </div>
      <div class="d-flex">
        <input
          v-model="task"
          style="width: 20%"
          type="text"
          placeholder="Create an task in the category"
          class="form-control col-md-6"
        />
        <input
          v-model="taskDate"
          style="width: 20%"
          type="date"
          placeholder="Create an task in the category"
          class="form-control col-md-6"
        />
        <button
          class="btn btn-primary"
          @click="addTask(taskCategory.categoryId)"
          type="submit"
          :v-model="addTask"
        >
          Create
        </button>
      </div>
    </div>
    <TasksFilter :tasks="tasks" />
  </div>
</template>

<script>
import TasksFilter from "./TasksFilter.vue";
export default {
  components: {
    TasksFilter,
  },
  props: ["categories"],
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Task",
  data() {
    return {
      selectedPriority: "1",
      tasks: [
        {
          id: 1,
          categoryId: 1,
          name: "Task1",
          state: "in progress",
          dueDate: new Date(),
          priority: "1",
        },
        {
          id: 2,
          categoryId: 2,
          name: "Task2",
          state: "in progress",
          dueDate: new Date(),
          priority: "2",
        },
        {
          id: 3,
          categoryId: 2,
          name: "Task3",
          state: "in progress",
          dueDate: new Date(),
          priority: "1",
        },
      ],
    };
  },
  computed: {
    categoriesTasks: function () {
      console.log(this.categories);
      return this.categories.map((category) => {
        return {
          categoryId: category.id,
          categoryName: category.name,
          categoryColor: category.color,
          tasks: this.tasks.filter((x) => {
            if (x.categoryId === category.id) {
              return true;
            } else return;
          }),
          /*.sort((a, b) => {
              return parseInt(b.priority) - parseInt(a.priority);
            })*/
        };
      });
    },
  },
  methods: {
    addTask: function (categoryId) {
      this.tasks.push({
        id: this.tasks.length + 1,
        categoryId: categoryId,
        name: this.task,
        state: "in progress",
        dueDate: new Date(this.taskDate),
        priority: this.selectedPriority,
      });
      this.task = null;
    },
    deleteTask: function (taskId) {
      const currentTask = this.tasks.findIndex((x) => x.id === taskId);
      this.tasks.splice(currentTask, 1);
    },

    updateTask: function (taskId) {
      const currentTask = this.tasks.find((x) => x.id === taskId);
      currentTask.name = this.taskName;
      this.taskName = null;
    },
    updateStateTask: function (taskId) {
      const currentTask = this.tasks.find((x) => x.id === taskId);
      console.log(currentTask);
      if (currentTask.state === "completed") {
        currentTask.state = "in progress";
      } else if (currentTask.state === "in progress") {
        currentTask.state = "completed";
      }
    },

    updatePriorityTask: function (e, taskId) {
      console.log(e.target.value, taskId);
      const currentTask = this.tasks.find((x) => x.id === taskId);
      currentTask.priority = e.target.value;
    },
  },
};
</script>

<style>
</style>