<template>
  <div class="User">
    <Toper></Toper>

           <div class="crumbs">
              <el-input
          placeholder="请输入文章名"
          size="large"
          style="width: 200px"
          v-model="searchParams.Title"
          clearable
        ></el-input> 
      <!--<el-input placeholder="请输入文章标题" v-model="searchParams.title" class="input-with-select" style="width: 100%" clearable>  -->   
        <el-button type="primary" size="small" @click="search()" circle><i class="el-icon-search"></i></el-button>
        <el-button type="warning" size="small" @click="clearSearchParams()" circle><i class="el-icon-refresh-left"/></el-button>
    </div>

    <Sidebar></Sidebar>

           <el-table :data="tableData" border style="width: 85%" class="infotable">
           <!-- <el-table-column prop="bDatatime" label="发布日期" width="200%">{{ tableData.bDatatime}}-->
            <el-table-column prop="bDatatime" label="发布日期" width="300%">
            </el-table-column>
            <el-table-column prop="bTitle" label="文章标题" width="500%" >
            <!--<el-table-column prop="bTitle" label="内容" width="800%">-->
            </el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row)" style="width: 25%">编辑</el-button>
          <el-button type="text" size="small" @click="deleteItem(scope.row.bid)" style="width: 25%">删除</el-button>
          </template>
          </el-table-column>
          </el-table>

      <el-dialog :visible.sync="update" title="博客编辑" width="80%" class="dialog">
      <div style="height:200px;"></div>
      <template class="edit" >
        <div class="total">
          <div class="EditPlace" :model="enter">
            <el-input
              placeholder="文章标题"
              v-model="enter.bTitle"
              clearable
              class="text"
            >
            </el-input>              
            <!--@imgAdd="$imgAdd"
              @change="change"-->
            <div style="margin: 20px 0"></div>
            <mavon-editor
              v-model="enter.bcontent"
              ref="md"
              class="text"
              value=""
            ></mavon-editor>
            <div style="margin: 20px 0"></div>
            <input
              type="button"
              class="button1"
              value="发布"
              @click="save"
            /><br />
          </div>
        </div>
        </template>
</el-dialog>


      <div class="page">
      <el-pagination
      background
      :current-page="pageNo"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      @current-change="changePage"
    ></el-pagination></div>
  </div>

</template>

<style>
.infotable{
  position: absolute;
    float: right;
}
.el-aside {
  color: #333;
}
.crumbs{
  float: right;
}
.page{
   float: right;
   padding-right: 40%;
}
.total{
  margin-right: 0px;
  margin-top: -200px;
}

</style>

<script>
//导入公共组件Footer
import Toper from "../components/Toper";
import Sidebar from "../components/Sidebar";
import { blog_by_uid } from  "@/api/User/user";
import { select_by_title2 } from "@/api/User/user";
import { delete_blog } from "@/api/User/user";
import { update_by_bid } from "@/api/User/user";

export default {
  name: "User",
  data() {
    return {
            tableData:[],
             pageNo: 1,
             pageSize: 7, //每页显示5条
             total: 0, //总条数
           input:'',
          searchParams: {},
           update: false,
           enter:{},
  };
  },
    created() {
    this.initData(); //页面加载就初始化商品数据，默认选第一页的数据
  },
  methods:{
      changePage(val) {
      //val:改变页码当前的页码
      this.pageNo = val;
      this.initData(); //根据新的页码选取分页数据
    },
      initData() {
      blog_by_uid(
        { 
        //获取文章列表
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        bTitle: this.searchParams.Title,
        }
      )
        .then(r => {
           console.log(r);
          this.tableData = r.data.searchList;
          this.total = r.data.total;
        })
        .catch(() => {});
    },
    refresh() {
      this.initData();
    },
    returnData(pageList) {
      this.tableData = pageList.list;
    },

    //重置
      clearSearchParams() {
      this.pageNo = 1;
      this.searchParams.Title="",
      this.getTitle();
    },
    
    //查找
    getTitle(){
      select_by_title2({
        bTitle :this.searchParams.Title,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }).then((r) => {
        console.log(r);
        this.tableData = r.data.searchList;
        this.total = r.data.total;
      }).catch(() => {});
    },
    search(){
      this.getTitle();
  },
  save(){
      console.log(this.enter);
      this.enter.bDatatime = '',
      update_by_bid(this.enter).then(res =>{
        this.enter={};
        this.update = false;
        this.initData();
      })
    },

  //编辑
    editItem(row) {
      console.log(row);
          this.bID = row;
          this.update = true;
          this.enter = row;
        // blog_by_bid({bID : row}).then(r =>{
        //     console.log(r);
        //     this.enter = r.data;
        // }).sscatch(() => {});
    },

//  

//  if(this.$parent.bid != null){
//    blog_by_bid({bid: this.$parent.bid})
//    .then(r =>{
//      this.FillerFormField(this.$parent.bid , r);
//      this.$parent.bid = null;
//    })
//    .catch(() => {}); 
//  }else {
//      //新增
//      this.$set(this.entityForm, "bid", null);
//  }
//
//FillerFormField(id, data) {
//    //可以外部填充回写做编辑用，也可以请求详情接口填充表单
//    this.$set(this.entityForm, "bid", id);
//    fillerLeft(this.entityForm, data);
//  },
    //删除
    deleteItem(id){
      console.log(id);

      delete_blog({bID:id}).then(r => {
        this.$message({message: r.data,
        type:"success"});
        //this.search();
        this.initData();
      }).catch(() => {});        
          }
  },
  components: {
    Toper,
    Sidebar,
  },
};
</script>
