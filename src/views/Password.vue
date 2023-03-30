<template>
  <div class="password">
        <Toper></Toper>
        
<div class="s" style="width:800px">
    <el-descriptions class="margin-top" title="密码修改" :column="1" size="medium" border>
    <template slot="extra">
      <el-button type="primary" size="small" @click="create()">操作</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      {{uName}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-key"></i>
        密码
      </template>
       *******
    </el-descriptions-item>
  </el-descriptions>
  </div>
  <el-dialog  :visible.sync="alter" title="修改密码" width="40%">
        <el-form  label-width="70px" ref="form" :model="entityForm">
           <el-form-item label="用户密码" >
             <el-input v-model="entityForm.upassword" type="password" placeholder="请输入修改后的密码"></el-input>
          </el-form-item>
           <el-form-item label="确认密码" >
            <el-input v-model="entityForm.upassword1" type="password" placeholder="请输入修改后的密码"></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer" slot="footer">
          <el-button @click="save">确 定</el-button>
          <el-button @click="alter = false">取 消</el-button>
        </span>
      </el-dialog>
      <Sidebar></Sidebar>
    </div>

</template>

<style type="text/css">
.s{
  float: right !important;
  padding-right: 20%;
}
</style>

<script>
//导入公共组件Footer
import Toper from "../components/Toper";
import Sidebar from "../components/Sidebar";
import {update_user} from"@/api/Password/password";
import {login_state} from"@/api/Password/password";
export default {
  name: "Password",
data() {
      return {
        uName:"",
        entityForm:{},
        alter: false,
      }
    },
  mounted(){
    this.showTable();
  },
    methods:{
    showTable(){
      login_state({

      }).then(r => {
        console.log(r);
        this.uName = r.data.uname;
      }).catch(() => {});
    },
//显示修改框
      create(){
          this.alter = true;
          this.entityForm = {
            pwd:'',
            pwd2:'',

          }
        },
        save(){
          if(this.entityForm.upassword != this.entityForm.upassword1){
            alert("两次密码不对请重新输入");
            return;
          }
          else{
            alert("修改成功！"),
          update_user({
            newPassword :this.entityForm.upassword,
            
          }).then(r =>{
            console.log(r);
            this.showTable();
          }).catch(() => {});            
          }


          //this.entityForm.id = window.localStorage.getItem("id");
//          this.$ajax.post("/user/updateUser",this.entityForm).then(rep=>{
//            if(rep.data.code == 100){
//              alert(rep.data.data);
//              self.showTable();
//            } else {
//                alert(rep.data.data);
//            }
//        })
          this.alter = false;
      },
    },
//mounted() {
//  document.onscroll = () => {
//    //获取滚动条位置
//    let s1 = document.documentElement.scrollTop;
//    let s2 = document.body.scrollTop;
//    let scroll = s1 == 0 ? s2 : s1;
//    //获取视口宽度
//    let width = document.documentElement.clientWidth;
//    //获取顶部固定块
//    let search = document.getElementById("fixedBox");
//    //判断滚动条超过视口宽度的12%时，搜索块变固定定位
//    if (scroll > width * 0.12) {
//      search.style.position = "fixed";
//      search.style.left = "0";
//      search.style.top = "0";
//    } else {
//      search.style.position = "static";
//    }
//  };
//},
//destroyed() {
//  //销毁滚动条
//  document.onscroll = null;
//},
  components: {
    Toper,
    Sidebar,
  },
};
</script>
