<template>
  <div class="head-home">
    <div class="header-top">
      <div class="noseCone-left">原创文艺作品私人定制交易平台</div>
      <div class="noseCone-right">888</div>
    </div>
    <div class="header-box"></div>
    <div class="header-nav">
      <div v-for="(item, index) in navList" :key="index" class="nav-title">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      navList: [
        {
          title: "首页",
          index: 0,
        },
        {
          title: "约稿",
          index: 1,
        },
        {
          title: "制品",
          index: 2,
        },
        {
          title: "官方周边",
          index: 3,
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      console.log(666);
      this.$request({
        url: "/user/list",
        method: "post",
        data: {
          pageNum: 1,
          pageSize: 20,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        console.log("list=>", data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.head-home {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  .header-top {
    width: 1170px;
    height: 35px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20px;
    .noseCone-left {
      width: 240px;
      height: 100%;
      font-family: fantasy;
      font-size: 10px;
      color: #ff9933;
      background-color: #fff;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    }
  }
  .header-box {
    width: 1170px;
    height: 115px;
    background: aqua;
  }
  .header-nav {
    width: 1170px;
    height: 40px;
    background: #673ab7;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    .nav-title {
      width: 100px;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      //   margin: 0 10px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
