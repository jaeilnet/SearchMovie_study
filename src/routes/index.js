import { createRouter, createWebHashHistory } from "vue-router"
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({
  // Hash 모드
  // https://google.com/#search 와 같이 #(hash)으로 접근
  history: createWebHashHistory(),
  // pages 구분
  routes : [
    {
      path: '/',   // main을 의미
      component: Home
    },
    {
      path :'/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path:'/:notFound(.*)', 
      component: NotFound
    }
  ]
})