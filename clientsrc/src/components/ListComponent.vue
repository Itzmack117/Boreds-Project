<template>
  <div class="ListComponent row text-left">
    <div class="col shadow mx-1 list-container rounded border border-danger bg-secondary">
      <div class="row mt-2">
        <div class="col-7">
          <p>list.title</p>
        </div>
        <div class="col-5">
          <span>
            <i class="pointer text-warning fas fa-plus mx-2" @click="taskForm =! taskForm"></i>
            <i class="pointer mx-2 fas fa-chevron-circle-right text-warning"></i>
            <i class="pointer ml-2 fas fa-trash-alt text-warning"></i>
          </span>
        </div>
        <div class="col-12" v-if="taskForm">
          <form class="form col-12 d-flex flex-column" @submit.prevent="createTask">
            <div class="form-group">
              <input type="text" name="title" id="title" class="form-control shadow" placeholder="new task.." />
            </div>
            <div class="form-group align-self-center">
              <button type="submit" class="border border-success text-success shadow mr-1 ml-2 btn btn-warning">
                <i class="fas fa-plus"></i> Add Task
              </button>
              <button type="button" class="border border-success text-success shadow ml-1 btn btn-warning"
                @click="taskForm = false">
                <i class="fas fa-times"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <hr />

    </div>
  </div>
</template>

<script>
  import TaskComponent from "../components/TaskComponent"
  export default {
    name: "ListComponent",
    props: ["listProp"],
    data() {
      return {
        taskForm: false,
        newTask: {}
      };
    },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      createTask() {
        this.$store.dispatch("createTask", this.newTask);
        this.newTask = {};
      }
    }
  };
</script>
<style scoped>
  .boards {
    font-family: "Source Sans Pro", sans-serif;
  }

  .top-pad {
    height: 5vh;
  }

  .bubble-boy {
    position: absolute;
    width: 100%;
    top: -25px;
  }

  .banner {
    position: relative;
    height: 20vh;
  }

  .list-container {
    height: 100%;
  }

  .long-boy {
    height: 85vh;
  }

  .pointer {
    cursor: pointer;
  }

  .text-left {
    text-align: left;
  }
</style>