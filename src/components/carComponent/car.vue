<template>
  <div class="car_cen">
    <div class="top">
      <mt-header title="购物车">
        <!-- <router-link to="/product" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link> -->
        <mt-button slot="right" @click="empty">清空</mt-button>
      </mt-header>
    </div>
    <div class="prdItem">
      <ul>
        <li v-for="(obj,idx) in carprd">
          <div class="prdImg">
            <input type="checkbox"  v-bind:id="obj.carId"  class="check" v-bind:value="obj.carId" v-model="checkedCarId" @click="checked($event)">
            <img v-bind:src="obj.ImgUrl" alt="" @click.stop="ToDetailPage(obj,$event)">
          </div>
          <div class="prdinfor">
            <h3 @click.stop="ToDetailPage(obj,$event)">{{obj.goodName}}</h3>
            <h4>{{obj.describe}}</h4>
            <div class="prdprice">
              <span class="price">￥{{obj.Price}}</span>
              <p><span class="compute" @click="compute(idx,$event)">-</span><span class="num">{{obj.count}}</span><span class="compute" @click="compute(idx,$event)">+</span></p>
            </div>
          </div>
        </li>
      </ul>
      <div class="MayLike">
        <!-- <span>Checked names: {{ checkedCarId }}</span> -->
        <h1>猜你喜欢</h1>
        <ul>
          <li v-for="(obj,idx) in randomData" @click.stop="toDetailPage(obj,$event)">
            <img v-bind:src="obj.ImgUrl" alt="">
            <h4><span>￥{{obj.Price}}</span><span class="glyphicon glyphicon-list-alt" v-bind:id="idx"></span></h4>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="car">
        <div class="check">
          <label for="aa">
            <!-- <input type="checkbox" name="" id="aa"> -->
            已选 <span>{{this.$store.state.selectTotle}}</span></label></div>
        <div class="price">￥{{this.$store.state.priceTotle}}</div>
        <div class="count"><button>去结算</button></div>
      </div>
      <publicMenu></publicMenu>
    </div>
  </div>
</template>
<script>
import {Checklist, MessageBox} from 'mint-ui';
import publicMenu from '../publicMenuComponent/publicMenu'
import './car.scss';
import http from '../../utils/reqAjax';

export default {
  data: function(){
    return {
      randomData:[],
      userid:1,
      carprd:[],
      sum:'',
      checkedCarId: [],
      selectTotle:0,
      priceTotle:0
    }
  },
  mounted: function(){
    http.get({"url":'productListSort.php'+'?Sort="random"& state= 1'}).then ( res => {
       this.randomData = res.data;
        // console.log(res.data)
      })
    http.post({"url":'car.php',parmas:{Getprd: this.userid}}).then ( res => {
      // console.log(res.data)
      this.carprd = res.data;
    })
    // this.checkedCarId = this.$store.state.checkedCarId;
    setTimeout(function(){
      for(var i=0; i<this.$store.state.checkedCarId.length; i++){
        var a = document.getElementById(this.$store.state.checkedCarId[i])
        document.getElementById(this.$store.state.checkedCarId[i]).checked=true
        console.log(i,document.getElementById(this.$store.state.checkedCarId[i]))
      }
    }.bind(this),500)

    // console.log(this.$store.state.checkedCarId)
  },
  methods :{
    compute(idx,event){
      var target = event.target;
      console.log(idx)
      if(target.innerText == '+'){
        // this.sum=(target.parentNode.childNodes[1].innerText*1)+1
        // console.log(this.sum)
        target.parentNode.childNodes[1].innerHTML = (target.parentNode.childNodes[1].innerText*1)+1;
      } else if( target.innerText == '-'){
        if(target.parentNode.childNodes[1].innerText*1 >1){
          target.parentNode.childNodes[1].innerHTML = (target.parentNode.childNodes[1].innerText*1)-1;
        } else {
          // console.log('确定要删除?')
          MessageBox.prompt({
            title: '提示',
            message: '是否从购物车中删除?',
            showCancelButton: true
          }).then(confirm => {
              // console.log(666)
              this.carprd.splice(idx, 1)
              // console.log(this.carprd.splice(idx, 1))
              // this.carprd = this.carprd.splice(idx, 1);
          });
        }
      }
      // this.checked(event)
    },
    toDetailPage(obj,_event){
      if(!_event.target.id){
        this.$router.push({ name: 'detailpage',params: obj});
      }
    },
    ToDetailPage(obj,_event){
      // console.log(_event.target.tagName)
        this.$router.push({ name: 'detailpage',params: obj});
      // if(_event.target.tagName !== 'P' || _event.target.tagName !== 'INPUT'){
        // console.log(666)
      // }
    },
    checked(eve){
      var price =eve.target.parentNode.parentNode.children[1].children[2].children[0].innerText.split('￥')[1]*1;

      var items = eve.target.parentNode.parentNode.children[1].children[2].children[1].children[1].innerText*1;
      if(eve.target.checked == true){
        this.$store.commit("getSelectTotle",this.selectTotle)
        this.selectTotle += items;
        this.$store.state.selectTotle = this.selectTotle;
        console.log(this.selectTotle)

        this.priceTotle += items*price.toFixed(2);
        this.$store.state.priceTotle = this.priceTotle;
      } else {
        this.selectTotle -= items;
        this.$store.commit("getSelectTotle",this.selectTotle)
        this.$store.state.selectTotle = this.selectTotle;

        // console.log(this.selectTotle)

        this.priceTotle -= items*price.toFixed(2)
        this.$store.state.priceTotle = this.priceTotle;
      }

      setTimeout(function(){
        console.log(this.checkedCarId);
        this.$store.commit('getCheckedCarId',this.checkedCarId);
        console.log('store',this.$store.state.checkedCarId);
      }.bind(this),1000)

    },
    empty(){
      MessageBox({
        title: '提示',
        message: '确定清空购物车?',
        showCancelButton: true
      }).then(confirm => {
        this.carprd = [];
      });
    }
  },
  computed: {
  },
  watch: {

  },
  components: {
    publicMenu
  }
}
</script>
