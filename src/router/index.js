import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SearchPage from '../views/SearchPage.vue'
import MinePage from '../views/MinePage.vue'
// import banner from '@/components/banner.vue'
import SongSheet from '@/components/SongSheet.vue'
import ranking from '@/components/ranking.vue'
import SongGather from '@/components/SongGather.vue'
import comment from '@/components/comment.vue'
import artist from '@/components/artist.vue'
import artistGather from '@/components/artistGather.vue'
import login from '@/components/login.vue'

Vue.use(VueRouter)
/* eslint-disable */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/search',
    name: 'search',
    component:SearchPage,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/SearchPage.vue'),
    // children:[
    //   {
    //     path: 'oo',
    //     name: 'oo',
    //     component: banner,
    //   },
    // ]    
  },
  {
    path: '/mine',
    name: 'mine',
    component: MinePage,
  },
  {
    path: '/SongSheet',
    name: 'SongSheet',
    component: SongSheet,
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: ranking,
  },
  {
    path: '/SongGather',
    name: 'SongGather',
    component: SongGather,
  },
  {
    path: '/comment',
    name: 'comment',
    component: comment,
  },
  {
    path: '/artist',
    name: 'artist',
    component: artist,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/artistGather',
    name: 'artistGather',
    component: artistGather,
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
