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

    Filter by language:
    <select v-model="selected">
      <option v-for="(language, index) in languageList" v-bind:value="language" :key="index">
        {{ language }}
      </option>
    </select>
    <!--repositories list-->
    <ul class="col-8 list-unstyled mx-auto mt-3">
      <li class="mb-3" v-for="repo in filteredProjects" :key="repo.id">
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
      repoList: [],
      languageList: [],
      selected: 'all'
    }
  },
  computed: {
    filteredProjects () {
      let filtered = this.selected !== 'all' ? this.repoList.filter(repo => repo.language === this.selected)
        : this.repoList
      return filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }
  },
  methods: {
    getList () {
      const vm = this
      axios.get(`https://api.github.com/orgs/${vm.searchQuery}/repos`)
        .then(response => {
          vm.repoList = response.data
          vm.getLanguages()
        })
        .catch(error => console.log(error))
    },
    getLanguages () {
      const vm = this
      vm.languageList = Array.from(new Set(vm.repoList.map(repo => repo.language)))
      vm.languageList.unshift('all')
    },
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
