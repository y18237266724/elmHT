<template>
  <div>
    <el-table
      ref="singleTable"
      :data="arr"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="registe_time" label="注册日期" width="200"></el-table-column>
      <el-table-column property="username" label="用户姓名" width="200"></el-table-column>
      <el-table-column property="city" label="注册地址"></el-table-column>
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

<script>
export default {
  data() {
    return {
      arr: [],
      count: 0,
      currentPage: 1
    };
  },
  created() {
    this.Axios.get(
      "https://elm.cangdu.org/v1/users/list?offset=0&limit=20"
    ).then(res => {
      if (res) {
        this.arr = res.data;
      }
    });
    this.Axios.get("https://elm.cangdu.org/v1/users/count").then(res => {
      this.count = res.data.count;
    });
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleSizeChange(val) {
        //点击页码更新数据
      this.Axios.get(
        "https://elm.cangdu.org/v1/users/list?offset=" +
          (val - 1) * 20 +
          "&limit=20"
      ).then(res => {
        this.arr = res.data;
      });
    },
    handleCurrentChange(val) {
        //点击箭头更新数据
      this.Axios.get(
        "https://elm.cangdu.org/v1/users/list?offset=" +
          (val - 1) * 20 +
          "&limit=20"
      ).then(res => {
        this.arr = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  background-color: white !important;
}
</style>
