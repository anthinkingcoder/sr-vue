import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/index.vue'
import Login from '../components/user/login.vue'
import Register from '../components/user/register.vue'
import Bk from '../components/knowledge/index.vue'
import Topic from '../components/topic/index.vue'
import StudentWork from '../components/student_work/index.vue'
import Example from '../components/example/index.vue'
import ExampleDetail from '../components/example/detail.vue'
import StudentWorkDetail from '../components/student_work/detail.vue'
import Resource from '../components/resource/index.vue'
import ExpandKnowledge from '../components/expand_knowledge/index.vue'
import QuestionTest from '../components/question/test.vue'
import TestSelect from '../components/question/test_select.vue'
import EvaluateResult from '../components/question/evaluate_result.vue'
import TestHistory from '../components/user/test_history.vue'
import Search from '../components/search/index.vue'
import SearchKnowledge from '../components/search/knowledge.vue'
import SearchExpandKnowledge from '../components/search/expand_knowledge.vue'
import SearchStudentWork from '../components/search/work.vue'
import SearchTopic from '../components/search/topic.vue'
import SearchResource from '../components/search/resource.vue'

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
        },
        {
          path: '/search',
          component: Search,
          children: [
            {
              path: '/search/knowledge',
              component: SearchKnowledge
            },
            {
              path: '/search/expand_knowledge',
              component: SearchExpandKnowledge
            },
            {
              path: '/search/topic',
              component: SearchTopic
            },
            {
              path: '/search/resource',
              component: SearchResource
            },
            {
              path: '/search/work',
              component: SearchStudentWork
            }
          ]
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
