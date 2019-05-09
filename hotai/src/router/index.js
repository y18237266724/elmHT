import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//路由懒加载
const HT = resolve => require(['../ht/HT.vue'],resolve);
const LOGIN = resolve => require(['../ht/login.vue'],resolve);
const USERNAME = resolve => require(['../ht/user/userlist.vue'],resolve);
const Manage = resolve => require(['../ht/manage/manage.vue'],resolve);
const Business = resolve => require(['../ht/shangjia/Business.vue'],resolve);
const Foods = resolve => require(['../ht/foods/Foods.vue'],resolve);
const Shangpu = resolve => require(['../ht/Newlist/Shangpu.vue'],resolve);
const Order = resolve=> require(['../ht/order/orderlist.vue'],resolve);
const Distr = resolve=> require(['../ht/lcon/Distribution.vue'],resolve);
const Adminlist=resolve=>require(['../ht/admin/Adminlist.vue'],resolve);
const Goods = resolve => require(['../ht/Newlist/addGoods.vue'],resolve);
const Text = resolve => require(['../ht/text/vueEdit.vue'],resolve);
const Adminset = resolve => require(['../ht/adminSet/adminSet.vue'],resolve);
const Note = resolve => require(['../ht/Note.vue'],resolve);
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
          component:USERNAME,
          meta:{
            name:'数据管理',
            title:'用户列表'
          }
        },
        {
          //首页
          path:'/LOGIN/Manage',
          name:'Manage',
          component:Manage,
          meta:{
            name:'',
            title:''
          },
        },
        {
          //商家列表
          path:'/LOGIN/Business',
          name:'Business',
          component:Business,
          meta:{
            name:'数据管理',
            title:'商家列表'
          },
        },
        {
          //食品列表
          path:'/LOGIN/Foods',
          name:'Foods',
          component:Foods,
          meta:{
            name:'数据管理',
            title:'食品列表'
          },
        },
        {
          //添加商铺
          path:'/LOGIN/Shangpu',
          name:'Shangpu',
          component:Shangpu,
          meta:{
            name:'添加数据',
            title:'添加商铺'
          },
        },
        {
          //订单列表
          path:'/LOGIN/Order',
          name:'Order',
          component:Order,
          meta:{
            name:'数据管理',
            title:'订单列表'
          },
        },
        {
          //图标/用户分布
          path:'/LOGIN/Distr',
          name:'Distr',
          component:Distr,
          meta:{
            name:'图标',
            title:'用户分布'
          },
        },
        {
          //管理员列表
          path:'/LOGIN/Adminlist',
          name:'Adminlist',
          component:Adminlist,
          meta:{
            name:'数据管理',
            title:'管理员列表'
          },
         
        },
        {
          //管理员列表
          path:'/LOGIN/Goods',
          name:'Goods',
          component:Goods,
          meta:{
            name:'添加数据',
            title:'添加商品'
          },
        },
        {
          //文本编辑Adminset
          path:'/LOGIN/Text',
          name:'Text',
          component:Text,
          meta:{
            name:'编辑',
            title:'文本编辑'
          },
        },
        {
          //管理员设置Adminset
          path:'/LOGIN/Adminset',
          name:'Adminset',
          component:Adminset,
          meta:{
            name:'设置',
            title:'管理员设置'
          },
        },
        {
          //说明
          path:'/LOGIN/Note',
          name:'Note',
          component:Note,
          meta:{
            name:'说明',
            title:'说明'
          },
        }
      ]
    }
  ]
})

