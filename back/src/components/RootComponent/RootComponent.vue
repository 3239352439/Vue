<template>
  <div>
      <div class="header clearfix">
          <h1>后台管理系统</h1>
          <div class="search">
            <el-input
            placeholder="请输入内容"
            v-model="num"
            clearable>
            </el-input>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button type="primary" @click="add" v-if="show">新增</el-button>
          </div>
          <div class="header_right">
              <ul>
                  <el-button type="primary" @click="$router.push({path: '/login'})">退出</el-button>
              </ul>
          </div>
      </div>
      <el-dialog
        title="用户信息"
        :visible.sync="dialog"
        width="40%"
        :before-close="handleClose">
            <div v-for="(value,idx) in dataset[0]" :key="idx">
                <label>{{idx + ":"}}</label><el-input clearable :id="idx"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save()">保 存</el-button>
                <el-button @click="dialog = false">取 消</el-button>
            </span>
        </el-dialog>

            <el-menu
              default-active="1"
              class="el-menu-vertical-demo menu"
              @open="handleOpen($event)"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-li-color="#EB9E05">
              <el-submenu index="1" class="in1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                  <el-menu-item index="1-1">用户信息</el-menu-item>
              </el-submenu>
              <el-submenu index="2" class="in1">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span>商品管理</span>
                </template>
                  <el-menu-item index="1-1">所有商品</el-menu-item>
                  <el-menu-item index="1-2">上架管理</el-menu-item>
              </el-submenu>
              <el-submenu index="3" class="in1">
                <template slot="title">
                  <i class="el-icon-message"></i>
                  <span>订单管理</span>
                </template>
                  <el-menu-item index="1-1">所有订单</el-menu-item>
              </el-submenu>
              <el-submenu index="4" class="in1">
                <template slot="title">
                  <i class="el-icon-sort"></i>
                  <span>员工管理</span>
                </template>
                  <el-menu-item index="1-1">普通员工</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
              </el-submenu>
              <el-submenu index="5" class="in1">
                <template slot="title">
                  <i class="el-icon-sold-out"></i>
                  <span>采购模块</span>
                </template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
              </el-submenu>
              <el-submenu index="6" class="in1">
                <template slot="title">
                  <i class="el-icon-service"></i>
                  <span>客服管理</span>
                </template>
                  <el-menu-item index="1-1" @click="$router.push({path: '/service'})">当前对话</el-menu-item>
              </el-submenu>
            </el-menu>

        <div class="main">
            <router-view></router-view>
        </div>


  </div>
</template>

<script>
export default {
  name: 'RootComponent',
  data () {
    return {
      msg: '',
      dialog:false,
      dataset:[],
      show:true,
      num:''
    }
  },
  methods: {
      handleOpen(key) {
          if(key == 3){
              this.$router.push("/order");
          }
      },
      handleClose(key, keyPath) {
      },
      search(){
          if(this.num){
            this.$children[6].search(this.num);
          }
      },
      add(){
          if(this.$children[6].dataset){
            this.dialog = true;
            this.dataset = this.$children[6].dataset;
          }
      },
      save(){
          var data = {};
          for(var attr in this.dataset[0]){
              data[attr] = document.getElementById(attr).value;
          }
          this.dialog = false;
          if(this.$children[6].updated){
              this.$children[6].updated(data);
          }
      },
  }
}
</script>
<style>
    @import './RootComponent.scss'
    
</style>