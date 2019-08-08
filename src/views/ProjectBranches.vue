<template>
  <div class="card-body branches-container col-10 mx-auto mt-3">
    <router-link class="col-7 m-0 text-left"
                 :to="{ name: 'projects', params: { org: owner, page: 1 }}">
      <h6 class="m-0"> Back to {{ owner}}</h6>
    </router-link>
    <div class="text-left p-3">
      <h2 class="text-break">{{ owner }}/{{ repo }}</h2>
      <p>{{ branches.length }} branches</p>
    </div>
    <!--pagination-->
    <pagination v-if="pagination" :pagination="pagination"
                :current="current"
                v-on:load-page="loadPage"
                class="text-right mb-3"></pagination>

    <ul class="list-unstyled">
      <li class="d-flex flex-row p-2 align-items-center" v-for="branch in branches" :key="branch.name">
        <h5 class="col-7 text-left">{{branch.name}}</h5>
        <h5 class="col-5">
          <i class="fa fa-lock" v-if="branch.protected"></i>
          <i class="fa fa-unlock" v-else></i></h5>
      </li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import Pagination from '@/components/PaginationButtons.vue'
export default {
  name: 'Branches',
  components: {
    Pagination
  },
  data () {
    return {
      owner: '',
      repo: '',
      branches: [],
      current: 1,
      pagination: {}
    }
  },
  watch: {
    '$route' (to, from) {
      this.current = to.params.page
    }
  },
  computed: {
    ...mapGetters(['getRepo'])
  },
  methods: {
    getBranches (page) {
      const vm = this
      let parse = require('parse-link-header')
      axios.get(`https://api.github.com/repos/${vm.owner}/${vm.repo}/branches`, {
        params: {
          page: page,
          per_page: 5
        }
      })
        .then(response => {
          vm.branches = response.data
          console.log(response.headers)
          vm.pagination = parse(response.headers.link)
        })
        .catch(error => console.log(error))
    },
    loadPage (page) {
      this.$router.push({ name: 'branches', params: { owner: this.owner, repo: this.repo, page: page } })
      this.getBranches(page)
    }
  },
  mounted () {
    this.owner = this.$route.params.owner
    this.repo = this.$route.params.repo
    this.current = this.$route.params.page
    this.getBranches(this.current)
  }
}
</script>

<style lang="scss">
  .branches-container {
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

  }
</style>
