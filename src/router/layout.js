const Layout = () => import('@/views/layout')
import My from '@/router/my'
import qa from '@/router/qa'
import Home from '@/router/home'
import Video from '@/router/video'

export default [
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [...My, ...qa, ...Home, ...Video],
  },
]
