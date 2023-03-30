<template>
  <div class="sidebar">
    <el-menu
      active-text-color="#20a0ff"
      background-color="#324157"
      class="sidebar-el-menu"
      router
      text-color="#bfcbd9"

    >
  
       <el-menu-item  default-active @click="toUser">
        <i class="el-icon-edit-outline"></i>
        <span slot="title" >我的帖子</span>
      </el-menu-item>
       <el-menu-item  default-active  @click="toComments">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论</span>
      </el-menu-item>
          <el-menu-item  @click="toPassword">
        <i class="el-icon-key" ></i>
        <span slot="title">密码修改</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
    data() {
    return {
    };
  },
    methods: {
    toComments() {
     this.$router.push({ path: "/comments" });
    },
        toPassword() {
     this.$router.push({ path: "/password" });
    },
            toUser() {
     this.$router.push({ path: "/user" });
    },
    }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0px;
  top: 71px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.sidebar > ul {
  height: 100%;
}
</style>
