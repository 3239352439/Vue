<template>
  <div class="account_cen">
    <div class="top">
      <mt-header title="确认订单">
        <!-- <router-link to="/product" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link> -->
      </mt-header>
    </div>
    <div class="account">
      <div class="address">
        <i class="glyphicon glyphicon-map-marker"></i>
        <h2>收货人：张三 <span>15976043004</span></h2>
        <h3>收货地址:广东省广州市从化市  310号</h3>
        <i class="glyphicon glyphicon-chevron-right"></i>
      </div>
      <div class="prdItem">
        <h3>确认商品:<span>共计1件商品</span></h3>
        <ul>
          <li>
            <div class="left">
              <img src="../../assets/img/loading.jpg" alt="">
            </div>
            <div class="center">
              <p>多力葵花油</p>
              <span>5L</span>
            </div>
            <div class="rigth">
              <p>￥123</p>
              <span>X1</span>
            </div>
          </li>
           <li>
            <div class="left">
              <img src="../../assets/img/loading.jpg" alt="">
            </div>
            <div class="center">
              <p>多力葵花油</p>
              <span>5L</span>
            </div>
            <div class="rigth">
              <p>￥123</p>
              <span>X1</span>
            </div>
          </li>
           <li>
            <div class="left">
              <img src="../../assets/img/loading.jpg" alt="">
            </div>
            <div class="center">
              <p>多力葵花油</p>
              <span>5L</span>
            </div>
            <div class="rigth">
              <p>￥123</p>
              <span>X1</span>
            </div>
          </li>
        </ul>
        <div class="totle">
          <h4>小计<span>￥69</span></h4>
          <h4>配送费<span>￥69</span></h4>
          <h4>合计<span>￥69</span></h4>
          <h4>留言：<input type="text" placeholder="卖家留言"></h4>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="priceTotle">合计：￥45</div>
      <div class="pay">
        <button>去支付</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell } from 'mint-ui';
import http from '../../utils/reqAjax';
import './account.scss'
export default {
  data: function(){
    return {

    }
  },
  mounted: function(){

  },
  methods :{

  },
  computed: {
  },
  watch: {

  },
  components: {
  }
}
</script>
