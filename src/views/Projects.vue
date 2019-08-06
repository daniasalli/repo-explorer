<template>
  <div class="projects-container card-body col-10 mx-auto mt-3">
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

    <div class="" v-if="!loading || repoList.length">
      <h5 class="mt-3 text-left">{{ filteredProjects.length }} repository results for "{{ searchQuery }}"</h5>

      <div class="text-right" v-if="languageList.length">Filter by language:
        <select class="text-right" v-model="selected">
          <option v-for="(language, index) in languageList" v-bind:value="language" :key="index">
            {{ language }}
          </option>
        </select>
      </div>
      <!--repositories list-->
      <ul class="list-unstyled mx-auto mt-3">
        <li class="py-3" v-for="repo in filteredProjects" :key="repo.id">
          <div class="d-flex flex-row justify-content-between text-left">
            <router-link class="col-7 m-0"
                         :to="{ name: 'branches', params: { repo: repo.name, owner: repo.owner.login }}">
              <h6 class="m-0" @click="updateRepo(repo)"> {{ repo.name }}</h6>
            </router-link>
            <span class="col-3 malign-self-end">{{ repo.language }}</span>
            <span class="col-2 align-self-end"> <i class="fa fa-star"></i> {{ repo.stargazers_count }}</span>
          </div>
          <p class="text-left px-3 mt-1 text-muted mb-0 col-7 description"> {{ repo.description }}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import Search from '@/components/Search.vue'

export default {
  name: 'Projects',
  components: {
    Search
  },
  data () {
    return {
      searchQuery: '',
      repoList: [],
      languageList: [],
      selected: 'all',
      loading: false,
      loadingMessage: '',
      warningText: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.searchQuery = to.params.org
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
    getList () {
      const vm = this
      vm.repoList = []
      vm.showLoading()
      axios.get(`https://api.github.com/orgs/${vm.searchQuery}/repos`)
        .then(response => {
          vm.repoList = response.data
          vm.getLanguages()
          vm.loading = false
        })
        .catch( error => {
          console.log('aaa')
          vm.warningText = 'Looks like somethig went wrong, please try again later'
          setTimeout(() => {
            vm.loading = false;
            vm.warningText = ''
          }, 2000);
        })
    },
    getLanguages () {
      const vm = this
      vm.languageList = Array.from(new Set(vm.repoList.map(repo => repo.language)))
      vm.languageList.unshift('all')
    },
    searchList (org) {
      this.$router.push({ name: 'projects', params: { org: org } })
      this.getList()
    },
    showLoading () {
      this.loading = true
      this.loadingMessage = 'Looking for the organization\'s repositories'
    },
    ...mapActions(['updateRepo'])
  },
  mounted () {
    this.searchQuery = this.$route.params.org
    this.getList()
  }
}
</script>

<style lang="scss">
  .projects-container {

    max-height: 100vh;
    overflow-y: auto;

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

    ul {
      li {
        border-bottom: 1px solid #eceeef;
        &:last-of-type {
          border-bottom: none;
        }
        &:hover, &:focus {
          background-color: #f3f6f9;
          border-radius: 8px;
          transition: background-color .3s ease;
        }
      }
    }
    // for project decription
    .description {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

</style>
