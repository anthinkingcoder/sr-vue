import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/index.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Bk from '../components/knowledge/index.vue'
import Topic from '../components/topic/index.vue'
import StudentWork from '../components/student_work/index.vue'
import Example from '../components/example/index.vue'
import ExampleDetail from '../components/example/detail.vue'
import StudentWorkDetail from '../components/student_work/detail.vue'
import Resource from '../components/resource/index.vue'
import ExpandKnowledge from '../components/expand_knowledge/index.vue'
import QuestionTest from '../components/question/text.vue'
import TestSelect from '../components/question/text_select.vue'
import EvaluateResult from '../components/question/evaluate_result.vue'
import TestHistory from '../components/user/test_history.vue'
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
          path: '/example/detail',
          component: ExampleDetail
        },
        {
          path: '/resource',
          component: Resource
        },
        {
          path: '/expand_knowledge',
          component: ExpandKnowledge
        },
        {
          path: '/expand_knowledge/detail',
          component: ExpandKnowledge
        },
        {
          path: '/question/test',
          component: QuestionTest
        },
        {
          path: '/question/test_select',
          component: TestSelect
        },
        {
          path: '/question/evaluate_result',
          component: EvaluateResult
        },
        {
          path: '/user/test_history',
          component: TestHistory
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
