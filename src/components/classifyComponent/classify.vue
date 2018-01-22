<template>
  <div class="category_cen">
    <mt-header title="分类">
      <mt-button slot="right">搜索</mt-button>
    </mt-header>
    <div class="menu">
      <ul class="left">
        <li v-for="(obj,idx) in category" @click="toSmallcategory(obj)">{{obj}}</li>
      </ul>
      <div class="right">
        <div class="cateBigImg">
          <img v-if="cateSamllList[1]" v-bind:src="cateSamllList[0].categoryImg" alt="加载中"/>
        </div>
        <div class="menus">
          <div class="menusItem" v-for="(obj,idx) in cateSamllList"  v-bind:data-SmallId="obj.classifySmallId"  @click="toProduct({id:obj.classifySmallId,name:obj.classifyName},$event)">
            <img v-bind:src="obj.classifyImg" alt="加载中"/>
            <span>{{obj.classifyName}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './classify.scss';
import http from '../../utils/reqAjax'

export default {
  data: function(){
    return {
      category:[],
      categoryIdx:[],
      url: "category.php",
      cateSamll:'1',
      categoryList:'',
      cateSamllList:[]
    }
  },
  mounted(){
    http.get({"url":this.url}).then( res => {

      if(res.data){
        this.categoryList = res.data;
        this.catesm('水果');
        res.data.forEach(function(item){
          if( this.category.indexOf(item.categoryName) == -1){
            this.category.push(item.categoryName);
          }
        }.bind(this))
      }
    });
  },
  methods:{
    toSmallcategory(idx){
      this.catesm(idx)
    },
    catesm(name){
      this.cateSamllList = [];
      if(this.categoryList){
        this.categoryList.forEach( item => {
          if(item.categoryName == name){
            this.cateSamllList.push(item)
          }
        })
      }
    },
    toProduct(obj,_event){
      // console.log(obj)
      this.$router.push({ name: 'product',params: obj});
    }
  }
}
</script>
