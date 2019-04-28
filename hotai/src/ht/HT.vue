<template>
  <div>
    <p class="P">elm后台管理系统</p>
    <div class="DIV">
      <input type="text" class="input_name one" placeholder="用户名" v-model="name" @blur="fun()">
      <p>{{this.nameerr}}</p>
      <input type="text" class="input_name" placeholder="密码" v-model="pass" @blur="fun()">
      <p>{{this.passerr}}</p>
      <button class="but" @click="loin">登录</button>
      <br>
      <p class="b">
        温馨提示:
        <br>未登录过的新用户，自动注册
        <br>注册过的用户可凭账号密码登录
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameerr: "", //错误提示信息
      passerr: "", //错误提示信息
      name: "",
      pass: ""
    };
  },
  methods: {
    fun() {
      //input失去焦点时逻辑处理
      if (this.name == "") {
        this.nameerr = "请输入用户名";
      } else {
        this.nameerr = "";
      }
      if (this.pass == "") {
        this.passerr = "请输入密码";
      } else {
        this.passerr = "";
      }
    },
    tan() {
      //警告框，错误信息提示
      this.$notify.error({
        title: "错误",
        message: "请填写正确的用户名密码"
      });
    },
    loin() {
      //登录点击事件
      this.fun();
      let data = { user_name: this.name, password: this.pass };
      this.Axios.post("https://elm.cangdu.org/admin/login", data).then(res => {
        if (
          res.data.success == "登录成功" ||
          res.data.success == "注册管理员成功"
        ) {
          this.$message({
            message: "恭喜你，登录成功",
            type: "success"
          });
          this.$router.push({ path: "/LOGIN" });
        } else {
          this.tan();
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-size: 15px;
}
.but {
  background: #20a0ff;
  color: white;
  border: 0;
  width: 80%;
  height: 40px;
  margin-top: 5px;
  margin-left: 30px;
}
.P {
  width: 320px;
  font-size: 30px;
  color: white;
  margin: 100px auto;
  text-align: center;
}
.DIV {
  width: 320px;
  height: 250px;
  background: white;
  border-radius: 10px;
  margin: 100px auto;
  .b {
    background: white;
    width: 200px;
    text-align: center;
    margin-left: 60px;
    margin-top: 10px;
  }
  p {
    width: 90%;
    height: 20px;
    color: red;
    font-size: 13px;
    margin-left: 15px;
  }
}
.input_name {
  width: 90%;
  height: 35px;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  color: #1f2d3d;
  margin-left: 15px;
  // font-size: inherit;
}
.one {
  margin-top: 20px;
}
</style>

