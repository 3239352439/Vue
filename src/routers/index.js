import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import Vuex from 'vuex'

import '../../node_modules/mint-ui/lib/style.css'
import search from '../components/searchComponent/search'

import c from '../components/classifyComponent/classify.vue'
import register from '../components/registerComponent/register.vue'
<<<<<<< HEAD
import login from '../components/loginComponent/login.vue'
import loginParent from '../components/loginParentComponent/loginParent.vue'
=======
import '../sass/base.scss'
>>>>>>> a9089c3ed7dbd9de3568bfc137a0c26c4a7f4884

Vue.use(Vuex);
Vue.use(MintUI);
Vue.use(VueRouter);

var router = new VueRouter({
    routes:[
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
          path:'/aa',
          name: 'aa',
          component: c
        },{
            path: '/loginParent',
            name: 'loginParent',
            component: loginParent,
            children:[
                {
                    path: "/register",
                    name: "register",
                    component: register
                },
                {
                    path: "/login",
                    name: "login",
                    component: login
                }
            ]
        },
        
    ]
})

export default router;
