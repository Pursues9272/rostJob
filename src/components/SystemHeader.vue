<template>
  <div class="head-home">
    <div class="header-top">
      <div class="noseCone-left">原创文艺作品私人定制交易平台</div>
      <div class="noseCone-right">
        <div
          class="nose-text"
          v-for="(item, index) in userList"
          :key="index"
          @click="userCu(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="header-box">
      <div class="box-left">
        <img src="../assets/header/title.png" alt="" />
      </div>
      <div class="box-box">
        <el-input
          v-model="searchVul"
          placeholder="物品搜索"
          style="width: 350px"
        />
        <el-button color="#714FA7" style="border-radius: 0">
          <i class="iconfont ic-suppress icon-sousuo"></i>
        </el-button>
      </div>
      <div class="box-right">
        <el-button color="#714FA7" style="border-radius: 0">
          <i
            style="margin-right: 5px"
            class="iconfont ic-suppress icon-fl-gouwuche"
          ></i>
          购物车
        </el-button>
      </div>
    </div>
    <div class="header-nav">
      <div class="nav-box">
        <div
          v-for="(item, index) in navList"
          :key="index"
          class="nav-title"
          @click="userNav(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
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
      searchVul: "",
      userList: [
        {
          name: "发布帖子",
          id: 3,
        },
        {
          name: "登录",
          id: 0,
        },
        {
          name: "注册",
          id: 1,
        },
      ],
    };
  },
  mounted() {},
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
    userCu(item) {
      console.log("item=>", item);
      if (item.name === "登录") {
        this.$router.push("/user");
      }
      if (item.name === "发布帖子") {
        this.$router.push("/publish");
      }
    },
    userNav(item) {
      console.log("nav--item=>", item);
      if (item.title === "首页") {
        this.$router.push("/");
      }
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
    .noseCone-right {
      width: 400px;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      .nose-text {
        margin-left: 10px;
        border-right: 1px solid #e5e5e5;
        padding: 0 15px;
        font-family: fantasy;
        font-size: 10px;
        color: #ff9933;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
  .header-box {
    width: 1170px;
    height: 115px;
    background: #fff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .box-left {
      box-sizing: border-box;
      img {
        width: 195px;
        height: 65px;
      }
    }
    .box-box {
      display: flex;
      flex-flow: row nowrap;
    }
  }
  .header-nav {
    width: 100%;
    height: 40px;
    background: #673ab7;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    .nav-box {
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
}
</style>
