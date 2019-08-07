import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import Home from './views/Home.vue'

Vue.use(Router)

const Repositories = () =>
  import('./views/Projects.vue')
const ProjectBranches = () =>
  import('./views/ProjectBranches.vue')

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/projects/:org/:page',
      name: 'projects',
      component: Repositories
    },
    {
      path: '/branches/:owner/:repo',
      name: 'branches',
      component: ProjectBranches
    },
    {
      path: '*',
      component: NotFound
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
