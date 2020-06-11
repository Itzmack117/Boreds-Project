<template>
  <div class="board container-fluid">
    <div class="row top-pad"></div>
    <div class="row banner">
      <div class="col-12 card long-boy shadow">
        <div class="row bubble-boy">
          <div class="col-6 shadow mx-auto bg-warning rounded-pill text-center text-white">
            <div>
              <h1>{{board.title}}</h1><button class="btn btn-danger float-right" @click="deleteBoard">DELETE</button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 my-5 text-center">
            <div class="row">
              <form class="form-inline col-12" @submit.prevent="createList">
                <div class="col-12 pb-3 border-bottom border-success">
                  <div class="form-group">
                    <input type="text" name="title" id="title" class="form-control col-11 m-2"
                      placeholder="New List Column..." aria-describedby="helpId" v-model="newList.title" />
                    <button type="submit" class="ml-5 my-2 btn btn-warning">
                      <i class="text-success fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <ListComponent v-for="list in lists" :key="list.id" :listProp="list" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ListComponent from "../components/ListComponent";
  export default {
    name: "board",
    data() {
      return {
        newList: {
          boardId: this.$route.params.boardId
        },
      }
    },
    computed: {
      board() {
        //FIXME This does not work on page reload because the activeBoard is empty in the store
        return this.$store.state.activeBoard;
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      createList() {
        console.log(this.newList)
        this.$store.dispatch("createList", this.newList);
        this.newList = { boardId: this.$route.params.boardId, };
      },
      deleteBoard() {
        this.$store.dispatch("deleteBoard", this.$route.params.boardId)
      }
    },
    mounted() {
      this.$store.dispatch("getBoardById", this.$route.params.boardId);
      this.$store.dispatch("getListsByBoardId", this.$route.params.boardId)
    },
    props: ["boardId"],
    components: {
      ListComponent
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