// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
//引入组件库
import Vant from "vant";
import {Toast} from 'vant';

import axios from "axios";
// axios 设定基准路径
axios.defaults.baseURL ="http://127.0.0.1:3000"

//axios 拦截器 响应拦截器
axios.interceptors.response.use((res)=>{
  const {message,statusCode} =res.data;
  console.log('数据被拦截了',statusCode,message);
  if(message && statusCode == 401){
    Toast.fail(message)
  }
  // token错误或过期时跳转回登陆页面
  if(message == '用户信息验证失败'){
    router.push('./login');
  }
  return (res)
})
// 绑定到原型
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000";

//注册组件库
Vue.use(Vant);
//引入组件样式文件
import "vant/lib/index.css";

Vue.config.productionTip = false;


// 添加路由导航守卫
router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('token');
  // pagesNeedAuth.indexOf(srt) 这个方法可以在数组中搜索一个字符串然后返回索引值
  // 如果字符串在数组中不存在，返回-1
  // 所以如果返回值大于等于0 证明存在于数组中，则进行权限验证
  const pagesNeedAuth = [
    '/editprofile',
    '/profile',
  ]
  // 去个人中心的逻辑
  if(pagesNeedAuth.indexOf(to.path) >= 0){
    if(token){
      next();
    }else{
      // next('/login');
      router.push({
        path:'/login'
      })
    }
  }else{
    // 去其他页面的逻辑
    next();
  }
})


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
