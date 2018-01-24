<template>
<div id="sm_login">
    <div class="cotn_principal" :style="bgimg">
        <div class="cont_centrar">
            <div class="cont_login">
            <div class="cont_info_log_sign_up">
                <div class="col_md_login">
                <div class="cont_ba_opcitiy">
                    <h2>LOGIN</h2>
                    <p>The best preparation for tomorrow is doing your best today.</p>
                    <button class="btn_login" @click="cambiar_login">LOGIN</button>
                </div>
                </div>
                <div class="col_md_sign_up">
                <div class="cont_ba_opcitiy">
                    <h2>SIGN UP</h2>
                    <p>The best preparation for tomorrow is doing your best today.</p>
                    <button class="btn_sign_up" @click="cambiar_sign_up">SIGN UP</button>
                </div>
                </div>
            </div>
            <div class="cont_back_info">
                <div class="cont_img_back_grey"> <img :src="img" alt="" /> </div>
            </div>
            <div class="cont_forms" >
                <div class="cont_img_back_"> <img :src="img" alt="" /> </div>
                <div class="cont_form_login"> <a href="#" @click="ocultar_login_sign_up" ><i class="material-icons">&#xE5C4;</i></a>
                <h2>LOGIN</h2>
                <input type="text" placeholder="User/Email" class="l_email"/>
                <input type="password" placeholder="Password" class="l_pwd"/>
                <button class="btn_login" @click="cambiar_login">LOGIN</button>
                </div>
                <div class="cont_form_sign_up"> <a href="#" @click="ocultar_login_sign_up"><i class="material-icons">&#xE5C4;</i></a>
                <h2>SIGN UP</h2>
                <input type="text" placeholder="Email" @change="checkEmail" class="s_email"/>
                <input type="text" placeholder="User" @change="checkUser" class="s_user"/>
                <input type="password" placeholder="Password" class="s_pwd"/>
                <input type="password" placeholder="Confirm Password" class="sdb_pwd"/>
                <button class="btn_sign_up" @click="cambiar_sign_up">SIGN UP</button>
                </div>
            </div>
            </div>
        </div>  
    </div>
    <spinner v-if="show"></spinner>
</div>
</template>
<script>
import spinner from '../spinner/spinner.vue'
import http from '../../utils/reqAjax.js'
import './login.scss'
export default {
    data(){
        return {
            show:false,
            userName:'',
            img:"./src/assets/login/po.jpg",
            bgimg:{'background-image':"url('./src/assets/login/timg.jpg')"}
        }
    },
    methods:{
        // 返回箭头点击事件
        ocultar_login_sign_up(){
            document.querySelector('.cont_forms').className = "cont_forms";  
            document.querySelector('.cont_form_sign_up').style.opacity = "0";               
            document.querySelector('.cont_form_login').style.opacity = "0"; 
            setTimeout(function(){
            document.querySelector('.cont_form_sign_up').style.display = "none";
            document.querySelector('.cont_form_login').style.display = "none";
            },500); 
        },
        // login按钮事件
        cambiar_login(){
            // 动画
            document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
            document.querySelector('.cont_form_login').style.display = "block";
            document.querySelector('.cont_form_sign_up').style.opacity = "0"; 
            if(!$('.l_email').val()&&!$('.l_pwd').val()){
               setTimeout(function(){
                document.querySelector('.cont_form_login').style.opacity = "1";
                 },400);  
                setTimeout(function(){    
                    document.querySelector('.cont_form_sign_up').style.display = "none";
                },200);   
            }             
           
            var $email=$.trim($('.l_email').val());
            var $pwd=$.trim($('.l_pwd').val());
            if($email && $pwd){
            this.show=true;
            http.get({url:"login.php?user="+$email+"&password="+$pwd}).then(res=>{
                  // 登陆成功
                if(res.data){
                    this.$store.commit('saveUser',$email);//保存到Vuex
                    this.show=false;
                    this.$message({
                    message: 'Login success!',
                    type: 'success',
                    center: true,
                    duration:'700'
                    });            
                    setTimeout(()=>{   
                        this.$router.push({name:"root"});
                    },1000)
                }
                //失败
                else{
                    this.$message({
                    showClose: true,
                    message: '用户名或密码错误，请重新输入!',
                    type: 'error'
                    });

                }
            })
            }  
        },
        // sign up按钮事件
        cambiar_sign_up(){
            // 动画
            document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
            document.querySelector('.cont_form_sign_up').style.display = "block";
            document.querySelector('.cont_form_login').style.opacity = "0"; 
            setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
            },100);  
            setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
            },400);
            var pwd=$('.s_pwd').val();
            var email=$('.s_email').val();
            var user=$('.s_user').val();
            if(pwd!=$('.sdb_pwd').val()){
                this.$message({
                showClose: true,
                message: '密码输入不一致!',
                type: 'warning'
                });     
            }     
            else if(pwd&&email&&user){
                this.show=true;
                http.post({url:"register.php",parmas:{email:$.trim(email),user:$.trim(user),password:$.trim(pwd)}}).then(res=>{
                    if(res.data){
                        this.show=false;
                         this.$message({
                            message: '注册成功!请前往登陆!',
                            type: 'success',
                            center: true
                        });
                         var inputs=$('.cont_form_sign_up input');
                        for(var i=0;i<inputs.length;i++){
                             inputs.eq(i).val('');         
                        }
                        
                    } else {
                        this.$message({
                        showClose: true,
                        message: '注册失败!请重新注册!',
                        type: 'error'
                        });
                    }
                }) 
            }
        },
        checkUser(e){
            var user=$(e.target).val();
            http.get({url:"register.php?user="+user}).then(res=>{
                if(!res.data){
                   this.$message({
                    showClose: true,
                    message: '警告,该用户名已存在!',
                    type: 'warning'
                    });
                    $(e.target).val('');
                }
            })
        },
        checkEmail(e){
            var email=$(e.target).val();
            http.get({url:"register.php?email="+email}).then(res=>{
                if(!res.data){
                   this.$message({
                    showClose: true,
                    message: '警告,该邮箱已注册!',
                    type: 'warning'
                    });
                    $(e.target).val('');
                }
            })
        }
    },
    components:{
        spinner
    }
}
</script>
