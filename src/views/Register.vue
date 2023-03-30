<template>
  <div>
    <div class="container">
      <el-button class="backhome" icon="el-icon-d-arrow-left" @click="toIndex"
        >返回首页</el-button
      >
      <div class="welcome">
        <h1 class="person">用户注册</h1>
        <div class="index">
          <div class="login">
            <el-form :rules= "rules"  ref="reForm" :model="reForm">
               <el-form-item prop="uName">
                <el-input type="text" 
                    auto-complete="fasle" 
                    v-model="reForm.uName"
                    placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="uPassword">
                <el-input type="password" 
                    auto-complete="fasle" 
                    v-model="reForm.uPassword"
                    placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item prop="pwdagain">
              <el-input type="password" 
                    auto-complete="fasle" 
                    v-model="reForm.pwdagain"
                    placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-model="reForm" @click="userRegister('reForm')">注册</el-button>
              </el-form-item>
            </el-form>
            <span class="forge"
              ><a @click="toLogin" target="_blank">已有账号，直接登录</a></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Required,
  Float2,
  Boolean,
  FillerFieldRules,
} from "@/utils/validateRules";
import { register } from "../api/UserLogin/UserLogin";
export default {
  name: "Register",
  data() {
     return {
    //这里主要是初始化用户输入的信息，以及错误提示
      reForm:{
        uName: '',
        uPassword: '',
        pwdagain: '',
      },
      uError:'',
      pError:'',
      aError:'',
      rules:{
        uName:[{required: true, message: '请输入用户名', trigger:'blur'}],
        uPassword:[{required: true, message: '请输入密码', trigger:'blur'}],
        pwdagain:[{required: true, message: '请输入相同密码', trigger:'blur'}],
      }
    }
  },
  methods: {
 //这里定义了一个用户注册函数
    userRegister(reForm) {
       this.$refs[reForm].validate((valid) => {
        if (valid) {
          if(this.reForm.pwdagain == this.reForm.uPassword){
          register({
            //get
            username: this.reForm.uName,
            password: this.reForm.uPassword,
          })
            .then((r) => {
              // console.log(r);
              if (r.status == 1) {
                this.$message({
                  message: r.message,
                  type: 'success'
                });
                this.$router.push("/login");
              } else {
                this.$message.error( r.message);
              }
            })
            .catch(() => {});
          }else{
            this.$message.error("两次密码不一致，请重新输入");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      },

    toLogin() {
      this.$router.push({ path: "/login" });
    },
    toIndex() {
      this.$router.push({ path: "/index" });
    },
  },
  components: {},
};
</script>

<style scoped>
.body {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
a:hover {
  color: #3d6e84;
}
input {
  border: none;
  box-shadow: none;
  font-size: 15px;
  color: #333333;
  outline: none; /*鼠标点击是输入框颜色不发生改变*/
}

.text {
  height: 40px;
  width: 330px;
  border-radius: 10px;
}
.password {
  height: 40px;
  width: 330px;
  margin-top: 20px;
  border-radius: 10px;
}
.button1 {
  height: 40px;
  width: 330px;
  margin-top: 20px;
  border-radius: 10px;
}
.button2:hover {
  color: white;
  background-color: #286090;
}
.button2 {
  height: 40px;
  width: 330px;
  background-color: #319aec;
  font-size: 16px;
  margin-top: 15px;
  /*margin-bottom: 100px;*/
  border-radius: 10px;
  color: white;
  display: block;
}
.container {
  background-image: url(../img/Login/Background.jpg);
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  margin: 0 auto;
  background-size: cover;
  border: 1px black solid;
  /*background-repeat: no-repeat;*/
}

.index {
  /*margin-left:800px;*/
  /*margin-top: 200px;*/
  height: 320px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888;
  background-color: #272c56b8;
}
.login {
  margin-left: 40px;
  padding-top: 40px;
}
.forge {
  display: block;
  text-align: right;
  padding-right: 25px;
}
.welcome {
  margin-top: 200px;
  margin-left: 800px;
}
.person {
  font-size: 30px;
  color: #ffffff;
  line-height: 1em;
  text-align: center;
  font-weight: 500;
  margin-right: 300px;
}

.backhome {
  background-color: #edeffb2c;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(136, 136, 136, 0.339);
  color: rgba(255, 255, 255, 0.723);
  border-color: rgba(255, 255, 255, 0.051);
}
</style>