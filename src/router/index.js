import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentEdit from '@/views/StudentEdit.vue'
import StudentNew from '@/views/StudentNew.vue'
import StudentView from '@/views/studentView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/students/create',
      name: 'students/create',
      component: StudentNew
    },
    {
      path: '/students/edit/:id',
      name: 'students/edit',
      component: StudentEdit
    },
    {
      path: '/students/view/:id',
      name: 'students/view',
      component: StudentView
    }
  ]
})

export default router
