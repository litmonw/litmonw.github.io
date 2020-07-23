/* 导入组件 */
import Index from '../pages/index.vue'
import Read from '../pages/read.vue'
import Think from '../pages/think.vue'
import Work from '../pages/work.vue'
import About from '../pages/about.vue'
import PostDetail from '../pages/postDetail.vue'
import Friends from '../pages/Friends.vue'

export default [
  {
    name: 'index',
    path: '/',
    component: Index,
  },
  {
    name: 'post',
    path: '/post',
    component: Index,
  },
  {
    name: 'postDetail',
    path: '/post/:id',
    props: true,
    component: PostDetail
  },
  {
    name: 'read',
    path: '/read',
    component: Read,
  },
  {
    name: 'think',
    path: '/think',
    component: Think,
  },
  {
    name: 'work',
    path: '/work',
    component: Work,
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'friends',
    path: '/friends',
    component: Friends
  }
]