import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


const store = new Vuex.Store({
    state:{
        phoneNum:"",
    },
    mutations:{
        createPhone(state,val){
            state.phoneNum = val;
        }
    }
})

export default store;