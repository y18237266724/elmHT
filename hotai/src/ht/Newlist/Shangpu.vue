<template>
  <div>
    <div class="content5">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="店铺名称" class="inp">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" class="inp">
          <el-input v-model="address" v-on:input="inputFunc"></el-input>
          <el-card class="box-card" v-if="sh">
            <div class="text item">
              <p v-for="o in this.city" @click="PhP(o.name)">{{ o.name }}</p>
            </div>
          </el-card>
          <p>当前城市:{{ this.danqiancity }}</p>
          <span class="tishi" v-if="j">请输入详细地址</span>
        </el-form-item>
        <el-form-item label="联系电话" class="inp">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
        <el-form-item label="店铺介绍" class="inp">
          <el-input v-model="formLabelAlign.info"></el-input>
        </el-form-item>
        <el-form-item label="店铺标语" class="inp">
          <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" prop="region" class="inp">
          <el-select v-model="ww" placeholder="请选择">
            <el-option label="快餐" value="快餐"></el-option>
            <el-option label="熟食" value="熟食"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <span>
            品牌保证
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </span>
          <span>
            蜂鸟专送
            <el-switch v-model="ruleForm.delivery1"></el-switch>
          </span>
          <span>
            新开店铺
            <el-switch v-model="ruleForm.delivery2"></el-switch>
          </span>
       
          <span>
            外卖保
            <el-switch v-model="ruleForm.delivery3"></el-switch>
          </span>
          <span>
            准时达
            <el-switch v-model="ruleForm.delivery4"></el-switch>
          </span>
          <span>
            开发票
            <el-switch v-model="ruleForm.delivery5"></el-switch>
          </span>
        </el-form-item>
      </el-form>
      <p class="inp1">
        <span>配送费</span>
        <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      </p>
      <p class="inp1">
        <span>起送价</span>
        <el-input-number v-model="num2" @change="handleChange" :min="1" label="描述文字"></el-input-number>
      </p>
      <p class="time">
        <span>营业时间</span>
        <span>
          <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }"
          ></el-time-select>
        </span>
        <span>
          <el-time-select
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{ start: '08:30',  step: '00:15',  end: '18:30',  minTime: startTime}"
          ></el-time-select>
        </span>
      </p>

      <div class="update">
        <div class="update1">
          <p>上传店铺头像</p>
          <img
            :src="'http://elm.cangdu.org/img/'+this.imageUrl"
            alt
            class="img1"
            v-if="this.imageUrl.length>0"
          >
          <img src="../../images/ccc.png" class="img1" v-else>
          <input type="file" class="uplo" accept="image/jpeg, image/jpg, image/png" @change="h">
        </div>
        <div class="update2">
          <p>上传营业执照</p>
          <img
            :src="'http://elm.cangdu.org/img/'+this.imageUrl1"
            alt
            class="img1"
            v-if="this.imageUrl1.length>0"
          >
          <img src="../../images/ccc.png" class="img1" v-else>
          <input type="file" class="upload" accept="image/jpeg, image/jpg, image/png" @change="hh">
        </div>
        <div class="update2">
          <p>上传餐饮服务许可证</p>
          <img
            :src="'http://elm.cangdu.org/img/'+this.imageUrl2"
            alt
            class="img1"
            v-if="this.imageUrl2.length>0"
          >
          <img src="../../images/ccc.png" class="img1" v-else>
          <input type="file" class="upload" accept="image/jpeg, image/jpg, image/png" @change="hhh">
        </div>
      
      </div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="优惠活动" prop="region" class="inp">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="满减优惠" value="满减优惠">
              <el-button style="border:none;width:100%" @click="open">满减优惠</el-button>
            </el-option>
            <el-option label="优惠大酬宾" value="优惠大酬宾">
               <el-button style="border:none;width:100%" @click="open">优惠大酬宾</el-button>
            </el-option>
            <el-option label="新用户立减" value="新用户立减">
               <el-button style="border:none;width:100%" @click="open">新用户立减</el-button>
            </el-option>
            <el-option label="进店领劵" value="进店领劵">
               <el-button style="border:none;width:100%" @click="open">进店领劵</el-button>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="活动标题" prop="biao"></el-table-column>
          <el-table-column label="活动名称" prop="name"></el-table-column>
          <el-table-column label="活动详情" prop="xiangqing"></el-table-column>
          <el-table-column label="操作">
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="button">
        <el-button type="primary" @click="okk">立即创建</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addrest",
  data() {
    return {
      ww:'',
      j: false,
      danqiancity: "", //当前城市
      sh: false,
      //详细地址
      address: "",
      //配送时间
      startTime: "",
      endTime: "",
      //配送费默认值
      num1: 5,
      num2: 20,
      //表格右对齐属性
      labelPosition: "right",
      //图片上传格式
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",

      //最下面的表格
      tableData: [],
      city: [],

      formLabelAlign: {
        name: "",
        region: "",
        type: "",
        info: "",
        title: ""
      },
      ruleForm: {
        region: "",
        delivery: false,
        delivery1: false,
        delivery2: false,
        delivery3: false,
        delivery4: false,
        delivery5: false
      }
    };
  },
  created() {
    this.Axios.get("https://elm.cangdu.org/v1/cities?type=guess").then(res => {
      this.danqiancity = res.data.name;
    });
  },
  methods: {
    okk(){
      console.log(this.ruleForm)
      let data={activities:this.tableData,address:this.address,bao:this.ruleForm.delivery,business_license_image:this.imageUrl1,category:this.ww,catering_service_license_image:this.imageUrl2,delivery_mode:this.ruleForm.delivery1,description:this.formLabelAlign.info,endTime:this.endTime,float_delivery_fee:this.num1,float_minimum_order_amount:this.num2,image_path:this.imageUrl,is_premium:this.ruleForm.delivery4,latitude: 39.80255,longitude: 116.48681,name:this.formLabelAlign.name,new:this.ruleForm.delivery2,phone:this.formLabelAlign.type,piao:this.ruleForm.delivery5,promotion_info:this.formLabelAlign.title,startTime:this.startTime,zhun:this.this.ruleForm.delivery3}
      this.Axios.post('https://elm.cangdu.org/shopping/addShop',data).then((res)=>{
          if(res.data.sussess== "添加餐馆成功"){
            this.tableData=''
            this.address=''
            this.$message({
          message: '恭喜你，创建成功',
          type: 'success'
        });
          }
      })
    },
    open() {
      this.$prompt("请输入活动信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          let obj={}
          obj.xiangqing=value;
          obj.name=this.ruleForm.region;
          if(this.ruleForm.region=="满减优惠"){
            obj.biao="减"
          }else if(this.ruleForm.region=="优惠大酬宾"){
            obj.biao="特"
          }else if(this.ruleForm.region=="新用户立减"){
            obj.biao="新"
          }else if(this.ruleForm.region=="进店领劵"){
            obj.biao="领"
          }
        this.tableData.push(obj)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    hhh(e) {
      // e.preventDefault()//阻止浏览器进行 默认行为
      let $target = e.target || e.srcElement;
      // let a=document.getElementsByClassName('upload').value
      // console.log(a)
      let file = $target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const instance = this.Axios.create({
        withCredentials: true
        // 需要设置 withCredentials：true , 表示跨域请求时是否需要使用凭证. 默认为false
      });
      instance
        .post("https://elm.cangdu.org/v1/addimg/food", formData)
        .then(res => {
          this.imageUrl2 = res.data.image_path;
          console.log(res.data.image_path);
        });
    },
    hh(e) {
      // e.preventDefault()//阻止浏览器进行 默认行为
      let $target = e.target || e.srcElement;
      // let a=document.getElementsByClassName('upload').value
      // console.log(a)
      let file = $target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const instance = this.Axios.create({
        withCredentials: true
        // 需要设置 withCredentials：true , 表示跨域请求时是否需要使用凭证. 默认为false
      });
      instance
        .post("https://elm.cangdu.org/v1/addimg/food", formData)
        .then(res => {
          this.imageUrl1 = res.data.image_path;
          console.log(res.data.image_path);
        });
    },
    h(e) {
      // e.preventDefault()//阻止浏览器进行 默认行为
      let $target = e.target || e.srcElement;
      // let a=document.getElementsByClassName('upload').value
      // console.log(a)
      let file = $target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const instance = this.Axios.create({
        withCredentials: true
        // 需要设置 withCredentials：true , 表示跨域请求时是否需要使用凭证. 默认为false
      });
      instance
        .post("https://elm.cangdu.org/v1/addimg/food", formData)
        .then(res => {
          this.imageUrl = res.data.image_path;
        });
    },

    PhP(a) {
      this.address = a;
      this.sh = false;
    },
    inputFunc() {
      let a = this.address;
      this.Axios.get(
        "https://elm.cangdu.org/v1/pois?type=search&city_id=51&keyword=" + a
      ).then(res => {
        this.city = res.data;
        if (a.length > 0) {
          this.sh = true;
          this.j = false;
        } else {
          this.sh = false;
          this.j = true;
        }
      });
    },
    handleChange(value) {
      // console.log(value);
    },
handleDelete(r,q){
  this.tableData.splice(r,1)
},
   


  }
};
</script>
 
<style lang="scss"  scoped>
.update1,.update2{
  width: 200px;
  height: 200px;
}
.uplo,.upload {
  width: 100px;
  height: 100px;
  position: relative;
  top: -104px;
  left: 100px;
  opacity: 0;
}
.img1 {
  width: 100px;
  height: 100px;
  margin-left: 100px;
}
.tishi {
  font-size: 13px;
  color: red;
}
.text {
  font-size: 14px;
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header {
  width: 100%;
  height: 50px;
  background-color: #eff2f7;
}

.content5 {
  padding: 20px 200px 20px 200px;
  .inp {
    padding-top: 20px;
  }
  .inp1 {
    padding-top: 20px;
    padding-left: 20px;
    font-size: 14px;
    span {
      color: #606266;
      margin-right: 15px;
    }
  }
  .time {
    margin-top: 20px;
    span:nth-of-type(1) {
      color: #606266;
      font-size: 14px;
      margin-left: 5px;
      margin-right: 10px;
    }
    span:nth-of-type(2) {
      margin-right: 15px;
    }
  }
  .update {
    width: 100%;
  }
  .list {
    button {
      width: 50px;
      height: 25px;
    }
  }
  .button {
    width: 100%;
    text-align: center;
    button {
      width: 150px;
      height: 35px;
    }
  }
}
</style>