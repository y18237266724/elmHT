<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '7']">
          <el-submenu index="1" class="one">
            <template slot="title" >
              <i class="el-icon-menu"></i>
              <router-link tag="span" :to="{path:'/LOGIN/Manage'}" class="router-o"><span @click="one" class="O1">首页</span></router-link>
            </template>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>数据管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"  @click="but">用户列表</el-menu-item>
              <el-menu-item index="2-2"  @click="but1">商家列表</el-menu-item>
              <el-menu-item index="2-3">食品列表</el-menu-item>
              <el-menu-item index="2-4">订单列表</el-menu-item>
              <el-menu-item index="2-5">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>添加数据
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">添加数据</el-menu-item>
              <el-menu-item index="3-2">添加商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>图标
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">用户分布</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>编辑
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">文本编辑</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>设置
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">管理员设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-warning"></i>说明
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1">说明</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container class="h">
        <el-header style="text-align: right; font-size: 12px" class="header">
          <span><span>首页</span><span class="s">{{this.list}}</span><span>{{this.lis}}</span></span>
          <img src="../images/ccc.png" alt>
        </el-header>

        <router-view class="manage"></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import manage from "./manage/manage.vue";
export default {
    data(){
    return {
        list:'',//头部首页信息
        lis:'',
    }
},
  components: {
    manage
  },
  methods:{
      one(){
          this.list=''
          this.lis=''
      },
      but(){
          this.list="/ 数据管理"
          this.lis="/ 用户列表"
         this.$router.push({ path: "/LOGIN/userlist" });
        
      },
      but1(){
            this.list="/ 数据管理"
            this.lis="/ 商家列表"
            this.$router.push({ path: "/LOGIN/Business" });
      }
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-size: 15px;
}
.el-container.is-vertical{
    overflow: auto;
}

.O1{
background-color: rgb(50, 64, 87);
}
.s{
    color: gray !important;
}
.h {
  background: white !important;
}
.header {
  background-color: #eff2f7 !important;
  span {
    background-color: #eff2f7;
    color: #97a8be;
    height: 100%;
    line-height: 60px;
    margin-left: 10px;
    float: left;
  }
  img {
    height: 50px;
    float: right;
    background-color: #eff2f7;
  }
}
.router-i {
  background: #48576a;
}
.router-o {
  background-color: rgb(50, 64, 87);
}
.manage {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.one .el-icon-arrow-down {
  display: none;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-container {
  height: 753px !important;
}
.el-aside {
  color: #333;
  background-color: rgb(50, 64, 87) !important;
}
.el-main {
  height: 100% !important;
  background: white;
}

.el-icon-warning,
.el-icon-setting,
.el-icon-edit,
.el-submenu__title,
.el-icon-menu,
.el-icon-document,
.el-submenu__icon-arrow,
.el-menu-item-group__title,
.el-icon-plus,
.el-icon-star-on {
  background-color: rgb(50, 64, 87) !important;
  color: #bfcbd9;
}
.el-menu-item {
  background: #48576a !important;
  color: #bfcbd9;
}
</style>
