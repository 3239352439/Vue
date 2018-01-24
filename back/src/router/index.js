import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginComponent from '../components/login/login.vue'
import root from '../components/RootComponent/RootComponent.vue'
import service from '../components/ServerComponent/ServerComponent.vue'
import order from '../components/orderComponent/order.vue'

Vue.use(VueRouter);

var router = new VueRouter({
    routes:[
        {
            path: '/',
            name: '',
            component: LoginComponent
        },{
            path: '/root',
            name: 'root',
            component: root,
            children:[
                {
                    path: '/service',
                    name: 'service',
                    component: service,
                },
                {
                    path: '/order',
                    name: 'order',
                    component: order,
                }
            ]
        }
    ]
 })
export default router;