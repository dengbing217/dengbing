import Vue from 'vue'
import VueRouter from 'vue-router'
import user from '@/views/user.vue'
import monly from '@/views/monly.vue'
import count from '@/views/count.vue'
import login from '@/views/login.vue'
import ZJ from '@/views/zhongjiao.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/zhongjiao',
    name:'zhongjiao',
    meta: { 
      requireAuth: true 
     },
     beforeEnter:
       ((to, from, next) => { 
      if (to.matched.some(res => res.meta.requireAuth)) {
       // 验证是否需要登陆 
       if (sessionStorage.getItem('uname')) { // 查询本地存储信息是否已经登陆 
          next(); 
       } else { 
        sessionStorage.setItem('url',window.location);
        next({ 
           path: '/login' // 未登录则跳转至login页面 
         }); 
         
       } 
      } else { 
       next(); 
      } 
     }),

    component:ZJ,
    children: [
        {
          path: 'user',
          component:user,
          meta: { 
            requireAuth: true 
           },
        },
        {
          path: 'monly',
          component:monly
        },
        {
          path: 'count',
          component:count
        },
      ],
    
  },
  {
    path: '*',
    name:'login',
    component:login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 2种方法进行拦截
// /* eslint-disable no-new */ 
// router.beforeEach((to, from, next) => { 
//   if (to.matched.some(res => res.meta.requireAuth)) {// 验证是否需要登陆 
   
//    if (sessionStorage.getItem('uname')) { // 查询本地存储信息是否已经登陆 
//       next(); 
//    } else { 
//     sessionStorage.setItem('url',window.location);
//     next({ 
//        path: '/login' // 未登录则跳转至login页面 
//      }); 
     
//    } 
//   } else { 
//    next(); 
//   } 
//  }); 

export default router
