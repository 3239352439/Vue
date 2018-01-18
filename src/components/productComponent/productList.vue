<template>
  <div class="product_cen">
    <div class="top">
      <mt-header title="搜索框">
        <router-link to="/category" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <productMenu v-bind:SmallId="name"></productMenu>
    </div>
    <div class="product_menu">
      <div v-for="obj in dataset" class="goodItem">
        <div class="left_img">
          <img v-bind:src="obj.ImgUrl" alt="加载中"/>
        </div>
        <div class="right_prd_mess">
          <h3 class="goodName">{{obj.goodName}}</h3>
          <h4 class="goodDescribe">{{obj.describe}}</h4>
          <h4 class="goodSize"><span>{{obj.size}}</span></h4>
          <h4><span class="goodPre">￥{{obj.Price}}</span><span class="goodOrgpre">￥{{obj.originalPrice}}</span><button class="buy">立即购买</button></h4>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import http from '../../utils/reqAjax';
import './productList.scss';
import productMenu from './productMenu';

export default {
  data: function(){
    return {
      categoryId:'1',
      url:"productList.php",
      dataset:[],
      name:''
    }
  },
  mounted(){
    // console.log(this.$route.params.name)
    this.categoryId = this.$route.params.id;
    this.name = this.$route.params.name;
    if(this.categoryId == undefined){
      http.get({"url":this.url}).then ( res => {
        // console.log(res.data);
        this.dataset = res.data;
      })
    } else {
      http.get({"url":this.url+'?categoryId='+this.categoryId}).then ( res => {
        console.log(res.data);
        this.dataset = res.data;
      })
    }

  },
  methods:{

  },
  components:{
    productMenu
  }
}
</script>
