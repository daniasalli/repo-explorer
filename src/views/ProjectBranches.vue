<template>
  <div class="card-body branches-container col-10 mx-auto mt-3">
    <router-link class="col-7 m-0 text-left"
                 :to="{ name: 'projects', params: { org: owner, page: 1 }}">
      <h6 class="m-0"> Back to {{ owner }}</h6>
    </router-link>

    <async :url="`https://api.github.com/repos/${owner}/${repo}/branches`"
           :params="callData">
      <!-- Scoped Slot of Async Component -->
      <template v-slot:default="{ pending, error, data, pagination }">

        <!-- Request Pending -->
        <div v-if="pending" class="text-center d-flex flex-column align-items-center text-primary p-4">
          <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          <p class="font-weight-bold mt-2">Loading</p>
        </div>

        <!-- Request Error -->
        <div v-else-if="error" class="text-muted mb-0" role="alert">
          {{ error }}
        </div>

        <!-- Request Success -->
        <div v-else>
          <div class="text-left p-3">
            <h2 class="text-break">{{ owner }}/{{ repo }}</h2>
            <p>{{ data.length }} branches</p>
          </div>
          <!--pagination-->
          <pagination v-if="pagination" :pagination="pagination"
                      :current="current"
                      v-on:load-page="loadPage"
                      class="text-right mb-3"></pagination>

          <ul class="list-unstyled">
            <li class="d-flex flex-row p-2 align-items-center" v-for="branch in data" :key="branch.name">
              <h5 class="col-7 text-left">{{branch.name}}</h5>
              <h5 class="col-5">
                <i class="fa fa-lock" v-if="branch.protected"></i>
                <i class="fa fa-unlock" v-else></i></h5>
            </li>
          </ul>
        </div>
      </template>
    </async>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/PaginationButtons.vue'
import Async from '@/components/Async.vue'

export default {
  name: 'Branches',
  components: {
    Pagination,
    Async
  },
  data () {
    return {
      owner: '',
      repo: '',
      branches: [],
      current: 1,
      toPage: 1,
      callData: {}
    }
  },
  watch: {
    '$route': 'setVariables'
  },
  computed: {
    ...mapGetters(['getRepo'])
  },
  methods: {
    loadPage (page) {
      this.callData.page = page
      this.$router.push({ name: 'branches', params: { owner: this.owner, repo: this.repo }, query: { page: page } })
    },
    setVariables (to) {
      const vm = this
      vm.owner = to.params.owner
      vm.repo = to.params.repo
      vm.current = to.query.page
      vm.callData = { page: vm.current, per_page: 5 }
    }
  },
  created () {
    const vm = this
    vm.owner = vm.$route.params.owner
    vm.repo = vm.$route.params.repo
    vm.current = vm.$route.query.page
    vm.callData = { page: vm.current, per_page: 5 }
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
