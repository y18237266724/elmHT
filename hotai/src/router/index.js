import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HT from '@/ht/HT'
import LOGIN from '@/ht/login'
import USERNAME from '@/ht/user/userlist'
import Manage from '@/ht/manage/manage'
import Business from '@/ht/shangjia/Business'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:'/HT'
    },
    {
      path: '/HT',
      //后台管理
      name: 'HT',
      component: HT,
    },
    {
      path: '/LOGIN',
      //后台管理
      name: 'LOGIN',
      component: LOGIN,
      redirect:'/LOGIN/Manage',
      children:[
        {
          //用户列表
          path:'/LOGIN/userlist',
          name:'USERNAME',
          component:USERNAME
        },
        {
          //首页
          path:'/LOGIN/Manage',
          name:'Manage',
          component:Manage
        },
        {
          //商家列表
          path:'/LOGIN/Business',
          name:'Business',
          component:Business
        }
      ]
    }
  ]
})
