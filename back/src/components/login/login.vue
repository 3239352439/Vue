<template>
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
                <input type="text" placeholder="Email" class="l_email"/>
                <input type="password" placeholder="Password" class="l_pwd"/>
                <button class="btn_login" @click="cambiar_login">LOGIN</button>
                </div>
                <div class="cont_form_sign_up"> <a href="#" @click="ocultar_login_sign_up"><i class="material-icons">&#xE5C4;</i></a>
                <h2>SIGN UP</h2>
                <input type="text" placeholder="Email" class="s_email"/>
                <input type="text" placeholder="User" class="s_user"/>
                <input type="password" placeholder="Password" class="s_pwd"/>
                <input type="password" placeholder="Confirm Password" class="sdb_pwd"/>
                <button class="btn_sign_up" @click="cambiar_sign_up">SIGN UP</button>
                </div>
            </div>
            </div>
        </div>
    </div>

</template>
<script>
import './style.scss'
export default {
    data(){
        return {
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
            setTimeout(function(){
                document.querySelector('.cont_form_login').style.opacity = "1";
                 },400);  
            setTimeout(function(){    
            document.querySelector('.cont_form_sign_up').style.display = "none";
            },200); 
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
        }
    }
}
</script>
