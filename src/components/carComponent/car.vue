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
        <li>
          <div class="prdImg">
            <input type="checkbox" name="" class="check">
            <img src="../../assets/img/loading.jpg" alt="">
          </div>
          <div class="prdinfor">
            <h3>sss</h3>
            <h4>32933</h4>
            <div class="prdprice">
              <span class="price">价格</span>
              <p><span class="compute">-</span><span class="num">1</span><span class="compute">+</span></p>
            </div>
          </div>
        </li>
         <li>
          <div class="prdImg">
            <input type="checkbox" name="" class="check">
            <img src="../../assets/img/loading.jpg" alt="">
          </div>
          <div class="prdinfor">
            <h3>sss</h3>
            <h4>32933</h4>
            <div class="prdprice">
              <span class="price">价格</span>
              <p><span class="compute">-</span><span class="num">1</span><span class="compute">+</span></p>
            </div>
          </div>
        </li>
          <li>
          <div class="prdImg">
            <input type="checkbox" name="" class="check">
            <img src="../../assets/img/loading.jpg" alt="">
          </div>
          <div class="prdinfor">
            <h3>sss</h3>
            <h4>32933</h4>
            <div class="prdprice">
              <span class="price">价格</span>
              <p><span class="compute">-</span><span class="num">1</span><span class="compute">+</span></p>
            </div>
          </div>
        </li>
          <li>
          <div class="prdImg">
            <input type="checkbox" name="" class="check">
            <img src="../../assets/img/loading.jpg" alt="">
          </div>
          <div class="prdinfor">
            <h3>sss</h3>
            <h4>32933</h4>
            <div class="prdprice">
              <span class="price">价格</span>
              <p><span class="compute">-</span><span class="num">1</span><span class="compute">+</span></p>
            </div>
          </div>
        </li>
          <li>
          <div class="prdImg">
            <input type="checkbox" name="" class="check">
            <img src="../../assets/img/loading.jpg" alt="">
          </div>
          <div class="prdinfor">
            <h3>sss</h3>
            <h4>32933</h4>
            <div class="prdprice">
              <span class="price">价格</span>
              <p><span class="compute">-</span><span class="num">1</span><span class="compute">+</span></p>
            </div>
          </div>
        </li>
          <li>
          <div class="prdImg">
            <input type="checkbox" name="" class="check">
            <img src="../../assets/img/loading.jpg" alt="">
          </div>
          <div class="prdinfor">
            <h3>sss</h3>
            <h4>32933</h4>
            <div class="prdprice">
              <span class="price">价格</span>
              <p><span class="compute">-</span><span class="num">1</span><span class="compute">+</span></p>
            </div>
          </div>
        </li>
      </ul>
      <div class="MayLike">
        <h1>猜你喜欢</h1>
        <ul>
          <li>
            <img src="../../assets/img/loading.jpg" alt="">
            <h4><span>￥23.5</span><span class="glyphicon glyphicon-list-alt"></span></h4>
          </li>
          <li>
            <img src="../../assets/img/loading.jpg" alt="">
            <h4><span>￥23.5</span><span class="glyphicon glyphicon-list-alt"></span></h4>
          </li>
          <li>
            <img src="../../assets/img/loading.jpg" alt="">
            <h4><span>￥23.5</span><span class="glyphicon glyphicon-list-alt"></span></h4>
          </li>
          <li>
            <img src="../../assets/img/loading.jpg" alt="">
            <h4><span>￥23.5</span><span class="glyphicon glyphicon-list-alt"></span></h4>
          </li>
          <li>
            <img src="../../assets/img/loading.jpg" alt="">
            <h4><span>￥23.5</span><span class="glyphicon glyphicon-list-alt"></span></h4>
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
import './car.scss'
export default {
  data: function(){
    return {
      value:[],
      // options:[{
      //   label: '选项A',
      //   value: 'A',
      //   },
      //   {
      //   label: '选项B',
      //   value: 'B',
      //   },
      //   {
      //   label: '选项C',
      //   value: 'C'
      //   },
      //   {
      //   label: '选项D',
      //   value: 'D'
      //   }]
    }
  },
  components: {
    publicMenu
  }
}
</script>
