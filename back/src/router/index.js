import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginComponent from '../components/login/login.vue'

Vue.use(VueRouter);

var router = new VueRouter({
    routes:[
    {
        path: '/' ||'/login',
        name: '' || 'login',
        component: LoginComponent
    }
    ]
 })
export default router;