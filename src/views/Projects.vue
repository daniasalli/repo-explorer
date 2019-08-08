<template>
  <div class="projects-container card-body col-10 mx-auto mt-5">
    <search v-on:search-list="searchList"></search>

    <div class="loading-overlay full" v-if="loading">
      <div class="inner-overlay">
        <template v-if="!warningText">
          <i class="fa fa-circle-o-notch fa-3x fa-spin"></i>
          <br/><p class="text-primary col-xs-10 text-xs-center m-b-0">{{ loadingMessage }}</p>
        </template>
        <p class="warning-text text-danger" v-if="warningText"> {{ warningText }}</p>
      </div>
    </div>

    <h5 class="mt-5 text-left">Results for "{{ searchQuery }}"</h5>

    <div class="results-container mt-5 py-3" v-if="!loading && repoList.length">
      <!--list Controls-->
      <div class="d-flex justify-content-between px-2">
        <!--Filters-->
        <div class="text-right" v-if="languageList.length">Filter by language:
          <select class="text-right" v-model="selected">
            <option v-for="(language, index) in languageList" v-bind:value="language" :key="index">
              {{ language }}
            </option>
          </select>
        </div>
        <!--Pagination controls-->
        <pagination v-if="pagination" :pagination="pagination"
                    :current="current"
                    v-on:load-page="loadPage"></pagination>
      </div>

      <!--repositories list-->
      <repo-list :projects="filteredProjects"></repo-list>
    </div>
    <div v-if="!repoList.length" class="my-5 text-left">
      <p class="text-muted mb-0">Sorry no there are no results available ):</p>
      <small class="text-muted">why don't you try a new search</small>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Search from '@/components/Search.vue'
import RepoList from '@/components/RepoList.vue'
import Pagination from '@/components/PaginationButtons.vue'

export default {
  name: 'Projects',
  components: {
    Search,
    RepoList,
    Pagination
  },
  data () {
    return {
      searchQuery: '',
      repoList: [],
      languageList: [],
      selected: 'all',
      loading: false,
      loadingMessage: '',
      warningText: '',
      pagination: {},
      current: 1
    }
  },
  watch: {
    '$route' (to, from) {
      this.searchQuery = to.params.org
      this.current = to.params.page
    }
  },
  computed: {
    filteredProjects () {
      let filtered = this.selected !== 'all' ? this.repoList.filter(repo => repo.language === this.selected)
        : this.repoList
      return filtered.sort((a, b) => b.stargazers_count - a.stargazers_count)
    }
  },
  methods: {
    getList (org, page) {
      const vm = this
      let parse = require('parse-link-header')
      vm.repoList = []
      vm.showLoading()
      axios.get(`https://api.github.com/orgs/${org}/repos`, {
        params: {
          page: page
        }
      })
        .then(response => {
          vm.repoList = response.data
          vm.pagination = parse(response.headers.link)
          console.log(vm.pagination)
          vm.getLanguages()
          vm.loading = false
        })
        .catch(error => {
          vm.warningText = error.response.data.message === 'Not Found' ? 'No results matching your search were available'
            : 'Looks like something went wrong, please try again later'
          setTimeout(() => {
            vm.loading = false
            vm.warningText = ''
          }, 2000)
        })
    },
    getLanguages () {
      const vm = this
      vm.languageList = Array.from(new Set(vm.repoList.map(repo => repo.language)))
      vm.languageList.unshift('all')
    },
    searchList (org) {
      this.$router.push({ name: 'projects', params: { org: org, page: 1 } })
      this.getList(org, 1)
    },
    loadPage (page) {
      this.$router.push({ name: 'projects', params: { org: this.searchQuery, page: page } })
      this.getList(this.searchQuery, page)
    },
    showLoading () {
      this.loading = true
      this.loadingMessage = 'Looking for the organization\'s repositories'
    }
  },
  mounted () {
    this.searchQuery = this.$route.params.org
    this.current = this.$route.params.page
    this.getList(this.searchQuery, this.$route.params.page)
  }
}
</script>

<style lang="scss">
  .projects-container {
    .loading-overlay {
      background-color: rgba(255, 255, 255, 0.9);
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1;
      top: 0;
      left: 0;

      &.full {
        background-color: #fbfbfb;
      }

      .inner-overlay {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%);
        color: cornflowerblue;
        font-weight: bold;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .warning-text {
          font-weight: normal;
        }
      }
    }
  }

</style>
