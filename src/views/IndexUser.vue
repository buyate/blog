
<template>
  <div class="container">
    <Toper></Toper>
    <Toper style="display: none"></Toper>
      <div class="crumbs">
        <el-input
          placeholder="请输博客名"
          size="large"
          style="width: 200px"
          v-model="searchParams.findBlogTitle"
          clearable
        ></el-input> 
        <el-button type="primary" size="medium" @click="findBlog()" round><i class="el-icon-search"></i></el-button>
        <el-button type="primary" size="medium" @click="HaveBlogs()" round>全部博客</el-button>
    </div>
    <div class="welcome">
      <h1 class="person">一大波博客来啦！！</h1>
      <!-- 选择打开方向 -->
      <el-radio-group v-model="direction">
        <el-radio label="ltr">从左往右开</el-radio>
        <el-radio label="rtl">从右往左开</el-radio>
       <el-radio label="ttb">从上往下开</el-radio>
       <el-radio label="btt">从下往上开</el-radio>
      </el-radio-group>
      <!-- 博客遍历 -->
      <div v-for="(bblogs) in blogs" :model="bblogs" :key="bblogs.bid" :index="bblogs.btitle" ref="bblogs">
        <div class="index"  @click="HaveBlog(bblogs), HaveComment(bblogs),drawer = true" type="primary">
          <h3>{{ bblogs.bTitle }}</h3>
          <p v-html="bblogs.bcontent"/>
          <span>访问人数：{{ bblogs.bVisited }}</span>
          <span style="float: right">{{ bblogs.bDatatime }}</span>
        </div>
        <div style="margin: 20px 0"></div>
      </div>
        <div class="page">
          <el-pagination
            background
            :current-page="pageNo"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
            @current-change="changePage"
          ></el-pagination>
        </div>
      <!-- 打开内容 -->
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose" 
        :size="size"
        :item="blog"
        >
        <div >
          <h1 style="text-align: center;">{{blog.bTitle}}</h1>
            <div style="margin: 20px 0"></div>
          <div style=" text-align: right; color=red">作者UID：{{blog.uid}}&nbsp;&nbsp;&nbsp;&nbsp;创作时间：{{blog.bDatatime}}</div>
            <div style="margin: 20px 0"></div>
          <div class="textbody">
          <p v-html="blog.bcontent"></p>
        </div>
          <!-- 评论发布 -->
          <div style="margin: 20px 0"></div>
          <div>评论区：</div>
          <el-form ref="comment" label-width="80px">
          <el-form-item>
            <el-input type="textarea" v-model="comment.cContent" :rows="5"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addComment">立即发布</el-button>
            <el-button>取消</el-button>
          </el-form-item>
          </el-form>
          <!-- 品论内容 -->
          <div v-for="(comment) in comment" :key="comment.commentID">
          <div class="comment" type="primary">
            <p>用户：{{ comment.uName }}</p>
            <p>{{ comment.cContent }}</p>
            <span style="float: right">评论时间：{{ comment.cDatatime }}</span>
          </div>
          <div style="margin: 20px 0"></div> 
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
//导入公共组件
// import { all_blog} from "../api/Index/Index";
import { blog_by_bid } from "../api/Index/Index";
import { comment_by_bid } from "../api/Index/Index";
import { add_comment } from "../api/Index/Index";
import { select_by_title1 } from "../api/Index/Index";
import Toper from "../components/Toper";
import Toperno from "../components/Toperno";
export default {
  name: "Index",
  data() {
    return {
      //打开博客
      drawer: false,
      direction: 'rtl',
      size: '80%',
      //评论
      comment:{cContent:""},
      //分页
      pageNo: 1,
      pageSize: 5, //每页显示5条
      total: 0, //总条数
      //查询参数
      searchParams:{findBlogTitle:""},
      //markdown
      markdowns:[{bcontent:""}],
      //博客数据
      blogs: [],
      blog:{}
    };
  },
  methods: {
    changePage(val) {
      //val:改变页码当前的页码
      this.pageNo = val;
      this.findBlog(); //根据新的页码选取分页数据
    },
    
    //读取全部blog内容
    HaveBlogs() {
      this.pageNo = 1,
      this.searchParams.findBlogTitle = "",
      this.findBlog();
    },

    //读取单独博客内容，凭借博客bid
    HaveBlog(bblogs) {
    blog_by_bid({
      bID: bblogs.bid,
    })
    .then((r) => {
        if (r.status == 1) {
          this.blog = r.data;
      // console.log(this.blog);
          this.$message({
          message: r.message,
          type: 'success'
        });
        } else {
        this.$message.error( r.message);
        }
     })
      .catch(() => {});
    },
    
    //读取单独评论内容，凭借博客bid
    HaveComment(bblogs) {
      comment_by_bid({
        bID: bblogs.bid,
      })
      .then((r) => {
        if (r.status == 1) {
          this.comment = r.data;
        // this.$message.error( "博客评论"+r.message);
        } else {
        this.$message.error( "博客评论"+r.message);
        }
     })
      .catch(() => {});
    },

    //提交评论
    addComment() {
      // console.log(this.comment.cContent);
      // console.log(this.blog.bid);
      add_comment({
        bID: this.blog.bid,
        cFatherID: 1,
        cContent: this.comment.cContent,
        })
        .then((r) => {
          if (r.status == 1) {
          this.HaveComment(this.blog);
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
    
    //凭借标题搜索
    findBlog() {
      select_by_title1({
        //获取分页
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        bTitle: this.searchParams.findBlogTitle,
      })
        .then((r) => {
          // console.log(r.data.searchList);
          this.blogs = r.data.searchList;
          this.total = r.data.total;
        })
        .catch(() => {});
    },

    toLogin() {
      this.$router.push({ path: "/login" });
    },
    //询问是否关闭帖子
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.HaveBlogs();
          })
          .catch(_ => {});
    },
  },
  mounted:function () {   //自动触发写入的函数
    this.HaveBlogs();
  },
  components: {
    Toper,
    Toperno,
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

.index {
  /*margin-left:800px;*/
  margin-top: 200px;
  height: 110%;
  width: 80%;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888;
  background-color: #edeffb63;
  margin: 0 auto;
}

.comment {
  /*margin-left:800px;*/
  /*margin-top: 200px;*/
  margin: 0 auto;
  margin-top: 20px;
  height: 110%;
  width: 80%;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #888;
  background-color: #edeffb;
}

::v-deep .el-drawer {
  background-color: #e3e3e3ac !important
}

::v-deep .el-drawer .textbody{
  width: 80%;
  margin: 0 auto;
}

.text {
  /* height: 40px; */
  width: 80%;
  border-radius: 10px;
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

.welcome {
  margin-top: 5%;
  margin-left: 5%;
}

.person {
  margin-top: 25px;
  font-size: 30px;
  color: #ffffff;
  line-height: 1em;
  text-align: center;
  font-weight: 500;
  margin-right: 300px;
  margin: 0 auto;
}
</style>