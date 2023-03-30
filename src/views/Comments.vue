<template>
  <div class="Comments">
        <Toper></Toper>
        <Sidebar></Sidebar>
   <div>
           <el-table :data="tableComments" border style="width: 85%" class="commentInfo">
            <el-table-column prop="bTitle" label="文章标题" width="200%">
            </el-table-column>
            <el-table-column prop="cDatatime" label="日期" width="200%">
            </el-table-column>
            <el-table-column prop="cContent" label="内容" width="600%">
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="s">
          <el-button type="text" size="small" @click="deComment(s.row.cID)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>

      <div class="page">
        <el-pagination
      background
      :current-page="pageNo"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @current-change="changePages"
    ></el-pagination></div>
    </div>
  </div>
  
</template>

<style>
.el-container{
  width:fit-content;
float:right;
}
  .el-header {
    background-color: #639be4;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

.commentInfo{
  float: right;
  position: absolute;
}
</style>

<script>
//导入公共组件Footer
import Toper from "../components/Toper";
import Sidebar from "../components/Sidebar";
import { select_comment_by_uid } from "@/api/Comments/Comments";
import { delete_comment } from "@/api/Comments/Comments";
export default {
  name: "Comments",
data() {
      return {
        tableComments:[],
        pageNo: 1,
             pageSize: 5, //每页显示5条
             total: 0, //总条数
      }
    },
// mounted() {
//   document.onscroll = () => {
//     //获取滚动条位置
//     let s1 = document.documentElement.scrollTop;
//     let s2 = document.body.scrollTop;
//     let scroll = s1 == 0 ? s2 : s1;
//     //获取视口宽度
//     let width = document.documentElement.clientWidth;
//     //获取顶部固定块
//     let search = document.getElementById("fixedBox");
//     //判断滚动条超过视口宽度的12%时，搜索块变固定定位
//     if (scroll > width * 0.12) {
//       search.style.position = "fixed";
//       search.style.left = "0";
//       search.style.top = "0";
//     } else {
//       search.style.position = "static";
//     }
//   };
// },
//destroyed() {
//  //销毁滚动条
//  document.onscroll = null;
//},
    created() {
    this.changeData(); //页面加载就初始化商品数据，默认选第一页的数据
  },
  methods:{
  changePages(val) {
      //val:改变页码当前的页码
      this.pageNo = val;
      this.changeData(); //根据新的页码选取分页数据
    },
      changeData() {
      select_comment_by_uid(
        {
          //获取文章列表
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        }
      )
        .then(r => {
           console.log(r);
          this.tableComments = r.data.searchList;
          this.total = r.data.total;
        })
        .catch(() => {});
    },
//获取文章标题
//    getCTitle(){
//      select_title_by_cid({
//        cID: this.tableComments.cID,
//        }).then(r =>{
//          console.log(r);
//          this.tableComments.bTitle = r.data.searchList;
//        })
//    },
//删除评论
    deComment(id){
       console.log(id);
      delete_comment({cID:id}).then(r => {
        this.$message({message: r.data,
        type:"success"});
        this.changeData();
      }).catch(() => {});   
    }
  },
  components: {
    Toper,
    Sidebar,
  },
};
</script>