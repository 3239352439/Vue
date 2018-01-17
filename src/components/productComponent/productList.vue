<template>
  <div>
    <mt-header title="搜索框">
      <router-link to="/category" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <productMenu :SmallId="name"></productMenu>
    <div v-for="obj in dataset">
      <div class="left_img">
        <img v-bind:src="obj.ImgUrl" alt="加载中"/>
      </div>
      <div class="right_prd_mess">
        {{obj.goodName}}
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
      name: '',
      url:"productList.php",
      dataset:[]
    }
  },
  mounted(){
    console.log(this.$route.params.classifySmallId)
    this.categoryId = this.$route.params.classifySmallId;
    this.name = this.$route.params.name;
    if(this.categoryId == undefined){
      http.get({"url":this.url}).then ( res => {
        console.log(res.data);
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
