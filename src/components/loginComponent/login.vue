<template>
    <div id="login">
        <div class="log">
            <label for="phone">手机号 :</label><input type="text" placeholder="请输入手机号" v-model="phone"  id="phone">
            <label for="password">密码 :</label><input type="password" placeholder="请输入6-20位数字或者字母" v-model="password" id="password">
            <span v-if="type">请输入正确的手机号或密码</span><br>
            <mt-button type="primary" @click="Login">登录</mt-button>
        </div>
        
    </div>
</template>
<script>
    import { Field,Header,Button } from 'mint-ui';
    import "./login.scss";
    import "../../sass/spinner.scss";
    import http from "../../utils/reqAjax";
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
                this.$store.state.loadspinner();
                http.get({url:"login.php?phone=" + this.phone + "&password=" + this.password}).then((res)=>{
                    setTimeout(function(){
                        this.$store.state.closeSpinner();
                        if(res.data){
                            this.type = false;
                            window.localStorage.setItem('username',this.phone);
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
