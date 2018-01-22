<template>
    <div class="menu_cen">
      <ul>
        <li>

          <i class="glyphicon glyphicon-home"></i>
          <span>首页</span>
        </li>
        <li>
          <router-link to="/category">
            <i class="glyphicon glyphicon-th"></i>
            <span>分类</span>
          </router-link>
        </li>
        <li>
          <router-link to="/car">
            <i class="glyphicon glyphicon-search"></i>
            <span>购物车</span>
          </router-link>
        </li>
        <li>
          <i class="glyphicon glyphicon-user"></i>
          <span>我的</span>
        </li>
      </ul>
    </div>
</template>
<script>

import './publicMenu.scss';

export default {
  data: function(){
    return {

    }
  }
}
</script>
