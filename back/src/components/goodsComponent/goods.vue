<template>
    <div id="goods">
        <datagrid :api="url" :filterCols="filterColumns"></datagrid>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 20, 100]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="qty">
            </el-pagination>
    </div>
    </div>
</template>

<script>
    import datagrid from "../datagridL/datagridL.vue";
    import http from "../../utils/reqAjax";
    import './goods.scss'
    export default {
        data(){
            return{
                url:"goodsB.php",
                qty:0,
                currentPage4: 4,
                limit:6,
                page:1,
                filterColumns:['capacity','describe','classifySmallId','productionAddress']
            }
        },
        components:{
            datagrid
        },
        mounted(){
            this.$parent.show = true;
        },
        methods:{
            handleSizeChange(val) {
                console.log(123)
                this.limit = val;
                http.get({"url":this.url + "?page=" + this.page + "&limit=" + val}).then(res=>{
                    this.$children[0].dataset = res.data.data1;
                })
            },
            handleCurrentChange(val) {
                console.log(222)
                this.page = val;
                http.get({"url":this.url + "?page=" + val + "&limit=" + this.limit}).then(res=>{
                    this.$children[0].dataset = res.data.data1;
                })
            },
            search(val){
                http.get({"url":this.url + "?state=search&data=" + val}).then(res=>{
                    this.$children[0].dataset = res.data.data1;
                    this.qty = res.data.data2.qty;
                })
            },
            updated(val){
                val.state = 'add';
                var str = '?';
                for(var attr in val){
                    str += attr + '=' + val[attr] + "&";
                }
                str = str.slice(0,str.length-1);
                http.get({url:"goodsB.php" + str}).then(res=>{
                    console.log(res)
                })
            }
        }
    }
</script>

