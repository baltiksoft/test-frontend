// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'AdsHome',
        component: () => import(/* webpackChunkName: "home" */ '@/views/AdsHome.vue'),
      },
      {
        path: '/:id',
        name: 'AdsShow',
        component: () => import('@/views/AdsShow.vue'),
      },
      {
        path: '/add',
        name: 'AdsAdd',
        component: () => import(/* webpackChunkName: "home" */ '@/views/AdsAdd.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
