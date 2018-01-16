<template>
    <div id="sm_search">
        <div class="header">
            <router-link to="/">
                <mt-button icon="back">返回</mt-button>
            </router-link>
             <mt-search
              v-model="value"
              cancel-text="取消"
              placeholder="搜索">
            </mt-search>
            <mt-button icon="more"></mt-button>
        </div>
        <div class="main"></div>

     </div>
</template>

<script>
    import './search.scss'
    export default{
        data(){
            return {
                 value:""
            }
        },
        methods:{
           
        }
    }
</script>