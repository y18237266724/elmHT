<template>
<div>
<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="注册日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="city"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="admin"
        label="权限">
      </el-table-column>
      
    </el-table>
     <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="20"
      layout="total, prev, pager, next"
      :total="count"
    ></el-pagination>
</div>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [],
           count: 0,
      currentPage: 1,
        }
      },
       created() {
           this.Axios.get('https://elm.cangdu.org/admin/all?offset=0&limit=20').then((res)=>{
               //管理员总数加
               this.tableData=res.data.data
           })
           this.Axios.get('https://elm.cangdu.org/admin/count').then((res)=>{
               this.count=res.data.count
           })
       },
       methods:{
           handleCurrentChange(val) {
      //点击页码更新数据
      this.Axios.get(
        "https://elm.cangdu.org/admin/all?offset=" +
          (val - 1) * 20 +
          "&limit=20"
      ).then(res => {
        this.tableData = res.data.data;
      });
    },
       }
    }
  </script>