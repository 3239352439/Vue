import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import Vuex from 'vuex'
import '../../node_modules/mint-ui/lib/style.css'

import c from '../components/classifyComponent/classify.vue'

Vue.use(Vuex);
Vue.use(MintUI);
Vue.use(VueRouter);

var router = new VueRouter({
    routes:[
        // {
        //     path: '/',
        //     name: 'home',
        //     component: homeComponent
        // }
        {
          path:'/aa',
          name: 'aa',
          component: c
        }
    ]
})

export default router;
