<template>
  <div id="app">
    <div class="header text-center bg-primary text-white">
      <router-link class="h3 text-white text-decoration-none" to="/">Repository Explorer</router-link>
    </div>
    <transition name="fade">
      <router-view/>
    </transition>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['organization'])
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/font-awesome/css/font-awesome.min.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .header {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    width: 100%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }

  .pagination-controls {
    /*.btn-pagination {*/
      /*border: 1px solid rgba(150,160,180,.5);*/
    /*}*/

    .pagination-text {
      margin: 8px 0 10px 10px;
      display: inline-block;
    }
  }
}
</style>
