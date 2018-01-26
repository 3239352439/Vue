<template>
    <div id="myselect">
        <div class="top">
            <mt-header title="我的收藏">
                <router-link to="/my" slot="left">
                <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <div class="product_menu">
            <div v-for="obj in dataset" class="goodItem" @click.stop="toDetailPage(obj.goodId,$event)" :key="obj.goodId">
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
            <div class="carIcom" @click="toCar">
                <i class="glyphicon glyphicon-th"></i><span class="carNum">{{carNum}}</span></div><div class="prdNum">已选<span>{{prdNum}}</span></div><div class="prdprice"><span>￥{{prdPrice}}</span></div><div class="account"><button @click="toAccount">去结算</button>
            </div>
        </div>
    </div>
</template>

<script>
    import './myselect.scss'
    import http from '../../utils/reqAjax';
    import spinner from "../spinnerComponent/spinner"
    import { MessageBox} from 'mint-ui';

    export default {
        data: function(){
            return {
                categoryId:'1',
                url:"myselect.php",
                dataset:[],
                name:'',
                carNum:0,
                prdNum:0,
                prdPrice:0,
                userid:1
            }
        },
        mounted(){
            this.userid = this.$store.state.userId;
            this.prdNum = this.$store.state.selectTotle;
            this.prdPrice =  this.$store.state.priceTotle;
            // console.log(this.$route.params.name)
            this.categoryId = this.$route.params.id;
            this.name = this.$route.params.name;
            http.get({url:this.url + "?phone=" + this.$store.state.phoneNum}).then(res=>{
                // console.log(res)
                this.dataset = res.data;
            });
            http.post({"url":'car1.php',parmas:{userId: this.$store.state.userId,state: 'selectprdCount'}}).then ( res => {
                // console.log(res.data[0].Price)
                this.carNum = res.data[0].totle;
                // this.prdPrice = res.data[0].Price;
                //  spinner.closeSpinner();
            })
            http.post({"url":'car1.php',parmas:{userId: this.userid,state: 'selectprdCount'}}).then ( res => {
            // console.log(res.data[0].Price)
            this.carNum = res.data[0].totle;
            // this.prdPrice = res.data[0].Price;
            })
            this.ajaxCar()
        },

        methods:{
            // 二次封装ajax请求
            // ajax(_param){
            // if(_param){
            //     http.get({"url":this.url+'?categoryId='+_param}).then ( res => {
            //     this.dataset = res.data;
            //     })
            // } else {
            //     http.get({"url":this.url}).then ( res => {
            //     this.dataset = res.data;
            //     })
            // }
            // },
            ajaxCar(){
            // 请求用户购物车的商品
            http.post({"url":'car1.php',parmas:{userId: this.userid,state: 'selectproduct'}}).then ( res => {
            // console.log(res.data)
            this.carprd = res.data;
            var selectTotle=0;
            var priceTotle = 0;
            for(var i=0; i< res.data.length; i++){
                if(res.data[i].checkedstatus == 'true'){
                selectTotle += res.data[i].count*1;
                priceTotle += res.data[i].Price*1*res.data[i].count*1;
                // console.log('i',i,priceTotle)
                }
            }

            this.$store.commit("getSelectTotle",selectTotle)
            this.$store.commit("getPriceTotle",priceTotle.toFixed(2));
            // console.log('a',this.$store.state.priceTotle)
            })
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
            toDetailPage(prdId,_event){
            // console.log()
            if(_event.target.tagName !== 'BUTTON'){
                this.$router.push({ name: 'detailpage',params: {id: prdId}});
            }
            },
            toCar(){
                // console.log(666)
                this.$router.push({ name: 'car'});
            },
            addCar(obj){
                spinner.loadspinner();
                // console.log(obj);
                http.post({"url":'Car.php',parmas:{userid: this.userid,goodId:obj}}).then ( res => {
                    // console.log(res.data[0].Price)
                    this.carNum = res.data[0].totle;
                    this.prdPrice = res.data[0].Price;
                    spinner.closeSpinner();
                })
                // this.carNum  += this.carNum;
            },
            toAccount(){
                // this.$router.push({ name: 'account'});
                 var totle =0;
              http.post({"url":this.url,parmas:{userId: this.userid,state: 'selectproduct'}}).then ( res => {
                // console.log(res.data)
                this.goods = res.data;
                for(var i=0; i< this.goods.length; i++){
                  // console.log(res.data[i].checkedstatus)
                  if(res.data[i].checkedstatus == 'true'){
                    totle++;
                  }
                }
                // console.log('totle',totle)
                if(totle <= 0){
                  MessageBox('提示', '你还未选择商品');
                } else {
                  this.$router.push({ name: 'account'});
                }
              });
            }
        }
    }
</script>

