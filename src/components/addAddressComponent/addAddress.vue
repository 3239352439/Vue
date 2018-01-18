<template>
    <div id="sm_add">
        <div class="add_header">
            <mt-header title="添加收货人">
              <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
              </router-link>
        </mt-header> 
        </div> 
        <div class="add_main">
            <mt-field label="收货人" placeholder="点击输入姓名" v-model="data.name">
                <p class="gender sel" @click="getGender"><span>先生</span><span>女士</span></p>
            </mt-field>
                <mt-field label="手机号码" placeholder="输入手机号码" type="tel" v-model="data.phone"></mt-field>
                <mt-field label="小区" placeholder="请输入小区地址" type="text" v-model="data.village"></mt-field>
                <mt-field label="单元门牌" placeholder="请输入门牌号" type="text" v-model="data.doorplate"></mt-field>
                <div class="address sel" @click="getType"><p><label>地址分类</label><span v-for="item in allType">{{item}}</span></p></div>
                        
            </mt-field>
            <mt-button type="primary" size="large" @click.stop="save">保存</mt-button> 
        </div>
    </div>
</template>
<script type="text/javascript">
    import './addAddress.scss'
    import { Field,Button,MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                data:{name:'',gender:'',phone:'',village:'',doorplate:'',type:''},
                allType:['家','公司','学校','其他']
            }
        },
        methods:{
            getGender(e){
                var tag=e.target.tagName.toLowerCase();  
                if(tag=="span"){
                    $(e.target).addClass('active').siblings('span').removeClass('active');
                    this.data.gender=e.target.innerText;                    
                }
            },
            getType(e){
                var tag=e.target.tagName.toLowerCase();  
                if(tag=="span"){
                    $(e.target).addClass('active').siblings('span').removeClass('active');
                    this.data.type=e.target.innerText;                    
                }
            },
            save(){
                // 判断是否填写完整
                for(var key in this.data){        
                   if(!this.data[key]){
                    switch(key){
                        case 'name':
                        MessageBox.alert('请填写收货人姓名！').then(action => {});
                        break;
                        case 'gender':
                        MessageBox.alert('请选择性别！').then(action => {});
                        break;
                        case 'phone':
                        MessageBox.alert('请输入有效的电话号码！').then(action => {});
                        break;
                         case 'gender':
                        MessageBox.alert('请选择性别！').then(action => {});
                        break;
                         case 'village':
                        MessageBox.alert('请填写小区信息！').then(action => {});
                        break;
                         case 'doorplate':
                        MessageBox.alert('请填写门牌号信息！').then(action => {});
                        break;
                        case 'type':
                        MessageBox.alert('请选择地址分类！').then(action => {});
                        break;
                    }
                    return;
                   }else{
                    //填写完整信息后
                   }  

                } 
            }
        }
    }

</script>