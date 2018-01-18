<template>
  <div class="Menu_cen">
    <ul class="Menu">
      <li @click="type">{{SmallId || all}}</li><li @click="sort">默认排序</li><li @click="filter">商品筛选</li>
    </ul>
    <div class="menus" v-if="status1" >
      <ul class="menus_left">
        <li v-for="(obj) in category" @click="toSmallcategory(obj.categoryId)">{{obj.categoryName}}</li>
      </ul>
      <ul class="menus_right">
        <li v-for="(obj) in cateSamllList" >{{obj.classifyName}}</li>
    </ul>
    </div>
    <div class="sort" v-if="status2">
      <ul>
        <li>默认排序</li>
        <li>价格最低</li>
        <li>价格最高</li>
        <li>折扣最高</li>
        <li>人气最高</li>
      </ul>
    </div>
    <div class="filter" v-if="status3">
        <ul>
          <li>不限</li>
          <li>新品上市</li>
          <li>限时抢购</li>
          <li>疯狂折扣</li>
          <li>新手专享</li>
          <li>今日特价</li>
          <li>实时热卖</li>
          <li>山姆热卖</li>
          <li>超级星期三</li>
        </ul>
        <button>确定</button>
    </div>
  </div>
</template>

<script>
import http from '../../utils/reqAjax';
export default {
  data: function(){
    return {
      url:"category.php",
      category: '',
      status1: false,
      cateSamllList: '',
      status2: false,
      status3: false,
      all: '全部'
    }
  },
  props:['SmallId'],
  methods: {
    type(){
      // console.log(666);
      http.get({"url":this.url}).then( res => {
        this.category = res.data;
        this.toSmallcategory(1);
        // console.log(res.data);
        this.status1 = !this.status1;
        if(this.status2 == true){
          this.status2 = !this.status2;
        }
        if( this.status3 == true ){
          this.status3 = !this.status3;
        }
      });
    },
    toSmallcategory(idx){
      http.get({"url":this.url+"?cateSamll="+idx}).then( res => {
        // console.log(res.data);
        this.cateSamllList = res.data
      })
    },
    sort(){
      this.status2 = !this.status2;
      if(this.status1== true){
        this.status1 = !this.status1
      }
      if( this.status3 == true ){
        this.status3 = !this.status3;
      }
    },
    filter(){
      this.status3 = !this.status3;
      if(this.status1== true){
        this.status1 = !this.status1
      }
      if(this.status2 == true){
        this.status2 = !this.status2;
      }
    }
  }
}
</script>
