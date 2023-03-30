<template>
  <div>
    <div class="container">
      <el-button class="backhome" icon="el-icon-d-arrow-left" @click="toIndexUser"
        >返回首页</el-button
      >
      <div class="welcome">
        <h1 class="person">博客撰写</h1>
        <div class="index">
          <div class="login">
            <el-input
              placeholder="请文章标题"
              v-model="blog_title"
              clearable
              class="text"
            >
            </el-input>
            <div style="margin: 20px 0"></div>
            <mavon-editor
              v-model="content"
              ref="md"
              @imgAdd="$imgAdd"
              @change="change"
              class="text"
              value=""
            ></mavon-editor>
            <div style="margin: 20px 0"></div>
            <input
              type="button"
              class="button1"
              value="发布"
              @click="submit"
            /><br />
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
//导入公共组件
import { add_blog } from "../api/Blog/blog";
export default {
  name: "Login",

  props: [],
  data() {
    return {
      blog_title: "",

      //mavon-editor
      content: "",
      html: "",
      configs: {},
    };
  },

  components: {},
  methods: {
    toUser() {
      this.$router.push({ path: "/user" });
    },
    toIndexUser() {
      this.$router.push({ path: "/indexuser" });
    },

    //mavon-editor
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      let formdata = new FormData();

      this.$upload
        .post("/http://localhost:8083", formdata)
        .then((res) => {
          console.log(res.data);
          this.$refs.md.$img2Url(pos, res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    submit() {
      // console.log(this.content);
      // console.log(this.html);
      add_blog({
        bTitle: this.blog_title,
        bContent: this.html,
      })
      .then((r) => {
        if(r.status == 1){
        this.$message({
          message: r.message,
          type: 'success'
        });
        this.$router.push({ path: "/indexuser" });
        }else{
          this.$message.error( r.message);
        }
        // this.$router.push({ path: "/user" });
      })
      .catch(() => {});
    },
  },
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
  color: #5d91a7;
}

input {
  border: none;
  box-shadow: none;
  font-size: 15px;
  color: #333333;
  outline: none;
  /*鼠标点击是输入框颜色不发生改变*/
}

.text {
  /* height: 40px; */
  width: 80%;
  border-radius: 10px;
}

.button1 {
  height: 40px;
  width: 330px;
  background-color: #319aec;
  font-size: 16px;
  margin-top: 15px;
  margin-left: 20%;
  border-radius: 10px;
  color: white;
}

.button1:hover {
  color: white;
  background-color: #286090;
}

.container {
  background-image: url(../img/Login/Background.jpg);
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  margin: 0 auto;
  background-size: cover;
  border: 1px black solid;
}

.index {
  /*margin-left:800px;*/
  /*margin-top: 200px;*/
  height: 110%;
  width: 80%;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888;
  background-color: #edeffb63;
  margin: 0 auto;
}

.login {
  margin-left: 15%;
  padding-top: 5%;
}

.forge {
  display: block;
  text-align: right;
  padding-right: 25px;
}

.welcome {
  margin-top: 5%;
  margin-left: 5%;
}

.person {
  font-size: 30px;
  color: #ffffff;
  line-height: 1em;
  text-align: center;
  font-weight: 500;
  /* margin-right: 300px; */
}

.backhome {
  background-color: #edeffb2c;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(136, 136, 136, 0.339);
  color: rgba(255, 255, 255, 0.723);
  border-color: rgba(255, 255, 255, 0.051);
}
</style>
