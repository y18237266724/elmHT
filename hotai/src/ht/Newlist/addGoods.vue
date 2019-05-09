<template>
  <div class="addgoods">
    <p class="P">选择食品种类</p>
    <span>食品种类</span>
    <el-select v-model="valu" placeholder="请选择">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name">
        <el-button style="border:none;width:100%" @click="open(item.id)">{{item.name}}</el-button>
      </el-option>
    </el-select>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="添加食品种类" name="1">
        <div>
          <span>食品种类</span>
          <el-input v-model="newfrom" placeholder="请输入内容"></el-input>
          <span>种类描述</span>
          <el-input v-model="newfromo" placeholder="请输入内容"></el-input>
          <el-button type="primary" @click="go">提交</el-button>
        </div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
    </el-collapse>
    <Header :headTitle="'添加数据'" :headTit="'添加商品'"></Header>
    <div class="table">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="食品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="食品活动" prop="activity">
          <el-input v-model="ruleForm.activity"></el-input>
        </el-form-item>
        <el-form-item label="食品详情" prop="description">
          <el-input v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="上传食品图片">
          <el-upload
            class="avatar-uploader"
            action="https://elm.cangdu.org/v1/addimg/food"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="'https://elm.cangdu.org/img/'+imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="食品特点">
          <el-select
            v-model="value"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择"
          >
            <el-option
              v-for="item in data"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品规格" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio :label="1" @change="one">单规格</el-radio>
            <el-radio :label="2" @change="two">多规格</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-show="isshow">
          <el-form-item label="包装费" prop="packing_fee">
            <el-input-number v-model="ruleForm.packing_fee" controls-position="top" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input-number v-model="ruleForm.price" controls-position="top" :min="0"></el-input-number>
          </el-form-item>
        </div>
        <div v-show="isshow2">
          <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
            <el-form :model="guige">
              <el-form-item label="规格" :label-width="formLabelWidth">
                <el-input v-model="guige.specs" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="包装费" :label-width="formLabelWidth">
                <el-input-number v-model="guige.packing_fee" :min="0" label="描述文字"></el-input-number>
              </el-form-item>
              <el-form-item label="价格" :label-width="formLabelWidth">
                <el-input-number v-model="guige.price" :min="0" label="描述文字"></el-input-number>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="tru">确 定</el-button>
            </div>
          </el-dialog>
          <div class="button">
            <el-button type="primary" @click="dialogFormVisible = true">添加规格</el-button>
          </div>
          <el-table :data="specfoods" style="width: 100%">
            <el-table-column prop="specs" label="规格"></el-table-column>
            <el-table-column prop="packing_fee" label="包装费"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="del(scope.$index,scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <el-button class="btn" type="primary" @click="submitForm('ruleForm')">确认添加食品</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "", //店铺ID
      newfrom: "",
      newfromo: "",
      category_id: "",
      options: [],
      valu: "",
      activeNames: [],
      //食品特点
      value: [],
      data: [
        {
          value: "新品",
          label: "新品"
        },
        {
          value: "招牌",
          label: "招牌"
        }
      ],
      //总数据
      ruleForm: {
        name: "",
        activity: "",
        description: "",
        resource: 1,
        packing_fee: 0,
        price: 20
      },
      //单规格
      isshow: true,
      //双规格
      isshow2: false,
      guige: {
        specs: "",
        packing_fee: 0,
        price: 20
      },
      //添加规格弹框
      dialogFormVisible: false,
      formLabelWidth: "100px",
      //添加规格表格
      specfoods: [
        {
          specs: "默认",
          packing_fee: 0,
          price: 20
        }
      ],
      //图片
      imageUrl: "",
      //
      rules: {
        name: [
          { required: true, message: "请输入食品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    } else if (!this.$route.params.id) {
      this.id = 1;
      this.addgoods();
    }
    this.shipinfenlei();
  },
  methods: {
    shipinfenlei() {
      this.Axios.get(
        "https://elm.cangdu.org/shopping/getcategory/" + this.id
      ).then(res => {
        this.options = res.data.category_list;
      });
    },
    go() {
      let data = {
        description: this.newfromo,
        name: this.newfrom,
        restaurant_id: this.id
      };
      this.Axios.post("https://elm.cangdu.org/shopping/addcategory", data).then(
        res => {
          if (res.data.success == "添加食品种类成功") {
            this.$message({
              showClose: true,
              message: "恭喜你，添加食品分类成功",
              type: "success"
            });
            this.shipinfenlei();
          }
        }
      );
    },
    open(a) {
      this.category_id = a;
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

    //弹框
    addgoods() {
      this.$confirm("添加食品需要选择一个商铺，现在就去选择商铺吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // type: 'warning'
      })
        .then(() => {
          this.$router.push("/LOGIN/Business");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    },
    //规格
    one() {
      this.isshow2 = false;
      this.isshow = true;
    },
    two() {
      this.isshow2 = true;
      this.isshow = false;
    },
    //添加规格
    tru() {
      let obj = {
        specs: this.guige.specs,
        packing_fee: this.guige.packing_fee,
        price: this.guige.price
      };
      this.specfoods.push(obj);
      this.guige.specs = "";
      this.dialogFormVisible = false;
    },
    del(index) {
      this.specfoods.splice(index, 1);
    },

    //确认添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            activity: this.ruleForm.activity,
            attributes: [],
            category_id: this.category_id,
            description: this.ruleForm.description,
            image_path: this.imageUrl,
            name: this.ruleForm.name,
            restaurant_id: this.id,
            specs: [
              {
                specs: "默认",
                packing_fee: 0,
                price: 20
              }
            ]
          };
          this.Axios.post("https://elm.cangdu.org/shopping/addfood", data).then(
            res => {
              if (res.data.status == 1) {
                this.$message({
                  type: "success",
                  message: res.data.success
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              }
            }
          );
        } else {
          this.$notify.error({
            title: "错误",
            message: "请检查输入是否正确",
            offset: 100
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.P {
  width: 100%;
  text-align: center;
}
.addgoods {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
}
.table {
  width: 60%;
  margin: 0 auto;
  padding: 20px;

  .el-table {
    border: 1px solid #dfe6ec;
  }
}
.table2 {
  width: 650px;
}
.span {
  font-size: 10px;
  margin-bottom: -10px;
}
.div1 {
  display: flex;
  el-form-item {
    flex: 1;
  }
}
.btn {
  margin-left: 20%;
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 34px;
  color: #8c939d;
  width: 140px;
  height: 140px;
  line-height: 140px;
  border-radius: 10px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
  border-radius: 10px;
}
.avatar {
  width: 140px;
  height: 140px;
  display: block;
}
.button {
  margin: 20px 0;
  text-align: center;
}
</style>
