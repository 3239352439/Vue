import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import Vuex from 'vuex'

import '../../node_modules/mint-ui/lib/style.css'
import '../sass/base.scss'
import search from '../components/searchComponent/search'

import c from '../components/classifyComponent/classify.vue'
import register from '../components/registerComponent/register.vue'
import login from '../components/loginComponent/login.vue'
import rapid from '../components/rapidComponent/rapid.vue'
import loginParent from '../components/loginParentComponent/loginParent.vue'

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
                },
                {
                    path: "/rapid",
                    name: "rapid",
                    component: rapid
                }
            ]
        },
        
    ]
})

export default router;
