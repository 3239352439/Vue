<template>
    <div id="pay">
        <mt-header title="在线支付">
            <mt-button icon="back" slot="left" @click="goback"></mt-button>
        </mt-header>
        <div>
            <p>订单编号：<span>{{$route.params.orderId}}</span></p>
            <p>支付金额：<span>{{"￥" + ($route.params.totle || $route.params.price)}}</span></p>
            <mt-button type="primary" @click="payMoney">确认支付</mt-button>
        </div>
    </div>
</template>

<script>
    import { Header,Button,MessageBox } from 'mint-ui';
    import http from "../../utils/reqAjax"
    import "./pay.scss"
    export default {
        data(){
            return{

            }
        },
        methods:{
            goback(){
                this.$router.push({name: 'order'});
            },
            payMoney(){
                MessageBox.confirm('确定执行此操作?').then(action => {
                    http.get({url:"order.php?phone=" + this.$store.state.phoneNum + "&status=1&state=update&orderId=" + this.$route.params.orderId}).then(res=>{
                        console.log(res)
                        if(res.data == "ok"){
                            this.$router.push("/order");
                        }
                    })
                });
            }
        }

    }
</script>

