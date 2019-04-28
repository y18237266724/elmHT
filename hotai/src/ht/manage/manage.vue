<template>
<div>
    <div class="Div">
        <p>数据统计</p>
        <table>
            <tr>
                <td class="td">当日数据：</td>
                <td><span>5</span>新增用户</td>
                <td><span>18</span>新增订单</td>
                <td><span>50</span>新增管理员</td>
            </tr>
            <tr>
                <td class="td1">总数据：</td>
                <td><span>26493</span>注册用户</td>
                <td><span>9318</span>订单</td>
                <td><span>37997</span>管理员</td>
            </tr>
        </table>
    </div>
<div class="con" id="myChart"></div>
</div>
</template>

<script>
export default {
data(){
return{

}
},
mounted(){
this.drawLine();
},
methods:{
drawLine(){
var myChart = this.$echarts.init(document.getElementById('myChart'));
myChart.setOption({
title: {
text: '走势图',
},
tooltip: {
trigger: 'axis'
},
legend: {
data:['新用户注册','新增订单','新增管理员']
},
toolbox: {
show: true,
feature: {
dataZoom: {
yAxisIndex: 'none'
},
dataView: {readOnly: false},
magicType: {type: ['line', 'bar']},
restore: {},
saveAsImage: {}
}
},
xAxis: {
type: 'category',
boundaryGap: false,
data: ['2019-04-22','2019-04-23','2019-04-24','2019-04-25','2019-04-26','2019-04-27','2019-04-28']
},
yAxis: {
type: 'value',
axisLabel: {
formatter: '{value}'
}
},
series: [
{
name:'新用户注册',
type:'line',
data:[199, 129, 77, 50, 33, 28, 5],
markPoint: {
data: [
{type: 'max', name: '最大值'},
{type: 'min', name: '最小值'}
]
},
},
{
name:'新增管理员',
type:'line',
data:[124, 129, 123, 124, 109, 94, 5],
markPoint: {
data: [
{type: 'max', name: '最大值'},
{type: 'min', name: '最小值'}
]
},
},
{
name:'新增订单',
type:'line',
data:[15, 3, 2, 30, 20, 16, 17],
markPoint: {
data: [
{type: 'max', name: '最大值'},
{type: 'min', name: '最小值'}
]
},
}
]
})
}
}
}

</script>

<style lang="scss" scoped>
*{
    background: #F5F5F5;
}
.con{
width: 600px;
height: 300px;
background: white !important;
margin-left: 80px;
margin-top: 30px;
}
.Div{
    width: 100%;
    height:200px;
    p{
        width: 100%;
        height: 50px;
        font-size: 30px;
        line-height: 50px;
        text-align: center;
    }
    table{
        tr{
            .td{
                background: orange;
            }
            .td1{
                background: blue;
                }
            td{
                background: #e5e9f2;
                width: 200px;
                height: 40px;
                border: 0px;
                border-radius: 10px;
                text-align: center;
                span{
                      background: #e5e9f2;
                    font-size: 23px;
                }
            }
        }
    }
}

</style>