<template>
    <div>
      <mt-header title="搜索框">
        <router-link to="/category" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <productMenu :SmallId="name"></productMenu>
      <h1>{{name}}</h1>
    </div>
</template>

<script>

import http from '../../utils/reqAjax';
import './productList.scss'

export default {
    data: function(){
        return {
          id:'1',
          name: ''
        }
    },
    mounted(){
        console.log(this.$route.params.classifySmallId)
        this.id = this.$route.params.classifySmallId;
        this.name = this.$route.params.name;
    },
    methods:{

    },
    components: {
        'productMenu': {
            template: `<div><ul class="Menu"><li @click="type">{{SmallId}}</li><li>默认排序</li><li>商品筛选</li></li></ul></div>`,
            data: function(){
                return {
                   url:"category.php"
                }
            },
            props:['SmallId'],
            methods: {
                type(){
                    // console.log(666);
                    http.get({"url":this.url}).then( res => {
                      this.category = res.data;
                      this.toSmallcategory(1);
                      console.log(res.data);
                  });
                },
                toSmallcategory(idx){
                  http.get({"url":this.url+"?cateSamll="+idx}).then( res => {
                      // console.log(res.data);
                      this.cateSamllList = res.data
                  })
                }
            }
        }
    }
}
</script>
