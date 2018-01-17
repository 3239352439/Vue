import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import Vuex from 'vuex'

import '../../node_modules/mint-ui/lib/style.css'
import search from '../components/searchComponent/search'

import c from '../components/classifyComponent/classify.vue'
import register from '../components/registerComponent/register.vue'
import getAddress from '../components/getAddressComponent/getAddress.vue'
import autoAddress from '../components/autoAddressComponent/autoAddress.vue'
import addAddress from '../components/addAddressComponent/addAddress.vue'
import '../sass/base.scss'
import rem from '../getRem/getRem.js'
rem.rem();
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
        },
        {
            path:"/register",
            name:"register",
            component: register
        },
        {
            path: '/getAddress',
            name: 'getAddress',
            component: getAddress
        },
        {
            path:'/autoAddress',
            name:'autoAddress',
            component:autoAddress
        },
        {
            path:'/addAddress',
            name:'addAddress',
            component:addAddress
        }
    ]
})

export default router;
