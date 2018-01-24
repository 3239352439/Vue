<template>
    <div id="order">
        <!-- <div class="search">
            <el-input
            placeholder="请输入内容"
            v-model="num"
            clearable>
            </el-input>
            <el-button type="primary" @click="search">搜索</el-button>
        </div> -->
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
                url:'http://10.3.136.49:555/order.php',
                num:''
            }
        },
        mounted(){
            this.$parent.show = false;
            http.get({"url":this.url}).then(res=>{
                console.log(res)
                for(var i=0;i<res.data.length;i++){
                    res.data[i].status = this.status[res.data[i].status];
                }
                this.dataset = res.data;
            })
        },
        methods:{
            search(val){
                // if(this.num == "待" || this.num == "支" || this.num == "付" || this.num == "待支" || this.num == "支付" || this.num == "待支付"){
                //     this.num = 0;
                // }
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
