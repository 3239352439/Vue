<template>
    <div id="sm_get">
        <div class="get_header">
            <mt-header title="选择配送地址">
              <router-link to="/" slot="left">
                <mt-button icon="back" @click.stop.prevent="reBack">返回</mt-button>
              </router-link>
        </mt-header> 
        </div> 
        <div class="searchAddr">
            <mt-search
              v-model="value"
              cancel-text="取消"
              placeholder="搜索">
            </mt-search>
        </div>
        <div class="get_main">
            <div class="address" @click.stop="kipAuto">
                <p><i class="glyphicon glyphicon-screenshot"></i>定位到当前位置<i class="glyphicon glyphicon-chevron-right"></i></p>
            </div>
            <div class="get_footer" @click="kipAdd">添加收货地址</div>
            <div class="myAddress">
                <h4><i class="glyphicon glyphicon-map-marker"> </i>我的配送地址</h4>
                <ul class="addressList">
                    <li>
                        
                    </li>
                </ul> 
            </div>
           
        </div>

    </div>
</template>
<script>
import { Spinner,Search} from 'mint-ui';
    import './getAddress.scss'
    export default{
        data(){
            return {
                value:''
            }
        },
        methods:{
            kipAdd(){
                this.$router.push({name:'addAddress'});
            },
            kipAuto(){
                this.$router.push({name:'autoAddress'});
            },
            reBack(e){
                 var tag=e.target.tagName.toLowerCase(); 
                 if(tag=="button"){
                     this.$router.back(-1); 
                 }
            }
        }
    }

</script>