<template>
  <div class="home card-body mt-5 d-flex flex-column justify-content-center">
    <h4 class="mb-5"> Use this tool to search for an organisation's repositories using Github API </h4>
    <div class="d-flex justify-content-center align-content-center">
      <div class="search-bar">
        <div class="px-2"><i class="fa fa-search"></i></div>
        <input class="col-10" v-model.trim="searchQuery" />
      </div>
      <div>
        <button class="btn-primary ml-2" @click="goToList">Find
        </button>
      </div>
    </div>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    goToList () {
      this.$router.push({ name: 'projects', params: { org: this.searchQuery } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    height: 500px;
    .search-bar {
      display: flex;
      flex-direction: row;
      overflow: hidden;
      background: #E8E8F1;
      transition: all .3s ease 0s;
      color: #CECEE1;
      align-items: center;
      input {
        vertical-align: middle;
        background: transparent;
        border: none;
        width: auto;
        &:focus {
          outline: none;
        }
        &::placeholder {
          color: #CECEE1;
        }
      }
    }
  }

</style>