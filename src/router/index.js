import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/index.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Bk from '../components/knowledge/index.vue'
import Topic from '../components/topic/index.vue'
import StudentWork from '../components/student_work/index.vue'
import Example from '../components/example/index.vue'
import StudentWorkDetail from '../components/student_work/detail.vue'
import Resource from '../components/resource/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Main,
      children: [
        {
          path: '/knowledge',
          component: Bk
        },
        {
          path: '/topic',
          component: Topic
        },
        {
          path: '/student_work',
          component: StudentWork

        },
        {
          path: '/student_work/detail',
          component: StudentWorkDetail
        },
        {
          path: '/example',
          component: Example
        },
        {
          path: '/resource',
          component: Resource
        }]
    },
    {
      path: '/login',
      name: 'index',
      component: Login
    },
    {
      path: '/register',
      name: 'index',
      component: Register
    }
  ]
})
