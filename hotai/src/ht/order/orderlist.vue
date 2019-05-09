<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @expand-change="change"
      :expand-row-keys="expands"
      :row-key="row => row.index"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{ props.row.resusername }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.resaddress }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.resadd }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单 ID" prop="id"></el-table-column>
      <el-table-column label="总价格" prop="total_amount"></el-table-column>
      <el-table-column label="订单状态" prop="status_bar.title"></el-table-column>
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
      tableData: [],
      expands:[],
      count: 0,
      currentPage: 1,
    };
  },
  created() {
    this.Axios.get(
      "https://elm.cangdu.org/bos/orders/count?restaurant_id=undefined"
    ).then(res => {
      //数据总条数
      this.count = res.data.count;
    });
    this.Axios.get(
      "https://elm.cangdu.org/bos/orders?offset=0&limit=20&restaurant_id=undefined"
    ).then(res => {
      //订单总数据
      this.tableData = res.data;
    });
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      //把index放到row里
      row.index = rowIndex;
    },
    handleCurrentChange(val) {
      //点击页码更新数据
      this.Axios.get(
        "https://elm.cangdu.org/bos/orders?offset=" +
          (val - 1) * 20 +
          "&limit=20&restaurant_id=undefined"
      ).then(res => {
        this.tableData = res.data;
      });
    },
    change(r, q) {
      this.Axios.get(
        "https://elm.cangdu.org/shopping/restaurant/" + r.restaurant_id
      ).then(res => {
        //店铺信息
        this.tableData[r.index].resadd = res.data.address
        let objlist=this.tableData[r.index]
        this.tableData.splice(r.index,1,objlist)
      });
      this.Axios.get("https://elm.cangdu.org/v1/user/" + r.user_id).then(
        res => {
          //个人信息
          this.tableData[r.index].resusername = res.data.username
          let objlist=this.tableData[r.index]
          this.tableData.splice(r.index,1,objlist)
        }
      );
      this.Axios.get("https://elm.cangdu.org/v1/addresse/" + r.address_id).then(
        res => {
          //收货地址
           this.tableData[r.index].resaddress = res.data.address
           let objlist=this.tableData[r.index]
           this.tableData.splice(r.index,1,objlist)
        }
      );
    }
  }
};
</script>