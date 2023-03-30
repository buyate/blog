<template>
  <div class="header">
    <div class="img">
      <img src="../img/Toper/Logo1.jpg" />
    </div>
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
      background-color="#fff"
      text-color="#333"
      active-text-color="#0084ff"
      style="flex: 1"
    >
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <span> {{ item.navItem }}</span>
        </template>
      </el-menu-item>
      <el-popconfirm
        style="float: right;"
        icon="el-icon-info"
        icon-color="red"
        title="正在退出"
        @click="LoginOut"
      >
        <el-button icon="el-icon-delete-solid" slot="reference" color="red" @click="LoginOut" 
        style="float: right;font-size: 15px;">注销</el-button>
      </el-popconfirm>
      <img
        class="head"
        style="float: right"
        src="../img/Toper/Dog.jpg"
        @click="toUser"
      />

      <p style="float: right; 
      margin-right: 10px;
      margin-top: 10px;
      font-size: 30px;">{{user.uname}}</p>
    </el-menu>
  </div>
</template>

<script>
import {login_state} from"../api/Components/components";
import {login_out} from"../api/UserLogin/UserLogin";
export default {
  data() {
    return {
      navList: [
        { name: "/indexuser", navItem: "首页" },
        { name: "/user", navItem: "我的" },
        { name: "/blog", navItem: "我要发帖" },
      ],
      user:{},
      img : ""
    };
  },
  methods: {
    //获取登录信息
    haveUser(){
      login_state({}).then(r => {
        // console.log("获取登录信息");
        // console.log(r);
        this.user = r.data;
      }).catch(() => {});
    },

    //退出登录
    LoginOut() {
      login_out({ })
        .then((r) => {
          if (r.status == 1) {
            this.$router.push({ path: "/index" });
          this.$message({
          message: r.message,
          type: 'success'
          })
        } else {
        this.$message.error( r.message);
        }
        })
        .catch(() => {});
    },

    toBlog() {
      this.$router.push({ path: "/blog" });
    },
    toUser() {
      this.$router.push({ path: "/user" });
    },
  },
  mounted:function () {   //自动触发写入的函数
    this.haveUser();
  },
};
</script>

<style scoped>
.el-menu-item {
  font-size: 18px !important;
}
.el-menu-item.is-active {
  color: #ea5b2c !important;
  font-size: 18px !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #ea5b2c !important;
}
.el-button {
  /* margin-left: 55%; */
  margin-top: 10px;
  font-size: 20px;
  font-family: "等线";
}
</style>
<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  .img {
    background: #ffffff;
    border-bottom: solid 1px #e6e6e6;
    img {
      height: 60px;
      padding: 0px;
    }
  }
}
.head {
  height: 50px;
  padding: 10px;
}
</style>

