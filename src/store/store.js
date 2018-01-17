import Vue from 'vue'
import Vuex from 'vuex'
import { Indicator } from 'mint-ui';

Vue.use(Vuex);


const store = new Vuex.Store({
    state:{
        loadspinner:function(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
        },
        closeSpinner:function(){
            Indicator.close();
        }
    },
    mutations:{
        
    }
})

export default store;