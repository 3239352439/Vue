<template>
  <div class="Menu_cen">
    <ul class="Menu">
      <li @click="type">{{SmallId || all}}</li><li @click="sort">默认排序</li><li @click="filter">商品筛选</li>
    </ul>

    <div class="menus" v-if="status1" >
      <div class="menus_left">
        <div v-for="(obj) in category" @click="toSmallcategory(obj)">{{obj}}</div>
      </div>
      <ul class="menus_right">
        <li v-for="(obj) in cateSamllList" >{{obj.classifyName}}</li>
    </ul>
    </div>
    <div class="sort" v-if="status2">

        <div class="sortItem"><span>默认排序</span></div>
        <div class="sortItem"><span>价格最低</span></div>
        <div class="sortItem"><span>价格最高</span></div>
        <div class="sortItem"><span>折扣最高</span></div>
        <div class="sortItem"><span>人气最高</span></div>

    </div>
    <div class="filter" v-if="status3">
        <div class="top">
          <div class="filterItem"><span>不限</span></div>
          <div class="filterItem"><span>新品上市</span></div>
          <div class="filterItem"><span>限时抢购</span></div>
          <div class="filterItem"><span>疯狂折扣</span></div>
          <div class="filterItem"><span>新手专享</span></div>
          <div class="filterItem"><span>今日特价</span></div>
          <div class="filterItem"><span>实时热卖</span></div>
          <div class="filterItem"><span>山姆热卖</span></div>
          <div class="filterItem"><span>超级星期三</span></div>
        </div>
        <div class="filterBtn"><span>清除筛选</span><button>确定</button></div>

    </div>
  </div>
</template>

<script>
import http from '../../utils/reqAjax';
export default {
  data: function(){
    return {
      url:"category.php",
      category: [],
      status1: false,
      cateSamllList: '',
      status2: false,
      status3: false,
      all: '全部'
    }
  },
  props:['SmallId'],
  mounted(){

  },
  methods: {
    type(){
      http.get({"url":this.url}).then( res => {
        if(res.data){
          this.categoryList = res.data;
          this.catesm('水果');
          res.data.forEach(function(item){
            if( this.category.indexOf(item.categoryName) == -1){
              this.category.push(item.categoryName);
            }
          }.bind(this))
          // console.log(this.category)
        }

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
        // console.log(this.cateSamllList)
      }
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
