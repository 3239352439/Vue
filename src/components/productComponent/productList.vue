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
      <div v-for="obj in dataset" class="goodItem" @click.stop="toDetailPage(obj,$event)">
        <div class="left_img">
          <img v-bind:src="obj.ImgUrl" alt="加载中"/>
        </div>
        <div class="right_prd_mess">
          <h3 class="goodName">{{obj.goodName}}</h3>
          <h4 class="goodDescribe">{{obj.describe}}</h4>
          <h4 class="goodSize"><span>{{obj.size}}</span></h4>
          <h4><span class="goodPre">￥{{obj.Price}}</span><span class="goodOrgpre">￥{{obj.originalPrice}}</span><button class="buy" @click="addCar(obj.goodId)">立即购买</button></h4>
        </div>
      </div>
    </div>
    <div class="addCar">
      <div class="carIcom" @click="toCar"><i class="glyphicon glyphicon-shopping-cart"></i><span class="carNum">{{carNum}}</span></div><div class="prdNum">已选<span>{{prdNum}}</span></div><div class="prdprice"><span>￥{{prdPrice}}</span></div><div class="account"><button>去结算</button></div>
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
      name:'',
      carNum:0,
      prdNum:0,
      prdPrice:0,
      userid:1
    }
  },
  mounted(){
    console.log(this.$store.state.checkedCarId);
    this.prdNum = this.$store.state.selectTotle;
    this.prdPrice =  this.$store.state.priceTotle;

    // console.log(this.$route.params.name)
    this.categoryId = this.$route.params.id;
    this.name = this.$route.params.name;
    if(this.categoryId == undefined){
      this.ajax();
    } else {
      this.ajax(this.categoryId)
    }
    http.post({"url":'Car.php',parmas:{userid: this.userid}}).then ( res => {
      // console.log(res.data[0].Price)
      this.carNum = res.data[0].totle;
      // this.prdPrice = res.data[0].Price;
    })
  },
  computed: {
    // reverseprdPrice:{
    // console.log('a',this.prdPrice.toFixed(2))
    // return this.prdPrice;
    //   get: function(){
    //     return this.prdPrice;
    //   },
    //   set: function(newValue){
    //     this.prdPrice = newValue;
    // console.log(this.prdPrice)
    //   }
    // }
  },
  methods:{
    // 二次封装ajax请求
    ajax(_param){
      if(_param){
        http.get({"url":this.url+'?categoryId='+_param}).then ( res => {
          this.dataset = res.data;
        })
      } else {
        http.get({"url":this.url}).then ( res => {
          this.dataset = res.data;
        })
      }
    },
    addCar(obj){
      // console.log(obj);
      http.post({"url":'Car.php',parmas:{userid: this.userid,goodId:obj}}).then ( res => {
        // console.log(res.data[0].Price)
        this.carNum = res.data[0].totle;
        this.prdPrice = res.data[0].Price;
      })
      // this.carNum  += this.carNum;
    },
    toDetailPage(obj,_event){
      // console.log()
      if(_event.target.tagName !== 'BUTTON'){
        this.$router.push({ name: 'detailpage',params: obj});
      }
    },
    toCar(){
      this.$router.push({ name: 'car'});
    }
  },
  watch: {
    // 监听子组件是否改变categoryId
    categoryId: function( newval, oldval){
      // console.log(newval,oldval);
      this.ajax(this.categoryId)
    }
  },
  components:{
    productMenu
  }
}
</script>
