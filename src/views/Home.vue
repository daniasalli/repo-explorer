<template>
  <div class="home card-body mt-5 d-flex flex-column justify-content-center">
    <h4 class="mb-5"> Use this tool to search for an organisation's repositories using Github API </h4>
    <div class="d-flex justify-content-center align-content-center">
      <div class="search-bar">
        <div class="px-2"><i class="fa fa-search mr-2"></i></div>
        <input class="col-10" v-model.trim="searchQuery" />
      </div>
      <div>
        <button class="btn btn-primary ml-2 font-weight-bold" @click="goToList">Find
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
      this.$router.push({ name: 'projects', params: { org: this.searchQuery, page: 1 } })
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
