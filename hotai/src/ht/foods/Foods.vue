<template>
  <div>
    <el-table :data="tableData" style="width: 100%" @expand-change="change">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="食品 ID">
              <span>{{ props.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.month_sales }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ oneData.name }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID">
              <span>{{ props.row.restaurant_id }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ oneData.address }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ oneData.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="食品名称" prop="name"></el-table-column>
      <el-table-column label="食品介绍" prop="description"></el-table-column>
      <el-table-column label="评分" prop="rating"></el-table-column>
      <el-table-column label="操作" prop="descs">
        <template slot-scope="scope">
<el-button size="mini" @click="bian(scope.row)">编辑</el-button>
<el-button size="mini" type="danger" @click="ks(scope.row)">删除</el-button>
</template>
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


    <div class="zhe" v-if="show">
        <div class="zhe1">
            <p class="p1">修改食品信息<span @click="all"><b>X</b></span></p>
            
        <el-form label-width="80px" :model="formLabelAlign">
             <el-form-item label="食品名称"  class="inp">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍"  class="inp">
            <el-input v-model="formLabelAlign.jieshao"></el-input>
          </el-form-item>
            <span class="demonstration">食品分类</span>
  <el-cascader
    :options="options"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader>
<br>
<span>
    食品图片
</span>
  <input type="file" class="upload" accept="image/jpeg, image/jpg, image/png" @change="h" />
       
    <img :src='"http://elm.cangdu.org/img/"+this.img'>

 <el-table :data="DDta" style="width: 100%" >
            <el-table-column
              label="规格"
              prop="guige"
            >
            </el-table-column>
            <el-table-column
              label="包装费"
              prop="num">
            </el-table-column>
            <el-table-column
              label="价格"
              prop="num1">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
              </template>
              
            </el-table-column>
          </el-table>
        
  <el-button type="text" @click="gui" class="t">添加规格</el-button>
        </el-form>
         <button @click="off" class="ok">取消</button><button @click="Mok" class="of">确定</button>
        
        </div>
<div v-if="isshow2" class="ding">
<div class="ding-2">
<div class="ding-header">
<span>修改食品信息</span>
<span @click="off1">X</span>
</div>
<div class="ding-center2">
<el-form
:model="ruleForm"
:rules="rules"
ref="ruleForm"
label-width="100px"
class="demo-ruleForm"
>
<el-form-item label="规格" prop="name">
<el-input v-model="ruleForm.name"></el-input>
</el-form-item>
<el-form-item label="包装费" prop="num">
<el-input-number
size="medium"
:min="0"
v-model="ruleForm.num"
></el-input-number>
</el-form-item>
<el-form-item label="价格" prop="num1">
<el-input-number
size="medium"
:min="0"
v-model="ruleForm.num1"
></el-input-number>
</el-form-item>
</el-form>
<div class="ding-footer">
<el-button @click="off1">取消</el-button>
<el-button type="primary" @click="tianjia">确认</el-button>
</div>
</div>
</div>
</div>

    </div>
   
  </div>
</template>

<script>

