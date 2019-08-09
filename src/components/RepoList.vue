<template>
    <ul class="list-unstyled mx-auto mt-3 repo-list list-container">
      <li class="py-3" v-for="repo in projects" :key="repo.id">
        <div class="d-flex flex-row justify-content-between align-items-center text-left">
          <router-link class="col-6 m-0"
                       :to="{ name: 'branches', params: { repo: repo.name, owner: repo.owner.login }, query: { page: 1 }}">
            <h6 class="m-0" @click="updateRepo(repo)"> {{ repo.name }}</h6>
          </router-link>
          <span class="col-3 align-self-end">{{ repo.language }}</span>
          <span class="col-1 align-self-end"> <i class="fa fa-star"></i> {{ repo.stargazers_count }}</span>
          <span class="col-1 align-self-end"> <i class="fa fa-code-fork"></i> {{ repo.forks }}</span>
        </div>
        <p class="text-left px-3 mt-1 text-muted mb-0 col-6 description text-break small"> {{ repo.description }}</p>
        <p class="text-left px-3 mt-1 text-muted mb-0 col-6 small">
          Updated at {{ repo.updated_at | dateFormat('MMM DD, YYYY')}}</p>
      </li>
    </ul>
</template>
<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
  name: 'RepoList',
  props: {
    projects: Array
  },
  filters: {
    dateFormat (date, format) {
      if (!date) {
        return 'N/A'
      }
      return moment(date).format(format)
    }
  },
  methods: {
    ...mapActions(['updateRepo'])
  }
}
</script>
<style lang="scss" scoped>
  .list-container {
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
    // for project description
    .description {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

</style>
