<template>
  <div>
    <div class="breadcrumb">
      <div class="title">当前目录：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item >{{title}}</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- <SystemMain
      typex="1"
      itemKey1="userPhone"
      itemKey2="userName"
      :pageSize="pageList.pageSize"
      :pageNum="pageList.pageNum"
      isMove="true"
    ></SystemMain> -->
    <SystemMain
      :typex="type"
      itemKey1="articleDiscount"
      itemKey2="articleName"
      :pageSize="pageList.pageSize"
      :pageNum="pageList.pageNum"
      isMove="true"
    ></SystemMain>
  </div>
</template>

<script>
import SystemMain from "@/components/SystemMain.vue";

export default {
  components: {
    SystemMain,
  },
  data() {
    return {
      pageList: {
        pageNum: 1,
        pageSize: 10,
      },
      title:"",
      type:""
    };
  },
  created(){
    this.type = this.$route.query.type
    let title = this.type==1?"约稿":this.type==2?"制品":"官方周边";
    this.title = title;
    this.details();
  },
  mounted() {
    
  },
  methods: {
    details() {},
  },
};
</script>

<style lang="less" scoped>
.breadcrumb{
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 16px;
  align-items: center;
  .title{
    margin-right: 5px;
    line-height: 1;
    color: #606266;
  }
}
</style>
