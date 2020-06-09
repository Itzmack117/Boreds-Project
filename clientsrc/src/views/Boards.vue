<template>
  <!-- <div class="boards container-fluid">
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
                <input type="text" name="" id="" class="form-control col-10 m-2" placeholder="New Board Title..." aria-describedby="helpId" v-model="newBoard.title">
                <button type="submit" class="m-2 btn btn-warning"><i class="text-success fas fa-plus"></i></button>
              </div>
              </div>
            </form>
            </div>
          </div>
          
          <div class="col-12 text-left pl-5 my-2"                       id="this will have a v-for / no BoardsComponent">
            <h6 class="my-2"                                                        id="these h6's will be router-links to board page">
              Board Title
            </h6>
          </div>

        </div>
      </div>
    </div>

    <div v-for="board in boards" :key="board.id">
      <router-link :to="{name: 'board', params: {boardId: board.id}}">{{board.title}}</router-link>
    </div>
  </div> -->



<div class="board container-fluid">
    <div class="row top-pad">
    </div>
    <div class="row banner">
      <div class="col-12 card long-boy shadow">
        <div class="row bubble-boy">
          <div class="col-6 shadow mx-auto bg-warning rounded-pill text-center text-white">
              <h1>Board Title</h1>
          </div>
        </div>
        
        <div class="row">

          
          <div class="col-12 my-5 text-center">
            <div class="row">
            <form class="form-inline col-12" @submit.prevent="createList">
              <div class="col-12 pb-3 border-bottom border-success">
              <div class="form-group">
                <input type="text" name="title" id="title" class="form-control col-11 m-2" placeholder="New List Column..." aria-describedby="helpId" >
                <button type="submit" class="ml-5 my-2 btn btn-warning"><i class="text-success fas fa-plus"></i></button>
              </div>
              </div>
            </form>
            </div>
          </div>
        </div>

        <div class="row text-left">
          <div class="col-3 shadow mx-1 list-container rounded border border-danger bg-secondary">
            
            <div class="row mt-2">
              <div class="col-7">
                <p>List title</p>
              </div>
              <div class="col-5">
                <span><i class="pointer text-warning fas fa-plus mx-2"></i><i class="pointer mx-2 fas fa-chevron-circle-right text-warning"></i><i class="pointer ml-2 fas fa-trash-alt text-warning"></i></span>
              </div>
              <div class="col-12">
                <form class="form-inline col-12" @submit.prevent="createTask">
                  <div class="form-group">
                    <input type="text" name="title" id="title" class="form-control shadow" placeholder="new task..">
                    <button type="submit" class="shadow mr-1 ml-2 btn btn-warning"><i class="text-success fas fa-plus"></i></button>
                    <button type="button" class="shadow ml-1 btn btn-warning"><i class="fas fa-times text-success"></i></button>
                  </div>
                </form>
              </div>
            </div>
            <hr>
            <div class="row" id="this is for the tasks">
              <div class="col-10 card shadow mx-auto my-2 pt-2">
                <p>Task</p>
                <small>added by: USER </small>
                <hr>
                <div class="row">
                  <div class="col-12">
                    <form class="form-inline" @submit.prevent="createComment">
                      <div class="form-group col-12 mb-2">
                        <input type="text" name="title" id="title" class="col-7 form-control shadow" placeholder="new comment..">
                        <button type="submit" class="shadow rounded-circle mr-1 ml-2 btn btn-success"><i class="text-warning fas fa-plus"></i></button>
                        <button type="button" class="shadow rounded-circle ml-1 btn btn-success"><i class="fas fa-times text-warning"></i></button>
                     </div>
                   </form>
                 </div>
                </div>
                

              </div>
            </div>
          </div>
        </div>

      </div>
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
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>
<style scoped>
.boards{
  font-family: 'Source Sans Pro', sans-serif;
}
.top-pad{
  height: 5vh;
}
.bubble-boy{
  position: absolute;
  width: 100%;
  top: -25px;
}
.banner{
  position: relative;
  height: 20vh;
}
.list-container{
  height: 100%;
}
.long-boy{
  height: 85vh;
}
.pointer{
  cursor: pointer;
}
.text-left{
  text-align: left;
}
</style>