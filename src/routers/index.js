import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import Vuex from 'vuex'
import '../../node_modules/mint-ui/lib/style.css'
import search from '../components/searchComponent/search'

import c from '../components/classifyComponent/classify.vue'
import register from '../components/registerComponent/register.vue'

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
        // {
        //     path: '/',
        //     name: 'home',
        //     component: homeComponent
        // }
        {
          path:'/aa',
          name: 'aa',
          component: c
        },
        {
            path:"/register",
            name:"register",
            component: register
        }
    ]
})

export default router;
