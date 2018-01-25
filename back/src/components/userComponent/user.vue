<template>
    <div id="sm_user" >
       <table v-if="dataset.length > 0" class="table table-bordered table-condensed table-hover table-striped">
           <thead>
                <tr>
                    <th v-for="(value, idx) in data" :key="idx">{{value}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(object, index) in dataset" :key="index">
                    <td v-for="(value, key) in object" :key="key">{{object[key]}}</td>
                </tr>
            </tbody>
       </table>
    </div>
</template>
<script>
import http from '../../utils/reqAjax.js'
import './user.scss'
export default {
  data(){
      return {
          dataset:[],
          data:['用户名','密码','用户手机号','头像','创建时间'],
          url:'user.php',
          num:''
      }
  },
  mounted(){
      http.get({'url':this.url}).then(res=>{
          this.dataset=res.data;
      })    
  },
  methods:{
      search(val){        
        http.get({"url":this.url + "?data=" + val}).then(res=>{
         console.log(res)
         this.dataset = res.data;
         })
    }
  }
}
</script>
