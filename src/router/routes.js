/* 导入组件 */
import Index from '../pages/index.vue'
import Post from '../pages/post.vue'
import Read from '../pages/read.vue'
import Think from '../pages/think.vue'
import Work from '../pages/work.vue'
import WorkDetail from '../pages/workDetail.vue'
import WorkDetailDesc from '../pages/WorkDetailDesc.vue'
import WorkDetailDownload from '../pages/WorkDetailDownload.vue'
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
    component: Post,
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
    name: 'workDetail',
    path: '/work/:id',
    props: true,
    component: WorkDetail,
    children: [
      {
        path: '/',
        props: true,
        component: WorkDetailDesc
      },
      {
        path: 'description',
        component: WorkDetailDesc
      },
      {
        path: 'download',
        component: WorkDetailDownload
      }
    ]
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