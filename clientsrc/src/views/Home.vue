
<template>
  <div class="home container-fluid">
    <div class="row top-pad">
    </div>
    <div class="row banner">
      <div class="col-7 card shadow m-auto">
        <div class="row bubble-boy">
          <div class="col-6 shadow mx-auto bg-warning rounded-pill text-center text-white">
              <h1>Welcome to Boreds</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mt-5 text-center">
            <h4>You can use Boreds to create and manage Boards, lists, and tasks</h4>
          </div>
          <div class="col-12 my-4 text-center">
            <h5>Please Log In To Continue</h5>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
.home{
  font-family: 'Source Sans Pro', sans-serif;
}
.top-pad{
  height: 20vh;
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
</style>