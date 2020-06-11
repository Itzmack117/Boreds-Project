<template>
  <div class="row" id="this is for the tasks">

    <div class="col-10 card shadow mx-auto my-2 pt-2">

      <div class="row">
        <div class="col-8">
          <p>{{tasksProp.title}}</p>
        </div>
        <div class="col-4">
          <span>
            <i class="pointer text-warning fas fa-comment-dots mx-2" @click="commentForm =! commentForm"></i>
            <i class="pointer mx-2 fas fa-chevron-circle-right text-warning"></i>
            <i class="pointer text-warning fas fa-trash-alt" @click="deleteTask"></i>
          </span>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <small>{{tasksProp.creatorEmail}}</small>
          <hr />
        </div>
      </div>

      <div class="row" v-if="commentForm">
        <div class="col-12">
          <form class="form col-12 d-flex flex-column" @submit.prevent="createComment">
            <div class="form-group">
              <input type="text" name="title" id="title" class="form-control " placeholder="new comment.."
                v-model="newComment.title" />
            </div>
            <div class="form-group align-self-center">
              <button type="submit" class="border border-warning text-warning shadow m-auto btn btn-success">
                <i class="fas fa-plus"></i> Comment
              </button>
              <button @click="commentForm = false" type="button"
                class="border border-warning text-warning shadow m-auto btn btn-success">
                <i class="fas fa-times"></i> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TaskComponent",
    props: ["tasksProp"],
    data() {
      return {
        commentForm: false,
        newComment: {}
      }
    },
    computed: {},
    methods: {
      deleteTask() {
        this.$store.dispatch("deleteTask", this.tasksProp)
      },
      createComment() {
        this.$store.dispatch("createComment", this.newComment);
        this.newComment = {};
      }
    },
    components: {

    }
  }
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