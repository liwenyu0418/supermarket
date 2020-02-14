import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  // 重定向路由
  {
    path: '/',//默认路径
    // 路由惰性加载
    redirect: '/login'
  },

  {
    path: '/home', // 首页
    name: 'home',
    component: () => import("../views/Home.vue"),
    // 使用元数据meta上的requiresAuth标识，对需要验证的内容进行拦截
    meta: { requiresAuth: true },
    children: [

      {
        path: 'dashbroad', //首页
        component: () => import("../views/Dashbroad/Dashbroad.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: 'producttype-add', // 产品分类添加
        component: () => import("../views/ProductType/ProductTypeAdd.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: 'producttype-list', // 产品分类列表
        component: () => import("../views/ProductType/ProductTypeList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: 'product-add', // 产品添加
        component: () => import("../views/Product/ProductAdd.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: 'product-list', // 产品列表
        component: () => import("../views/Product/ProductList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-add', // 添加用户
        component: () => import("../views/Account/AccountAdd.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-list', // 用户列表
        component: () => import("../views/Account/AccountList.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-update', // 用户修改
        component: () => import("../views/Account/AccountUpdate.vue"),
        meta: { requiresAuth: true },
      }
    ]
  },

  {
    path: '/login',//登录页面
    name: 'login',
    component: () => import('../views/Login.vue')
  },

  //错误地址处理找不到路径时，就跳转到以上路由之外的路由
  {
    path: '*',
    redirect: '/',
  },
]
// 根据路线，创建路由
const router = new VueRouter({
  routes
})
// 配置全局路由守卫
// to:下一个路由对象
// from:上一个路由对象
// next:拦截路径，是一个回调函数
//next()放行 
//next（‘path路径’） 拦截到指定路径的页面
router.beforeEach((to, from, next) => {
  // debugger;
  // 通过元数据meta,对路由是否放行进行判断，如果验证通过
  if (to.meta.requiresAuth) {
    // 获取本地存储的token
    const token = localStorage.getItem('token')
    if (token) {
      // 如果登陆成功，token就存在,放行
      next();
    } else {
      // 如果是没有登陆，获取不到token,就回到登录页面
      next('/login')
    }
  } else {
    next()
  }
})

// 导出路由模块
export default router
