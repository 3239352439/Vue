<template>
  <div class="category_cen">
    <mt-header title="分类">
      <mt-button slot="right">搜索</mt-button>
    </mt-header>
    <div>
      <ul class="left">
        <li v-for="(obj) in category" @click="toSmallcategory(obj.categoryId)">{{obj.categoryName}}</li>
      </ul>
      <ul class="right">
        <li v-for="(obj) in cateSamllList" @click="toProduct" v-bind:data-SmallId="obj.classifySmallId">{{obj.classifyName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import './classify.scss';
import http from '../../utils/reqAjax'
// import axios from 'axios';

export default {
  data: function(){
    return {
      category:'',
      url: "category.php",
      cateSamll:'1',
      cateSamllList:''
    }
  },
  mounted(){
    http.get({"url":this.url}).then( res => {
      this.category = res.data;
      this.toSmallcategory(1);
      // console.log(res.data);
    });
  },
  methods:{
    toSmallcategory(idx){
      http.get({"url":this.url+"?cateSamll="+idx}).then( res => {
        // console.log(res.data);
        this.cateSamllList = res.data
      })
    },
    toProduct(_event){
      // console.log(_event.target.innerText)
      this.$router.push({ name: 'product',params: {classifySmallId: _event.target.attributes[0].nodeValue,name: _event.target.innerText}});
    }
  }
}
</script>
