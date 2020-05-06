import Vue from 'vue'
import VueRouter from 'vue-router'
import FindMusicRouter from './FindMusicRouter'
import PlayListsRouter from './PlayListsRouter'
import SongsRouter from './SongsRouter'
import MvsRouter from './MvsRouter'
import ResultRouter from './ResultRouter'
import PlayListDetailRouter from './PlayListDetailRouter'
import MvDetailRouter from './MvDetailRouter'

Vue.use(VueRouter)

  const routes = [
    FindMusicRouter,
    PlayListsRouter,
    SongsRouter,
    MvsRouter,
    ResultRouter,
    PlayListDetailRouter,
    MvDetailRouter,
    {
      path:'/*',
      redirect:'/findMusic'
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

export default router
