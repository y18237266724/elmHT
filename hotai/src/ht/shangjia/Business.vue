<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
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
      <el-table-column label="店铺名称" prop="name"></el-table-column>
      <el-table-column label="店铺地址" prop="address"></el-table-column>
      <el-table-column label="店铺介绍" prop="description"></el-table-column>
      <el-table-column label="操作" prop="descs">
        <template slot-scope="scope">
          <el-button @click="oppen(scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="go(scope.$index, scope.row)">添加食品</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
       
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="count"
      ></el-pagination>
    </div>
    <div class="bianji" v-if="isShow">
      <div class="bianji1">
        <header>
          <b>修改店铺信息</b>
          <span @click="x">
            <b>X</b>
          </span>
        </header>

        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="店铺名称" class="inp">
            <el-input v-model="name"></el-input>
          </el-form-item>

          <el-form-item label="详细地址" class="inp">
            <el-input v-model="address" v-on:input="inputFunc" ></el-input>
            <el-card class="box-card" v-if="sh">
              <div class="text item">
                <p v-for="o in this.city" @click="PhP(o.name)">{{ o.name }}</p>
              </div>
            </el-card>
            <p>当前城市:{{ this.danqiancity }}</p>
          </el-form-item>
          <el-form-item label="店铺介绍" class="inp">
            <el-input v-model="car"></el-input>
          </el-form-item>

          <el-form-item label="联系电话" class="inp">
            <el-input v-model="phone"></el-input>
          </el-form-item>

          <el-form-item label="店铺分类" class="inp">
            <el-input v-model="nnn"></el-input>
          </el-form-item>

          <el-form-item label="更换头像：">
            <el-upload
              class="avatar-uploader"
              action="https://elm.cangdu.org/v1/addimg/shop"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="'http://elm.cangdu.org/img/'+imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-button  @click="x">取消</el-button><el-button type="primary" @click="erro">确定</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-icon-plus{
  width: 150px !important;
  height: 150px !important;
  background: wheat !important;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.text {
  font-size: 14px;
  p {
    cursor: pointer;
  }
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  color: white;
  background: rgba($color: #000000, $alpha: 0.6);
  position: absolute;
  z-index: 30;
  p:hover {
    background: rgba(0, 0, 255, 0.438);
  }
  p {
    width: 100%;
    text-align: center;
  }
}
.bianji {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  .bianji1 {
     overflow: auto;
    width: 50%;
    height: 70%;
    background: white;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 10%;
    .el-input {
      width: 80% !important;
    }
    header {
      width: 100%;
      b {
        font-size: 18px;
        margin-left: 20px;
      }
      span {
        float: right;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
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
      val:1,
      id:'',//店铺id
      isShow:false,
      imageUrl: "",
      nnn: "", //店铺分类
      phone: "", //联系电话
      car: "", //店铺介绍
      danqiancity: "", //当前城市
      city: [],
      //表格右对齐属性
      labelPosition: "right",
      address: "",
      sh: false,
      name: "", //店铺名称
      tableData: [],
      count: 0,
      currentPage: 1,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  created() {
    this.Axios.get("https://elm.cangdu.org/v1/cities?type=guess").then(res => {
      this.danqiancity = res.data.name;
    });
   this.first()
     
  },
  methods: {
    first(){
      this.Axios.get("https://elm.cangdu.org/shopping/restaurants/count").then(
      res => {
        this.count = res.data.count;
      }
    );
       this.Axios.get(
      "https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset="+(this.val-1)*20+"&limit=20"
    ).then(res => {
      this.tableData = res.data;
    });
  
    },
    erro(){
      let data={address:this.address,category:this.nnn,description:this.car,id:this.id,image_path:this.imageUrl,name:this.name,phone:this.phone,rating: 4.7,recent_order_num: 106}
      this.Axios.post('https://elm.cangdu.org/shopping/updateshop',data).then((res)=>{
        console.log(res)
        if(res.data.message=="此店铺用做展示，请不要修改"){
            this.$message({
          message: '此店铺用做展示，请不要修改',
          type: 'warning'
        });
        }else if(res.data.success=="修改商铺信息成功"){
          this.isShow=false
          this.first(this.val)
          console.log(this.val)
            this.$message({
          message: '修改商铺信息成功',
          type: 'success'
        });
        }else if(res.data.message=="亲，您还没有登录"){
          this.$message.error('亲，您还没有登录');
        }else if(res.data.message="更新商铺信息失败"){
          this.$message.error('更新商铺信息失败');
        }
     
      })
    },
    x(){
      this.isShow=false
    },
    //图片
    handleAvatarSuccess(res, file) {
      if (res.status == 1) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.image_path;
        // console.log(this.imageUrl)
      } else {
        this.$message.error("上传图片失败");
      }
    },
    //上传图片
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    PhP(a) {
      this.address = a;
      this.sh = false;
    },
    inputFunc() {
      let a = this.address;
      this.Axios.get(
        "https://elm.cangdu.org/v1/pois?type=search&city_id="+this.id+"&keyword=" + a
      ).then(res => {
        this.city = res.data;
        if (a.length > 0) {
          this.sh = true;
        } else {
          this.sh = false;
        }
      });
    },

    oppen(a) {
      this.isShow=true
      this.id=a.id
      this.name=a.name
      this.address=a.address
      this.car=a.description
      this.phone=a.phone
      this.nnn=a.category
      this.imageUrl=a.image_path
    },
    go(r, q) {
      this.$router.push({ name: "Goods", params: { id: q.id } });
    },
    handleCurrentChange(val) {
      
      this.val=val
      console.log(this.val)
      //点击箭头更新数据
      this.Axios.get(
        "https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0" +
          (val - 1) * 20 +
          "&limit=20"
      ).then(res => {
        this.tableData = res.data;
      });
    }
  }
};
</script>
<style lang="sass" scoped>

</style>
