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
            <mt-field label="收货人" placeholder="点击输入姓名" v-model="data.linkMan">
                <p class="gender sel" @click="getGender"><span v-for="item in allGender" v-if="data.gender==item" class="active">{{item}}</span><span v-else>{{item}}</span></p>
            </mt-field>
                <mt-field label="手机号码" placeholder="输入手机号码" type="tel" v-model="data.phone"></mt-field>
                <mt-field label="小区" class="site" placeholder="请输入小区地址" type="text" v-model="$store.state.site" ></mt-field>
                <mt-field label="单元门牌" placeholder="请输入门牌号" type="text" v-model="data.doorplate"></mt-field>
                <div class="address sel" @click="getType"><p><label>地址分类</label><span v-for="item in allType" v-if="data.type==item" class="active">{{item}}</span><span v-else>{{item}}</span></p></div>
                        
            </mt-field>
            <mt-button type="primary" size="large" @click.stop="save">保存</mt-button>
            <mt-button type="primary" size="large" @click.stop="del"  v-if="editID">删除地址</mt-button>  
        </div>
        <mt-popup
            v-if="success"
            v-model="success"
            position="top"
            closeOnClickModal="false">
            {{tip}}
        </mt-popup>
    </div>
</template>
<script type="text/javascript">
    import './addAddress.scss'
    import http from '../../utils/reqAjax'
    import { Field,Button,MessageBox,Popup} from 'mint-ui';
    export default{
        data(){
            return {
                data:{linkMan:'',gender:'',phone:'',village:'',doorplate:'',type:''},
                allType:['家','公司','学校','其他'],
                allGender:['先生','女士'],
                success:false,
                url:"addAddress.php",
                tip:'',
                editID:this.$route.params.id
                
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

                    this.data.village=$('.site').find('input').val();               
                    //判断是否为有效电话
                     var ph=new RegExp(/^1[34578]\d{9}$/).test(this.data.phone);
                     if(!ph){
                         MessageBox.alert('请输入有效的电话号码！').then(action => {});
                         this.data.phone="";
                     }
                // 判断是否填写完整
                for(var key in this.data){        
                   if(!this.data[key]){
                        switch(key){
                            case 'linkMan':
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
                   }
                } 
                //填写完整信息后     
                var $data=JSON.stringify(this.data);
                    if(!this.editID){//保存新地址
                     http.get({url:this.url+'?checkData='+$data}).then(result=>{
                        var row=result.data.data2[0].row;
                        if(row=="0"){
                            http.post({url:this.url,parmas:{data:$data}}).then(res=>{
                                if(res.data){ 
                                    this.tip="地址添加成功";
                                    this.success=true;
                                    $('input').val(''); 
                                    window.setTimeout(()=>{
                                        this.success=false;
                                        this.$router.push({name:'getAddress'});     
                                    },1000); 
                                }
                            })
                        }
                        else{
                            this.tip="收货人信息已存在";
                            this.success=true;
                                    window.setTimeout(()=>{
                                        this.success=false;
                                    },1000);
                        
                        }
                    })     
                }
                //保存更新的信息
                http.post({url:this.url,parmas:{updata:$data,receiveId:this.editID}}).then(res=>{
                    if(res.data){
                        this.tip="信息更新成功";
                        this.success=true; 
                         window.setTimeout(()=>{
                            this.success=false;     
                        },1000); 
                    }else{
                        this.tip="更改信息失败";
                        this.success=true;
                             window.setTimeout(()=>{
                                this.success=false;
                            },1000);
                        
                        }
                })
              
                
                
                
            },
            del(){
               MessageBox.confirm('确定删除该地址信息?').then(action => {
                    http.post({url:this.url,parmas:{delId:this.editID}}).then(res=>{
                    if(res.data){
                        this.tip="信息删除成功";
                        this.success=true; 
                         window.setTimeout(()=>{
                            this.success=false;  
                            this.$router.push({name:'getAddress'});  
                        },1000);
                        
                    }
                    else{
                        this.tip="更改信息失败";
                        this.success=true;
                        window.setTimeout(()=>{
                            this.success=false;
                        },1000);
                    }
                }) 
              });
              
            }
        },
        mounted(){
            if(this.editID){
                http.get({url:this.url+"?id="+this.editID}).then(res=>{
                this.data={linkMan:res.data[0].linkMan,gender:res.data[0].gender,phone:res.data[0].phone,village:'',doorplate:res.data[0].doorplate,type:res.data[0].type};
                $('.site').find('input').val(res.data[0].village);

                })
                
            }
        }
    }

</script>