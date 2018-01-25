<template>
    <div id="order">
        
        <table v-if="dataset.length > 0" class="table table-bordered table-condensed table-hover table-striped">
            <thead>
                <tr>
                    <th v-for="(value, idx) in data" :key="idx">{{value}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(object, index) in dataset" :key="index">
                    <td v-for="(value, key) in object" :key="key">{{object[key]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import http from '../../utils/reqAjax.js'
    import './order.scss'
    export default {
        data(){
            return{
                dataset:[],
                data:['订单ID','用户手机号','订单状态','订单添加时间'],
                status:['待支付','已付款','待收货','确认收货','待评价','已完成','已取消'],
                url:'order.php',
                num:''
            }
        },
        mounted(){
            this.$parent.show = false;
            http.get({"url":this.url}).then(res=>{
                for(var i=0;i<res.data.length;i++){
                    res.data[i].status = this.status[res.data[i].status];
                }
                this.dataset = res.data;
            })
        },
        methods:{
            search(val){
                if(val == "待支付"){
                    val = 0;
                }else if(val == "已付款" ){
                    val = 1;
                }else if(val == "待收货" ){
                    val = 2;
                }else if(val == "确认收货" ){
                    val = 3;
                }else if(val == "待评价" ){
                    val = 4;
                }else if(val == "已完成" ){
                    val = 5;
                }else if(val == "已取消" ){
                    val = 6;
                }
                http.get({"url":this.url + "?state=search&data=" + val}).then(res=>{
                console.log(res)
                for(var i=0;i<res.data.length;i++){
                    res.data[i].status = this.status[res.data[i].status];
                }
                this.dataset = res.data;
            })
            }
        }

    }
</script>
