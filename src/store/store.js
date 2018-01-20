import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


const store = new Vuex.Store({
    state:{
        phoneNum:"",
        categoryId:""
    },
    mutations:{
        createPhone(state,val){
            state.phoneNum = val;
        },
        getCategoryId(state, val){
          state.categoryId = val;
        }
    }
})

export default store;
