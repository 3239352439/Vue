<template>
    <div id="login">
        <div class="log">
            <div>
                <label for="phone">手机号 :</label><input type="text" placeholder="请输入手机号" v-model="phone"  id="phone">
            </div>
            <div>
                <label for="password">密码 :</label><input type="password" placeholder="请输入6-20位数字或者字母" v-model="password" id="password">
            </div>
            <span v-if="type">请输入正确的手机号或密码</span><br>
            <mt-button type="primary" @click="Login">登录</mt-button>
        </div>
    </div>
</template>
<script>
    import { Field,Header,Button } from 'mint-ui';
    import "./login.scss";
    import "../spinnerComponent/spinner.scss";
    import spinner from "../spinnerComponent/spinner"
    import http from "../../utils/reqAjax";
    import cookie from "../../utils/cookie";
    export default {
        data(){
            return{
                phone:"",
                password:"",
                type:false
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            Login(){
                spinner.loadspinner();
                http.get({url:"login.php?phone=" + this.phone + "&password=" + this.password}).then((res)=>{
                    setTimeout(function(){
                        spinner.closeSpinner();
                        if(res.data){
                            this.$store.commit('createPhone',this.phone);
                            this.type = false;
                            var now = new Date();
                            now.setDate(now.getDate()+90);
                            cookie.set("token",res.data,now,"/");
                            this.$router.push("/");
                        }else{
                            this.type = true;
                        }
                    }.bind(this),1000)
                })
            }
        }
    }
</script>
