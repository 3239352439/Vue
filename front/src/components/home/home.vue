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
            <dl v-for="(item) in typeData" :key="item.categoryId" @click="toCategory(item.categoryId,item.categoryName)">
                    <dt><img :src="item.categoryImg2" alt="" />
                    </dt>
                    <dd>{{item.categoryName}}</dd>
            </dl>
            <dl v-if="typeData.length>=1" @click="toClassify">
                    <dt><img :src="allTypeimg" alt="" />
                    </dt>
                    <dd>全部品类</dd>
            </dl>
        </div>

        <div id="list">
            <div class="l_nav">
                <ul>
                    <li v-for="(item,idx) in typeData" :key="idx" class="tabs"><span @click.stop="showList" >{{item.categoryName}}</span></li>
                </ul>
            </div>

            <div class="list">
                  <mt-tab-container v-model="active" :swipeable="true">
                   <mt-tab-container-item v-for="item in typeData" :id="item.categoryName" :key="item.categoryName">
                        <ul class="datalist">
                           <li v-for="(obj,idx) in datalist" :key="idx" :gid="obj.goodId" @click.stop="toDetailPage(obj,$event)">
                            <div>
                                <img v-lazy="obj.ImgUrl"/>
                            </div>
                            <div>
                                <h2>{{obj.goodName}}</h2>
                                <p class="details">{{obj.describe}}</p>
                                <p class="size"><span>{{obj.size}}</span></p>
                                <div class="purchase">
                                    <p><span v-filter>{{obj.Price}}</span><span v-filter>{{obj.originalPrice}}</span></p>
                                       <button class="Addbtn" @click.stop="addCar(obj.goodId,$event)" v-if="orderObj.indexOf(obj.goodId)<0">立即购买</button>
                                        <p class="qty" v-else>
                                        <span class="compute" @click="compute(obj.goodId,idx,$event)">-</span><span class="num" @click="compute(obj.goodId,idx,$event)">1</span><span class="compute">+</span>
                                        </p>
                                </div>

                            </div>
                            </li>
                        </ul>

                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
             <publicMenu></publicMenu>
        </div>
        <div id="allmap" style="width:0;height:0;"></div>

    </div>
</template>
<script>
    import publicMenu from '../publicMenuComponent/publicMenu'
    import { Swipe, SwipeItem, TabContainer, TabContainerItem,MessageBox,Lazyload } from 'mint-ui';
    import http from '../../utils/reqAjax.js'
    import spinner from "../spinnerComponent/spinner"
    import './home.scss'
    export default{
        data(){
            return {
                userid:'',
                url:'home.php',
                typeData:[],
                active:'水果',
                datalist:[],
                showNum:false,
                orderObj:[],
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
                $(e.target).css({'color':"#26a2ff","borderBottom":"3px solid #1754fa"}).parent().siblings('li').find('span').css({'color':"#999999","borderBottom":"none"});
                var tab=e.target.innerText;
                spinner.loadspinner();
                 http.get({url:this.url+"?type="+tab}).then(res=>{
                spinner.closeSpinner();
                this.datalist=res.data;
            });
                this.active=tab;
            },
            toDetailPage(obj,_event){
                if(_event.target.tagName !== 'BUTTON'){
                    this.$router.push({ name: 'detailpage',params: obj});
                }
            },
            toClassify(){
                this.$router.push({ name: 'category'});
            },
            addCar(id,e){
                if(this.userid){
                    http.post({"url":"car1.php",parmas:{userId: this.userid,goodId:id,state: 'addProduct'}}).then ( res => {
                    if( res.data == 'seccese'){
                        // this.ajax();
                        }
                    })
                 }
                 else{
                    //  MessageBox.alert('请先登录！').then(action => {});
                    MessageBox.confirm('用户未登录，是否去登录?').then(action => {
                      if(action == 'confirm'){
                        this.$router.push({name: 'login'})
                      }
                    });
                 }
                },
                  // 商品数量加减
            compute(idx,subItem,event){
              var target = event.target;
              // console.log(subItem)
              // 加
              if(target.innerText == '+'){
                  // this.sum=(target.parentNode.childNodes[1].innerText*1)+1
                  // console.log(this.sum)
                  http.post({"url":"car1.php",parmas:{userId: this.userid,goodId:idx,state: 'addProductTotle'}}).then ( res => {
                  // console.log(res.data)
                  if( res.data == 'seccese'){
                      target.parentNode.childNodes[1].innerHTML = (target.parentNode.childNodes[1].innerText*1)+1;
                  }
                  })
              // 减
              } else if( target.innerText == '-'){
                  // 判断当小于一时提示是否删除
                  if(target.parentNode.childNodes[1].innerText*1 >1){
                  http.post({"url":this.url,parmas:{userId: this.userid,goodId:idx,state: 'subProductTotle'}}).then ( res => {
                  // console.log(res.data)
                      if( res.data == 'seccese'){
                      target.parentNode.childNodes[1].innerHTML = (target.parentNode.childNodes[1].innerText*1)-1;
                      }
                  })
                  } else {
                  // 删除商品
                      http.post({"url":this.url,parmas:{userId: this.userid,goodId:idx,state: 'delProduct'}}).then ( res => {
                          // console.log(this.carprd.splice(aa, 1));
                          this.carprd.splice(subItem, 1);
                          this.ajax();
                      })
                  }
              }

              },
            toCategory(id,name){
              this.$router.push({ name: 'product',params: {id: id,name:name}})
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
        components: {
            publicMenu
        },
        mounted(){
          if(this.$store.state.userId){
              this.userid = this.$store.state.userId;
          } else {
            this.userid = ''
          }
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
            http.get({url:this.url+"?type="+this.active}).then(res=>{
               spinner.closeSpinner();
                this.datalist=res.data;
            });
            // 获取已添加到订单的商品
            http.get({url:this.url+"?uid="+this.userid}).then(res=>{
                var arr=[];

                $.each(res.data,(idx,item)=>{
                    arr.push(item.goodId);
                    this.orderObj=[...new Set(arr)];
                })
            //   console.log(this.orderObj)
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
