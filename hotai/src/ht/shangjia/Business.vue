<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品介绍">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="评分">
            <span>{{ props.row.rating }}</span>
          </el-form-item>
          <el-form-item label="销售量">
            <span>{{ props.row.recent_order_num }}</span>
          </el-form-item>
          <el-form-item label="分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="店铺名称"
      prop="id">
    </el-table-column>
    <el-table-column
      label="店铺地址"
      prop="name">
    </el-table-column>
    <el-table-column
      label="店铺介绍"
      prop="desc">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="descs">
      <button>编辑</button>
      <button>添加食品</button>
      <button>删除</button>
    </el-table-column>
  </el-table>
   <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="count"
      ></el-pagination>
    </div>
</div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
         tableData:[],
          count: 0,
      currentPage: 1
      }
    },
    created(){
        this.Axios.get('https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0&limit=20')
        .then(res=>{
            this.tableData=res.data
        })
        this.Axios
.get('https://elm.cangdu.org/shopping/restaurants/count')
.then(res=>{
this.count=res.data.count
})
    },
    methods:{
         handleSizeChange(val) {
        //点击页码更新数据
      this.Axios.get(
        "https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0" +(val - 1) * 20 +"&limit=20"
      ).then(res => {
        this.tableData = res.data;
      });
    },
    handleCurrentChange(val) {
        //点击箭头更新数据
      this.Axios.get(
        "https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0" +(val - 1) * 20 +"&limit=20"
      ).then(res => {
        this.tableData = res.data;
      });
    }
    }
  }
</script>
<style lang="sass" scoped>

</style>
