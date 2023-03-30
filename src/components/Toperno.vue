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
      <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name" @click="showLogin">
        <template slot="title">
          <span> {{ item.navItem }}</span>
        </template>
      </el-menu-item>
      <el-button round @click="toLogin" style="float: right">登录</el-button>
      <el-button round @click="toRegister" style="float: right">注册</el-button>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        { name: "/index", navItem: "首页" },
        { name: "/login", navItem: "我的" },
        { name: "/login", navItem: "我要发帖" },
        // { name: "/home/exam", navItem: "" },
        // { name: "/home/practice", navItem: "创建练习" },
      ],
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/Login" });
    },
    toRegister() {
      this.$router.push({ path: "/Register" });
    },
    showLogin(){
      this.$message.error("登录后即可显示该页面");
    }
  },
};
</script>

<style scoped>
.el-menu-item {
  font-size: 18px !important;
  background-color: rgba(240, 248, 255, 0.62);
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
  margin-right: 10px;
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