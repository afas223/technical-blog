import HomeView from '@/views/HomeView.vue'
import PostView from '@/views/PostView.vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/:slug', name: 'post', component: PostView },
  ],
})
