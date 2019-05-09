<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
         :router='true'
           :default-active="this.$route.path"
      @open="handleOpen"
      @close="handleClose"
          >
          <el-submenu index="1" class="one">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <router-link tag="span" :to="{path:'/LOGIN/Manage'}" class="router-o">
                <span class="O1">首页</span>
              </router-link>
            </template>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>数据管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" :index="'/LOGIN/userlist'">用户列表</el-menu-item>
              <el-menu-item index="2-2" :index="'/LOGIN/Business'">商家列表</el-menu-item>
              <el-menu-item index="2-3" :index="'/LOGIN/Foods'">食品列表</el-menu-item>
              <el-menu-item index="2-4" :index="'/LOGIN/Order'">订单列表</el-menu-item>
              <el-menu-item index="2-5" :index="'/LOGIN/Adminlist'">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>添加数据
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" :index="'/LOGIN/Shangpu'">添加商铺</el-menu-item>
              <el-menu-item index="3-2" :index="'/LOGIN/Goods'">添加商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>图标
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" :index="'/LOGIN/Distr'">用户分布</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit"></i>编辑
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" :index="'/LOGIN/Text'">文本编辑</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>设置
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1" :index="'/LOGIN/Adminset'">管理员设置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-warning"></i>说明
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1" :index="'/LOGIN/Note'">说明</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container class="h">
        <el-header style="text-align: right; font-size: 12px" class="header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/LOGIN/Manage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="name">{{name}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="title">{{title}}</el-breadcrumb-item>
          </el-breadcrumb>

          <img :src="'https://elm.cangdu.org/img/'+this.$store.state.nam" alt @click="Img" class="ooo" v-if="this.$store.state.nam">
          <img :src="'https://elm.cangdu.org/img/'+this.img" alt @click="Img" class="ooo" v-else>
          <ul class="UL" v-if="oneshow">
            <li @click="one">首页</li>
            <li @click="exit">退出</li>
          </ul>
        </el-header>

        <router-view class="manage"></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import manage from "./manage/manage.vue";
export default {
  data() {
    return {
      b:[],
      img:'',
      list: "", //头部首页信息
      lis: "",
      oneshow: false
    };
  },
  mounted(){   
  //   this.img=this.$store.state.nam
  //  console.log(this.img)
        this.Axios
        .get('https://elm.cangdu.org/admin/info')
        .then((res)=>{
          this.img=res.data.data.avatar
        })
       
    },
  components: {
    manage
  },
  computed: {
    
    name() {
      return this.$route.meta.name;
    },
    title() {
      return this.$route.meta.title;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
     one(){
      this.$router.push({path:'/LOGIN/Manage'})
    },
    Img() {
      if (this.oneshow == false) {
        this.oneshow = true;
      } else {
        this.oneshow = false;
      }
    },
    setCookie(name, value, day) {
      var exp = new Date();
      exp.setDate(exp.getDate() + day);
      document.cookie =
        name + "=" + unescape(value) + ";expires=" + exp.toGMTString();
    },
    exit() {
      this.setCookie("SID", "", 0);
       localStorage.removeItem("vuex")
      this.$router.push({ path: "/" });
    },
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-size: 15px;
}
.ooo{
  margin-top: -55px
}
.UL {
  width: 100px;
  height: 100px;
  list-style: none;
  background: white;
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 30;
  box-shadow: 8px 8px 10px gray;
  cursor: pointer;
  li:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  li {
    width: 100%;
    height: 50%;
    text-align: center;
    font-size: 17px;
    line-height: 50px;
  }
}
.el-container.is-vertical {
  overflow: auto;
}

.O1 {
  background-color: rgb(50, 64, 87);
}
.s {
  color: gray !important;
}
.h {
  background: white !important;

  img,
  .SS {
    cursor: pointer;
  }
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
