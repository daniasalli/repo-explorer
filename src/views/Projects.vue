<template>
  <div class="projects-container p-3">
    <div class="search-bar d-flex justify-content-center">
      <div class="px-2"><i class="fa fa-search"></i></div>
      <div class="px-2">
        <input class="search-input" v-model.trim="searchQuery" />
      </div>
      <div>
        <button class="search-button" @click="getList">Find
        </button>
      </div>
    </div>
    <!--repositories list-->
    <ul class="col-8 list-unstyled mx-auto mt-3">
      <li class="mb-3" v-for="repo in repoList" :key="repo.id">
        <div class="d-flex flex-row justify-content-between text-left">
          <h5 class="col-7 m-0"> {{ repo.name }}</h5>
          <span class="col-3 malign-self-end">{{ repo.language }}</span>
          <span class="col-2 align-self-end">{{ repo.stargazers_count }}</span>
        </div>
        <p class="text-left px-3 mt-1 text-muted mb-0 col-7 description"> {{ repo.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      searchQuery: '',
      repoList: undefined
    }
  },
  methods: {
    getList () {
      const vm = this
      axios.get(`https://api.github.com/orgs/${vm.searchQuery}/repos`)
        .then(response => {
          vm.repoList = response.data
          console.log(vm.repoList)
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss">
  .projects-container {

    // for project decription
    .description {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

</style>
