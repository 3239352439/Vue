import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import Vuex from 'vuex'
import '../../node_modules/mint-ui/lib/style.css'

import categoryComponent from '../components/classifyComponent/classify.vue'
import productComponent from '../components/productComponent/productList.vue'

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
          path:'/category',
          name: 'category',
          component: categoryComponent
        },
        {
          path: '/product',
          name: 'product',
          component: productComponent
        }
    ]
})

export default router;
