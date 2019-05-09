<template>
  <div>
    <div class="Div">
      <p>数据统计</p>
      <table>
        <tr>
          <td class="td">当日数据：</td>
          <td>
            <span>{{this.newUser[0]}}</span>新增用户
          </td>
          <td>
            <span>{{this.newOrders[0]}}</span>新增订单
          </td>
          <td>
            <span>{{this.newAdmin[0]}}</span>新增管理员
          </td>
        </tr>
        <tr>
          <td class="td1">总数据：</td>
          <td>
            <span>{{this.userzo}}</span>注册用户
          </td>
          <td>
            <span>{{this.orders}}</span>订单
          </td>
          <td>
            <span>{{this.admin}}</span>管理员
          </td>
        </tr>
      </table>
    </div>
    <div class="con" id="myChart"></div>
      <el-button :plain="true" @click="open"></el-button>
  </div>
 





</template>

<script>
import time from "time-formater";
export default {
  data() {
    return {
      userzo: "", //注册总用户
      orders: "", //订单
      admin: "", //管理员总数
      newUser: [], //新增用户数据
      newOrders: [], //新增订单数据
      newAdmin: [] //新增管理员数据
    };
  },
  created() {
    this.Axios.get("https://elm.cangdu.org/v1/users/count").then(res => {this.userzo = res.data.count;});
    this.Axios.get("https://elm.cangdu.org/bos/orders/count").then(res => {this.orders = res.data.count;});
    this.Axios.get("https://elm.cangdu.org/admin/count").then(res => {this.admin = res.data.count;});
    this.getSevenData();
  },
  methods: {
     open() {
        this.$message('您还没有登录');
      },
     getCookie(cookieName) {
        var strCookie = document.cookie;
        
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (cookieName == arr[0]) {
                return arr[1];
            }
        }
        return "";
    },
    getSevenData() {
      const apiArr = [[], [], []];
      let dateArr = [];
      for (var i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        const today = time(date).format("YYYY-MM-DD");
        dateArr.push(today);
      } //时间格式循环七天

      dateArr.map(item => {
        apiArr[0].push(this.getData("user", item));
        apiArr[1].push(this.getData("order", item));
        apiArr[2].push(this.getData("admin", item));
      });
      let arr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];

      let resArr = [[], [], []];
      Promise.all(arr).then(res => {
        res.forEach((item, index) => {
          if (item.data.status == 1) {
            resArr[Math.floor(index / 7)].push(item.data.count);
          }
        });
        this.newUser = resArr[0];
        this.newOrders = resArr[1];
        this.newAdmin = resArr[2];
        this.drawLine();
      });
    },
    getData(url, today) {
      return new Promise((s, e) => {
        this.Axios.get(
          "https://elm.cangdu.org/statis/" + url + "/" + today + "/count"
        )
          .then(res => {
            s(res);
          })
          .then(res => {
            e(res);
          });
      });
    },
    drawLine() {
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          text: "走势图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新用户注册", "新增订单", "新增管理员"]
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            time(new Date() - 24 * 60 * 60 * 6000).format("YYYY-MM-DD"),
            time(new Date() - 24 * 60 * 60 * 5000).format("YYYY-MM-DD"),
            time(new Date() - 24 * 60 * 60 * 4000).format("YYYY-MM-DD"),
            time(new Date() - 24 * 60 * 60 * 3000).format("YYYY-MM-DD"),
            time(new Date() - 24 * 60 * 60 * 2000).format("YYYY-MM-DD"),
            time(new Date() - 24 * 60 * 60 * 1000).format("YYYY-MM-DD"),
            time(new Date()).format("YYYY-MM-DD")
          ]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        },
        series: [
          {
            name: "新用户注册",
            type: "line",
            data: this.newUser,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "新增管理员",
            type: "line",
            data: this.newAdmin,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "新增订单",
            type: "line",
            data: this.newOrders,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      });
    }
  },
    beforeRouteEnter(to,from,next){ next((vm)=>{
     //next 函数的参数 vm就是vue实例 
     
     var data=vm.getCookie("SID")
     console.log(data)
     
      if(data.length>0){ 
        next(true) 
        }else{ 
         vm.open()
          next('/')
           }
            }) }
};
</script>

<style lang="scss" scoped>
* {
  background: #f5f5f5;
}
.con {
  width: 600px;
  height: 300px;
  background: white !important;
  margin-left: 80px;
  margin-top: 30px;
}
.Div {
  width: 100%;
  height: 200px;
  p {
    width: 100%;
    height: 50px;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
  }
  table {
    tr {
      .td {
        background: orange;
      }
      .td1 {
        background: blue;
      }
      td {
        background: #e5e9f2;
        width: 200px;
        height: 40px;
        border: 0px;
        border-radius: 10px;
        text-align: center;
        span {
          background: #e5e9f2;
          font-size: 23px;
        }
      }
    }
  }
}
</style>