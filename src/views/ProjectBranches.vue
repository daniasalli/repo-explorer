<template>
  <div class="card-body branches-container col-10 mx-auto mt-3">
    <div class="text-left p-3">
      <h2>{{ owner }}/{{ repo }}</h2>
      <p>{{ branches.length }} branches</p>
    </div>
    <ul class="list-unstyled">
      <li class="d-flex flex-row" v-for="branch in branches" :key="branch.name">
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
export default {
  data () {
    return {
      owner: '',
      repo: '',
      branches: []
    }
  },
  computed: {
    ...mapGetters(['getRepo'])
  },
  methods: {
    getBranches () {
      const vm = this
      axios.get(`https://api.github.com/repos/${vm.owner}/${vm.repo}/branches`)
        .then(response => {
          vm.branches = response.data
        })
        .catch(error => console.log(error))
    }
  },
  mounted () {
    this.owner = this.$route.params.owner
    this.repo = this.$route.params.repo
    this.getBranches()
  }
}
</script>

<style lang="scss">
  .branches-container {

  }
</style>
