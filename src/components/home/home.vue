<template>
    <div id="sm_home">
        <header id="header">
            <div class="h_l">
               <p> <i class="glyphicon glyphicon-map-marker"></i>旧金山旧金山<i class=""></i></p>
            </div>
            <div class="h_r">
                <i class="mintui mintui-search"></i>
                <input type="text" placeholder="1元起送，30分钟达">
            </div>    
        </header>
        <div id="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(n,idx) in 6"><img :src="img[idx]" alt=""></mt-swipe-item>       
            </mt-swipe>
        </div>
        <div id="type">
            <dl v-for="item in typeData">    
                 <a href="">
                    <dt><img :src="item.categoryImg2" alt="" />
                    </dt>
                    <dd>{{item.categoryName}}</dd>
                 </a>
                    
            </dl>
            <dl v-if="typeData.length>=0">    
                 <a href="">
                    <dt><img :src="allTypeimg" alt="" />
                    </dt>
                    <dd>全部品类</dd>
                 </a>       
            </dl>
        </div>
            
        <div id="list">
            <ul class="nav">
                <li v-for="item in typeData">{{item.categoryName}}</li>
            </ul>
            <div class="list">
                  <mt-tab-container v-model="active" :swipeable="true">
                    <mt-tab-container-item id="1" v-for="n in 3">
                        <mt-cell>
                            
                        </mt-cell>
                    </mt-tab-container-item>
                   
            </mt-tab-container>
            </div>
          
        </div>
    </div>
</template>
<script>
    import { Swipe, SwipeItem, TabContainer, TabContainerItem,MessageBox } from 'mint-ui';
    import http from '../../utils/reqAjax.js'
    import spinner from "../spinnerComponent/spinner"
    import './home.scss'
    export default{
        data(){
            return {
                url:'home.php',
                typeData:[],
                active:'1',
                allTypeimg:"./src/assets/img/iconv3/f10.jpg",
                img:["./src/assets/img/banner/1.png","./src/assets/img/banner/2.png","./src/assets/img/banner/3.png","./src/assets/img/banner/4.png","./src/assets/img/banner/5.png","./src/assets/img/banner/6.png",],
                typeImg:"./src/assets/img/iconv3/f1.jpg"
            }
        },
        mounted(){
            spinner.loadspinner();
            http.get({url:this.url}).then(res=>{
                spinner.closeSpinner();
               this.typeData=res.data;
            })
            this.$store.commit('getSite');
        }
    }

</script>