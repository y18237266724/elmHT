<template>
  <div>
  
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
      newUser:[],//新增用户数据
      newOrders:[],//新增订单数据
      newAdmin:[],//新增管理员数据
     sevenDate:[]
      
    };
  },
    created() {
    this.getSevenData();
  },
  mounted() {
    // this.drawLine();
  },

  methods: {
     getSevenData(){
       const apiArr=[[],[],[]];
       let dateArr=[];
       for(var i = 0;i<7;i++){
         let date=new Date();
        date.setDate(date.getDate()-i);
        const today=time(date).format("YYYY-MM-DD");
        dateArr.push(today)
       }//时间格式循环七天

       dateArr.map((item)=>{
         apiArr[0].push(this.getData('user',item));
         apiArr[1].push(this.getData('order',item));
         apiArr[2].push(this.getData('admin',item));
       })
       let arr=[...apiArr[0],...apiArr[1],...apiArr[2]];

       let resArr=[[],[],[]];
       Promise.all(arr).then((res)=>{
         res.forEach((item,index)=>{
           if(item.data.status==1){
             resArr[Math.floor(index/7)].push(item.data.count)
           }
         })
        //  this.sevenDate=resArr
        this.newUser=resArr[0]
        this.newOrders=resArr[1]
        this.newAdmin=resArr[2]
         console.log(this.newAdmin[6])
       })
     },
     getData(url,today){
       return new Promise((s,e)=>{
         this.Axios.get("https://elm.cangdu.org/statis/"+url+"/"+today+"/count").then(res=>{
           s(res);
         }).then((res)=>{
           e(res)
         })
       })
     }

   
  }
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