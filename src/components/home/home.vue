<template>
    <div id="sm_home">
        <header id="header">
            <div class="h_l">
               <p @click.stop="kipGet"> <i class="glyphicon glyphicon-map-marker"></i>{{$store.state.site}}<i class=""></i></p>
            </div>
            <div class="h_r">
                <i class="mintui mintui-search"></i>
                <input class="kipSearch" type="text" placeholder="1元起送，30分钟达">
            </div>    
        </header>
        <div id="banner">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(n,idx) in 6" :key="n"><img :src="img[idx]" alt=""></mt-swipe-item>       
            </mt-swipe>
        </div>
        <div id="type">
            <dl v-for="(item) in typeData" :key="item.categoryId">    
                    <dt><img :src="item.categoryImg2" alt="" />
                    </dt>
                    <dd>{{item.categoryName}}</dd>            
            </dl>
            <dl v-if="typeData.length>=1">    
                    <dt><img :src="allTypeimg" alt="" />
                    </dt>
                    <dd>全部品类</dd>      
            </dl>
        </div>
            
        <div id="list">
            <div class="l_nav">
                <ul class="tabs">
                    <li v-for="(item,idx) in typeData" :key="idx" class="tabs"><span @click.stop="showList" >{{item.categoryName}}</span></li>
                </ul>
            </div>
            
            <div class="list">
                  <mt-tab-container v-model="active" :swipeable="true">
                   <mt-tab-container-item v-for="item in typeData" :id="item.categoryName" :key="item.categoryName">
                        <ul class="datalist">
                           <li v-for="obj in datalist" :key="obj.goodName" :gid="obj.goodId">
                            <div>
                                <img v-lazy="obj.ImgUrl"/>
                            </div>                           
                            <div>
                                <h2>{{obj.goodName}}</h2>
                                <p class="details">{{obj.describe}}</p>
                                <p class="size"><span>{{obj.size}}</span></p>
                                <div class="purchase"><p><span v-filter>{{obj.Price}}</span><span v-filter>{{obj.originalPrice}}</span></p>
                                   <button>立即购买</button> 
                                </div>

                            </div>
                            </li> 
                        </ul>
                        
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
          
        </div>
    <div id="allmap"></div>  
    </div>
</template>
<script>
    import { Swipe, SwipeItem, TabContainer, TabContainerItem,MessageBox,Lazyload } from 'mint-ui';
    import http from '../../utils/reqAjax.js'
    import spinner from "../spinnerComponent/spinner"
    import './home.scss'
    export default{
        data(){
            return {
                url:'home.php',
                typeData:[],
                active:'水果',
                datalist:[],
                allTypeimg:"./src/assets/img/iconv3/f10.jpg",
                img:["./src/assets/img/banner/1.png","./src/assets/img/banner/2.png","./src/assets/img/banner/3.png","./src/assets/img/banner/4.png","./src/assets/img/banner/5.png","./src/assets/img/banner/6.png",],
                typeImg:"./src/assets/img/iconv3/f1.jpg"
            }
        },
        methods:{
            kipGet(){
                this.$router.push({name:"getAddress"});
            },
            showList(e){
                $(e.target).addClass('active').parent().siblings('li').find('span').removeClass('active');
                var tab=e.target.innerText;
                spinner.loadspinner();
                 http.get({url:this.url+"?type="+tab}).then(res=>{
                spinner.closeSpinner(); 
                this.datalist=res.data;
            });
                this.active=tab;
            }
        },
        directives:{
            filter:{
                inserted(ele){
                    var text="￥"+ele.innerText;
                    $(ele).html(text);
                }
                
             }
        },
        computed:{
            get(){

            },
            set(){

            }
        },
        mounted(){  
            var li=$('.tabs').children("li").get(0);console.log(li)
            li.children().addClass('active');
            spinner.loadspinner();
            http.get({url:this.url}).then(res=>{
                // spinner.closeSpinner();
               this.typeData=res.data;
            });
            this.$store.commit('getSite');
            var input=$('.kipSearch');
            input.focus(()=>{
                this.$router.push({name:"search"});
            });
             spinner.loadspinner();
            http.get({url:this.url+"?type="+this.active}).then(res=>{
               spinner.closeSpinner(); 
                this.datalist=res.data;
            });
            // 吸顶导航
            nav();
            function nav(){
                    var height=0;
                    var headerH=$("#header").height();
                    var bannerH = $("#banner").height();
                    height=headerH+bannerH;
                    $(window).scroll(function() {
                        var w = $("body").scrollTop() || $(document).scrollTop(); //获取滚动值
                            if(w > height) {
                    $(".l_nav").addClass("titleTap");
                            } else if(w <= 0){
                    $(".l_nav").removeClass("titleTap")
                            }else{
                    $(".l_nav").removeClass("titleTap")
                            }
                });
            }
        }
    }

</script>