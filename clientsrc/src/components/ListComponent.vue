<template>
  <div class="list-component row text-left">
    <div class="col-3 shadow mx-1 list-container rounded border border-danger bg-secondary">
      <div class="row mt-2">
        <div class="col-7">
          <p>List title</p>
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
              <input
                type="text"
                name="title"
                id="title"
                class="form-control shadow"
                placeholder="new task.."
              />
            </div>
            <div class="form-group align-self-center">
              <button
                type="submit"
                class="border border-success text-success shadow mr-1 ml-2 btn btn-warning"
              >
                <i class="fas fa-plus"></i> Add Task
              </button>
              <button
                type="button"
                class="border border-success text-success shadow ml-1 btn btn-warning"
                @click="taskForm = false"
              >
                <i class="fas fa-times"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <hr />

      <!-- <div class="row" id="this is for the tasks">
        <div class="col-10 card shadow mx-auto my-2 pt-2">
          <div class="row">
            <div class="col-8">
              <p>task title</p>
            </div>
            <div class="col-4">
              <span>
                <i class="pointer text-warning fas fa-comment-dots mx-2"></i>
                <i class="pointer text-warning fas fa-trash-alt"></i>
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <small>added by: user</small>
              <hr />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <form class="form col-12 d-flex flex-column" @submit.prevent="createTask">
                <div class="form-group">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="form-control"
                    placeholder="new comment.."
                  />
                </div>
                <div class="form-group align-self-center">
                  <button
                    type="submit"
                    class="border border-warning text-warning shadow m-auto btn btn-success"
                  >
                    <i class="fas fa-plus"></i> Comment
                  </button>
                  <button
                    type="button"
                    class="border border-warning text-warning shadow m-auto btn btn-success"
                  >
                    <i class="fas fa-times"></i> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p>Comment comment</p>
            </div>
          </div>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import TaskComponent from "../components/TaskComponent"
export default {
  name: "ListComponent",
  data() {
    return {
      taskForm: false,
      newTask: {}
    };
  },
  computed: {},
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