<template>
    <div id="goods" @click="check($event)">
        <datagrid :api="url" :filterCols="filterColumns"></datagrid>
        <el-pagination
        background
        layout="prev, pager, next"
        small
        :page-size=6
        :total="13">
        </el-pagination>
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
                total:"",
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
            check(val){
                if(val.target.tagName.toLowerCase() == "li"){
                    http.get({"url":this.url + "?page=" + val.target.innerText}).then(res=>{
                        this.$children[0].dataset = res.data;
                    })
                }
            },
            search(val){
                http.get({"url":this.url + "?state=search&data=" + val}).then(res=>{
                console.log(res)
                    this.$children[0].dataset = res.data;
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