export default {
  data() {
    return {
      oooo:1,
      tableData: [],//食品数据
      count: 0,
      currentPage: 1,
      oneData:[],//单个商品数据
        show:false,
        fenlei:[],//食品分类
          options: [{value:'',label: ''}],
        selectedOptions: [],//食品信息
        selectedOptions2: [],
        formLabelAlign:{
            name:'',
            jieshao:''
        },
        img:"",
         
        // category_id:'',//修改类别id
        // description:'',//修改信息描述
        item:[],
        item1:[],
        gu:false,//添加规格
        ruleForm: {
name: "",
num: 0,
num1: 20
},
isshow2: false,
        DDta:[],
        rules: {
name: [
{ required: true, message: "请输入规格", trigger: "blur" },
{ min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
]
},
    };
  },
 
  mounted() {
    //默认携带Axios cookie
      this.Axios.defaults.withCredentials=true;
    this.arrzoo()
  },
  
  methods: {
    
    ks(item){
      this.Axios.delete('https://elm.cangdu.org/shopping/v2/food/'+item.item_id).then(res=>{
        if(res.data.message=="亲，您的权限不足"){
          this.$message({
            message: '亲，您的权限不足',
             type: 'success'
          });
        }else if(res.data.message=="亲，您还没有登录"){
              this.$message({
            message: '亲，您还没有登录',
             type: 'success'
          });
            }
      })
    },
    off(){this.show=false},
    off1(){
      this.isshow2=false;
    },
     arrzoo(){
       //数据封装函数
     this.Axios.get(
      "https://elm.cangdu.org/shopping/v2/foods?offset="+(this.oooo - 1) * 20+"&limit=20&restaurant_id=undefined"
    ).then(res => {
      this.tableData = res.data;
    });
    this.Axios.get("https://elm.cangdu.org/shopping/v2/foods/count?restaurant_id=undefined").then(
      res => {
        this.count = res.data.count;
      }
    );
  },
      Mok(){
          let data={category_id:this.item.category_id,category_name:this.selectedOptions,description: this.formLabelAlign.jieshao,image_path:this.img,index: '',
          item_id:this.item.item_id,month_sales:this.item.month_sales,name: this.formLabelAlign.name,new_category_id: this.item.category_id,rating:this.item.rating,//评分
          restaurant_address:this.item1.address,restaurant_id: this.item.restaurant_id,restaurant_name:this.item.name,
          specfoods:this.item.specfoods,
          specs:this.DDta
}
          this.Axios.post('https://elm.cangdu.org/shopping/v2/updatefood',data).then(res=>{
            if(res.data.success=="修改食品信息成功"){
              this.DDta=''
              this.show=false
              this.arrzoo()
            }else if(res.data.message=="亲，您还没有登录"){
              this.$message({
            message: '亲，您还没有登录',
             type: 'success'
          });
            }

          })
      },
       
      handleDelete(r,q){
        this.DDta.splice(r,1)
      },
        h(e) {
        // e.preventDefault()//阻止浏览器进行 默认行为
        let $target = e.target || e.srcElement;
        // let a=document.getElementsByClassName('upload').value
        // console.log(a)
        let file = $target.files[0];
        let formData = new FormData(); 
        formData.append('file', file);  
         const instance=this.Axios.create({
            withCredentials: true
            // 需要设置 withCredentials：true , 表示跨域请求时是否需要使用凭证. 默认为false
           }) 
        instance.post('https://elm.cangdu.org/v1/addimg/food',formData)
       .then(res=>{
        
           this.img=res.data.image_path
       })
    },
       handleChange(value) {
        console.log(value);
      },
      all(){
          //关闭编辑遮罩层
          this.show=false
      },
      bian(a){
        
       if(a.specfoods){
          this.DDta=[]
          let ob={};
          if(a.specfoods[0].specs_name!=''){
                ob.guige = a.specfoods[0].specs_name
          }else{
            ob.guige=''
          }
          
          ob.num = a.specfoods[0].original_price
          ob.num1 = a.specfoods[0].price
          this.DDta.push(ob);
       }

      this.img=a.image_path
      this.formLabelAlign.name=a.name
      this.formLabelAlign.jieshao=a.description
     this.item=a
        this.Axios.get('https://elm.cangdu.org/shopping/v2/menu?restaurant_id='+a.restaurant_id+'&allMenu=true').then(res=>{
           res.data.map((item)=>{
                //食品标签渲染
                let obj = {}
                obj.value=item.name;
                obj.label=item.name;
                this.options.push(obj)
            })
        })
          this.Axios.get('https://elm.cangdu.org/shopping/restaurant/'+a.restaurant_id).then(res=>{
             this.item1=res.data
          })

          this.show=true
      },
      change(r,q){

          this.Axios.get('https://elm.cangdu.org/shopping/restaurant/'+r.restaurant_id).then(res=>{

              this.oneData=res.data
          })
          
          
      },
    handleSizeChange(val) {
      this.oooo=val
      //点击页码更新数据
      this.Axios.get(
        "https://elm.cangdu.org/shopping/v2/foods?offset=" +
          (val - 1) * 20 +
          "&limit=20"
      ).then(res => {
        this.tableData = res.data;
      });
    },
    handleCurrentChange(val) {
      this.oooo=val
      //点击箭头更新数据
      this.Axios.get(
        "https://elm.cangdu.org/shopping/v2/foods?offset=" +
          (val - 1) * 20 +
          "&limit=20"
      ).then(res => {
        this.tableData = res.data;
      });
    },
    gui(){
     
      
      this.isshow2=true
    },
    tianjia(){
      let obj = {};
(obj.guige = this.ruleForm.name),
(obj.num = this.ruleForm.num),
(obj.num1 = this.ruleForm.num1);
this.DDta.push(obj);
this.isshow2 = false;
    }
  }
};
</script>
<style lang="scss" scoped>
*{
margin: 0;
padding: 0;
}
.t{
  width: 20%;
 height: 40px;
  border: 0px;
  border-radius: 10px;
  background: #409EFF;
  color: white;
  margin-left: 40%;
}
.ok{
  width: 100px;
  height: 30px;
  border: 0px;
  border-radius: 10px;
  color: gray;
  font-size: 17px;
  margin-left: 55%;
  margin-top: 10%;
}
.of{
  width: 100px;
  height: 30px;
  background:blue;
  border: 0px;
  border-radius: 10px;
  color: white;
  font-size: 17px;
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
.ding {
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
position: fixed;
top: 0;
left: 0;
}
.ding-1 {
width: 800px;
height: 680px;
background: white;
animation: fadeInDown 0.5s;
margin: 40px auto;
}
.ding-2 {
width: 800px;
height: 350px;
background: white;
position: absolute;
top: 60px;
left: 350px;
}
.ding-header {
width: 100%;
height: 40px;
line-height: 40px;
span:nth-of-type(1) {
font-size: 16px;
font-weight: 700;
color: #1f2d3d;
}
span:nth-of-type(2) {
cursor: pointer;
font-size: 16px;
float: right;
color: #ddd;
margin-right: 20px;
}
span:nth-of-type(2):hover {
color: blue;
}
}
.ding-center {
width: 600px;
margin: 20px auto;
}
.ding-center2 {
width: 600px;
margin: 20px auto;
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
// .avatar-uploader-icon{
//     width: 150px;
//     height: 150px;
//     border: 1px dashed #d9d9d9;
//     border-radius: 10px;
//   background: white !important;
//   font-size: 30px;
//   line-height: 150px;
// }
//  .p{
//         margin-top: 20px;
//         span{
//           float: left;
//           font-size: 14px;
//           color: #606266;
//           margin-right:100px;
//         }
//       }
.p1{
    width: 90%;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    margin: 0 auto;
    span{
        color: gray;
        float: right;
        cursor: pointer;
    }
}
.but{
    background: red;
    border: 1px solid red;
    color: white;
    width: 40px;
    height: 25px;
    border-radius: 5px;
}
.zhe{
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
   
}
.zhe1{
    width: 40%;
    height: 80%;
    background: white;
    margin: 0 auto;
    margin-top: 5%;
     overflow: auto;
}
</style>
