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
            <div v-for="obj in dataset" class="goodItem" @click.stop="toDetailPage(obj,$event)" :key="obj.goodId">
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
                <i class="glyphicon glyphicon-th"></i><span class="carNum">{{carNum}}</span></div><div class="prdNum">已选<span>{{prdNum}}</span></div><div class="prdprice"><span>￥{{prdPrice}}</span></div><div class="account"><button>去结算</button>
            </div>
        </div>
    </div>
</template>

<script>
    import './myselect.scss'
    import http from '../../utils/reqAjax';
    
    export default {
        data: function(){
            return {
                url:"myselect.php",
                dataset:[],
                name:'',
                carNum:0,
                prdNum:0,
                prdPrice:0
            }
        },
        mounted(){
            http.get({url:this.url + "?phone=" + this.$store.state.phoneNum}).then(res=>{
                console.log(res)
                this.dataset = res.data;
            })
        },
        methods:{
            addCar(obj){
                http.post({"url":'Car.php',parmas:{userid: this.$store.state.userId,goodId:obj}}).then ( res => {
                    // console.log(res.data[0].Price)
                    this.carNum = res.data[0].totle;
                    this.prdPrice = res.data[0].Price;
                })
                // this.carNum  += this.carNum;
            },
            toDetailPage(obj,_event){
                // console.log()
                if(_event.target.tagName !== 'BUTTON'){
                    this.$router.push({name: 'detailpage',params: obj});
                }
            },
            toCar(){
                console.log(666)
                this.$router.push({ name: 'car'});
            }
        }
    }
</script>

