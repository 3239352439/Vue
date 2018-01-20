<template>
    <div class="detail_cen">
        <div class="top">
          <mt-header title="商品详情">
            <router-link to="/product" slot="left">
              <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
          </mt-header>
          <!-- <productMenu v-bind:SmallId="name"></productMenu> -->
        </div>
        <div class="bottom">
          <div class="prdInfor">
            <div class="prdImg">
              <img v-bind:src="dataItem.ImgUrl" alt="加载中"/>
            </div>
            <ul>
              <li>size：{{dataItem.size}}</li>
              <li>地区: {{dataItem.productionAddress}}</li>
              <li>温度：{{dataItem.T}}</li>
            </ul>
          </div>
          <div class="more">
            <h1>更多选择</h1>
            <div></div>
          </div>
          <div class="deteils">
            <h1>商品详情</h1>
          </div>
        </div>
    <div class="addCar">
      <div class="carIcom"><i class="glyphicon glyphicon-th"></i><span class="carNum"></span></div><div class="prdNum">收藏<span></span></div><div class="prdprice"><span>￥</span></div><div class="account"><button>去结算</button></div>
      </div>
    </div>
</template>
<script>
export default {
  data: function(){
    return {
      dataItem:''
    }
  },
  mounted(){
    this.dataItem = this.$route.params;
    console.log(this.$route.params)
  }
}
</script>
