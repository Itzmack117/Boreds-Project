<template>
  <div class="boards container-fluid">
    <div class="row top-pad">
    </div>
    <div class="row banner">
      <div class="col-7 card shadow m-auto">

        <div class="row bubble-boy">
          <div class="col-6 shadow mx-auto bg-warning rounded-pill text-center text-white">
            <h1>My Boreds</h1>
          </div>
        </div>

        <div class="row">

          <div class="col-12 mt-5 text-center">
            <h6>Create a new board or navigate to an existing one</h6>
          </div>

          <div class="col-12 mb-4 text-center">
            <div class="row">
              <form class="form-inline col-12" @submit.prevent="createBoard">
                <div class="col-12 pb-3 border-bottom border-success">
                  <div class="form-group">
                    <input type="text" name="" id="" class="form-control col-10 m-2" placeholder="New Board Title..."
                      aria-describedby="helpId" v-model="newBoard.title">
                    <button type="submit" class="m-2 btn btn-warning"><i class="text-success fas fa-plus"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="col-12 text-left pl-5 my-2" v-for="board in boards" :key="board.id">
            <router-link :to="{name: 'board', params: {boardId: board.id}}" class="my-2">
              {{board.title}}
            </router-link>
          </div>

        </div>
      </div>
    </div>

    <div v-for="board in boards" :key="board.id">
      <router-link :to="{name: 'board', params: {boardId: board.id}}">{{board.title}}</router-link>
    </div>
  </div>
</template>

<script>

  export default {
    name: "boards",
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      createBoard() {
        this.$store.dispatch("createBoard", this.newBoard);
        this.newBoard = { title: "" };
      },
    },
    components: {
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