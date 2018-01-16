<template>
    <div id="sm_search">
        <div class="header">
           <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
         <mt-search class="h_center"
             v-model="value"
              placeholder="搜索">
         
        </mt-search>
        <mt-button icon="search" slot="right" @click="skip"></mt-button>
        </div>
        <div class="main">
            <div class="hostory" v-if="result.length>0">
                <h3>历史搜索<i class="glyphicon glyphicon-trash" @click="removesAll"></i></h3>
                <ul class="show" >
                  <li @click.stop="getValue" v-for="item in result">{{item}}</li>
                </ul>
            </div>
            <div class="hot">
                <h3>热门搜索</h3>
                <ul class="show" @click.stop="getValue">
                  <li>草莓</li>
                  <li>烤肉</li>
                </ul>
            </div>

        </div>
        
     </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import './search.scss'
    export default{
        data(){
            return {
                 value:"",
                 result:[]
            }
        },
        methods:{
            unique(arr){//去重
          　　var res =[];
          　　var json = {};
          　　for(var i=0;i<arr.length;i++){
          　　　　if(!json[arr[i]]){
          　　　　　　res.push(arr[i]);
          　　　　　　json[arr[i]] = 1;
          　　　　}
          　　}
          　　return res;
            },
            skip(){
                if(this.value){
                  this.result.push($.trim(this.value));
                  this.result=(this.unique(this.result));
                  // 直接跳转列表页面
                  // this.$router.push({name: ''});
                }
            },
            getValue(e){
              var tag=e.target.tagName.toLowerCase();
              if(tag=="li"){
                this.value=e.target.innerText; 
                // 直接跳转列表页面
                // this.$router.push({name: ''});        
                
              }
            },
            removesAll(){
                MessageBox.confirm('确定删除全部历史搜索记录?').then(action => {
                  this.result=[];
                  
              });
                
            }
        }
    }
   
</script>