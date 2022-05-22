import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import NewRelease from "@/views/NewRelease.vue";
import Top100 from "@/views/Top100.vue";
import HubHome from "@/views/Hub.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
  },
  {
    path: '/nhac-moi',
    name: 'new-release',
    component: NewRelease
  },
  {
    path: '/top100',
    name: 'top-100',
    component: Top100
  },
  {
    path: '/the-loai',
    name: 'category',
    component: HubHome
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
