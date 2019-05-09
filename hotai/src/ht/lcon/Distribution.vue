<template>
  <div id="box">
    <div id="myChart" :style="{width: '1000px', height: '500px'}"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.drawLine();
  },
  methods: {
    // https://elm.cangdu.org/v1/user/city/count
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "用户分布",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["北京", "上海", "深圳", "杭州", "其他"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 5446, name: "北京" },
              { value: 2345, name: "上海" },
              { value: 2599, name: "深圳" },
              { value: 1388, name: "杭州" },
              { value:13441, name: "其他" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang='scss'>
#box {
  width: 100%;
}
#myChart {
  margin-top: 30px;
  padding-left: 80px;
}
</style>