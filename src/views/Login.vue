<template>
  <div>
    <div class="container">
      <el-button class="backhome" icon="el-icon-d-arrow-left" @click="toIndex">返回首页</el-button>
      <div class="welcome">
        <h1 class="person">用户登录</h1>
        <div class="index">
          <div class="login">
            <el-form :rules= "rules" ref="loginform" :model="loginform">
              <el-form-item prop="uName">
                <el-input type="text" 
                    auto-complete="fasle" 
                    v-model="loginform.uName" 
                    placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="uPassword">
                <el-input type="password" 
                    auto-complete="fasle" 
                    v-model="loginform.uPassword"
                    placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"  @click="userLogin('loginform')" >登陆</el-button>
                <el-button type="primary"  @click="toRegister" >注册</el-button>
              </el-form-item>
            </el-form>
          </div>
                <span class="forge">注：请大家不要忘记密码哦</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../api/UserLogin/UserLogin";
export default {
  name: "Login",
  data() {
     return {
    //这里主要是初始化用户输入的信息，以及错误提示
      loginform:{
        uName: '',
        uPassword: '',
      },
      rules:{
        uName:[{required: true, message: '请输入用户名', trigger:'blur'}],
        uPassword:[{required: true, message: '请输入密码', trigger:'blur'}],
      }
    }
  },
  methods: {
    //这里定义了一个用户注册函数
    userLogin(loform) {
       this.$refs[loform].validate((valid) => {
        console.log(valid);
        if (valid) {
          login({
            username: this.loginform.uName,
            password: this.loginform.uPassword,
          })
            .then((r) => {
              // console.log(r);
              if (r.status == 1) {
                this.$message({
                  message: r.message,
                  type: 'success'
                });
                this.$router.push("/indexuser");
              } else {
                this.$message.error( r.message);
              }
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      },
    toIndex() {
      this.$router.push({ path: "/index" });
    },
    toRegister() {
      this.$router.push({ path: "/register" });
    },
  },
  components: {},
};
</script>

<style>
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
  height: 270px;
  width: 70%;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888;
  background-color: #272c56b8;
}
.login {
  margin-left: 40px;
  padding-top: 40px;
  margin-right: 40px;
}
.welcome {
  margin-top: 20%;
  margin-left: 60%;
}

.forge {
  display: block;
  text-align: right;
  padding-right: 10%;
  padding-top: -5%;
  color: #888;
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

/* ::v-deep .search .el-input{
  border-radius: 10px;
} */

</style>