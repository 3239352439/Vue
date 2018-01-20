<template>
  <div class="car_cen">
    <div class="top">
      <mt-header title="购物车">
        <!-- <router-link to="/product" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link> -->
        <mt-button slot="right">清空</mt-button>
      </mt-header>
    </div>
    <div class="prdItem">
      <ul>
        <li v-for="(obj,idx) in carprd" >
          <div class="prdImg">
            <input type="checkbox" name="" class="check">
            <img v-bind:src="obj.ImgUrl" alt="">
          </div>
          <div class="prdinfor">
            <h3>{{obj.goodName}}</h3>
            <h4>{{obj.describe}}</h4>
            <div class="prdprice">
              <span class="price">{{obj.Price}}</span>
              <p v-bind:id="idx"><span class="compute">-</span><span class="num">{{sum ||obj.count}}</span><span class="compute" @click="compute_add($event)">+</span></p>
            </div>
          </div>
        </li>
      </ul>
      <div class="MayLike">
        <h1>猜你喜欢</h1>
        <ul>
          <li v-for="obj in randomData">
            <img v-bind:src="obj.ImgUrl" alt="">
            <h4><span>￥{{obj.Price}}</span><span class="glyphicon glyphicon-list-alt"></span></h4>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="car">
        <div class="check"><label for="aa"> <input type="checkbox" name="" id="aa">已选 <span>0</span></label></div>
        <div class="price">￥23</div>
        <div class="count"><button>去结算</button></div>
      </div>
      <publicMenu></publicMenu>

    </div>
  </div>
</template>
<script>
import {Checklist} from 'mint-ui';
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
      aa:''
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
  },
  methods :{
    compute_add(event){
      var target = event.target;
      console.log(target)
      if(target.innerText == '+'){
        console.log(event)

      }
      // console.log('event',event.target.parentNode.children[1].innerText);
      // this.aa = event.target;
      // var id = target.parentNode.getAttribute('id');

      // var a = document.getElementById(id).
      // console.log(a)
      // this.sum = (event.target.parentNode.children[1].innerText*1)+1

      // console.log('sum',this.sum)
    }
  },
  computed: {

  },
  components: {
    publicMenu
  }
}
</script>
