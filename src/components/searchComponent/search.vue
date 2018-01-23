<template>
    <div id="sm_search">
        <div class="header">
           <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
          </router-link>
         <mt-search class="h_center"
              placeholder="搜索"
              >        
        </mt-search>
        <mt-button icon="search" slot="right" @click="skip"></mt-button>
        </div>
        <div class="main" @click.stop="getValue">
            <div class="hostory" v-if="result.length>0">
                <h3>历史搜索<i class="glyphicon glyphicon-trash" @click="removesAll"></i></h3>
                <ul class="show" >
                  <li v-for="(item,idx) in result">{{item}}</li>
                </ul>
            </div>
            <div class="hot">
                <h3>热门搜索</h3>
                <ul class="show" >
                  <li v-for="item in hot" >{{item}}</li>
                </ul>
            </div>

        </div>
        
     </div>
</template>

<script>
    import { MessageBox,Header } from 'mint-ui';
    import './search.scss'
    export default{
        data(){
            return {
                 result:[],
                 hot:['草莓','车厘子','烘焙','洗发水','肉','水果','烧烤','薯片','三文鱼','鱼','虾']
            }
        },
        methods:{
            skip(){
                if($('.mint-searchbar-core').val()){
                  this.result.push($.trim($('.mint-searchbar-core').val()));
                  // 去重
                  this.result=[... new Set(this.result)];
                  // 直接跳转列表页面
                  // this.$router.push({name: ''});
                }
            },
            getValue(e){
              var tag=e.target.tagName.toLowerCase();            
              if(tag=="li"){   
                $('.mint-searchbar-core').val(e.target.innerText)
              //   // 直接跳转列表页面
              //   // this.$router.push({name: ''});        
                
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