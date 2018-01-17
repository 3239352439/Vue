<template>
    <div id="register">
        <div class="reg">
            <label for="phone">手机号 :</label><input type="text" placeholder="请输入手机号" v-model="phone" @blur="btn(phone)" id="phone">
            <span v-if="type">请输入正确的手机号码</span>
            <span v-if="type1">亲，该手机号已被注册</span><br>
            <label for="password">密码 :</label><input type="password" placeholder="请输入6-20位数字或者字母" v-model="password" id="password" @blur="pwd(password)" :disabled="disabled1">
            <span v-if="type2">请输入正确的格式</span><br>
            <label for="password1">确认密码 :</label><input type="password" placeholder="请再次输入密码" v-model="password1" id="password1" @blur="pw(password1)" :disabled="disabled1">
            <span v-if="type3">两次输入的密码不正确！</span><br>
            <mt-button type="primary" :disabled="disabled" @click="register">注册</mt-button>
        </div>
    </div>
</template>
<script>
    import { Field,Header,Button,Indicator } from 'mint-ui';
    import "./register.scss";
    import "../../sass/spinner.scss";
    import http from "../../utils/reqAjax";
    export default {
        data(){
            return {
                phone:"",
                password:"",
                disabled:"",
                disabled1:"",
                type:false,
                type1:false,
                type2:false,
                type3:false,
                password1:""
            }
        },
        methods:{
            btn(val){
                // 失去焦点时先判断格式发送请求验证用户是否存在
                var reg = /^1[3578]\d{9}$/g;
                if(reg.test(val)){
                    this.type = false;
                    http.get({url:"register.php?phone=" + val}).then((res)=>{
                        if(!res.data){
                            this.disabled1 = "";
                            this.type1 = true;
                        }else{
                            this.disabled1 = false;
                            this.type1 = false;
                        }
                    })
                }else{
                    this.type = true;
                }

            },
            pwd(val){
                var reg = /^[0-9a-zA-Z]{6,20}$/g;
                if(reg.test(val)){
                    this.type2 = false;
                    this.disabled = false;
                }else{
                    this.type2 = true;
                }
            },
            pw(val){
                if(this.password == val){
                    this.type3 = false;
                }else{
                    this.type3 = true;
                }
            },
            register(){
                if(this.type3 = false){
                    this.$store.state.loadspinner();
                    http.get({url:"register.php?phone=" + this.phone + "&password=" + this.password}).then((res)=>{
                        setTimeout(function(){
                            this.$store.state.closeSpinner();
                            if(res.data){
                                window.localStorage.setItem('username',this.phone);
                                this.$router.push("/");
                            }else{
                                alert("网络出现故障，请重新注册！")
                            }
                        }.bind(this),1000)
                    })
                }
            },
            goLogin(){
                this.$router.push("/login");
            },
            goback(){
                this.$router.go(-1);
            }
        }
    }
</script>

