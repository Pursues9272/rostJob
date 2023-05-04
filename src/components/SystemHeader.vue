<template>
  <div class="head-home">
    <div class="header-top">
      <div class="noseCone-left">原创文艺作品私人定制交易平台</div>
      <div class="noseCone-right">
        <div
          class="nose-text"
          v-show="!isName"
          v-for="(item, index) in userListJob"
          :key="index"
          @click="userCu(item)"
        >
          {{ item.name }}
        </div>
        <div
          class="nose-text"
          v-show="isName"
          v-for="(item, index) in userList"
          :key="index"
          @click="userCu(item)"
        >
          <div v-if="item.id !== 0" class="test-cent">
            {{ item.name }}
          </div>
          <el-dropdown trigger="click" v-if="item.id === 0">
            <div class="test-cent">
              <img :src="item.img" alt="" />
              <el-badge :value="messNum" class="item" :hidden="messNum < 1">
                {{ item.name }}
              </el-badge>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>用户名:{{ item.name }}</el-dropdown-item>
                <!-- <el-dropdown-item @click="address()"
                  >收货地址</el-dropdown-item
                >
                <el-dropdown-item @click="custService()"
                  >消息</el-dropdown-item
                > -->
                <el-dropdown-item
                  v-for="(item, index) in identList"
                  :key="index"
                  @click="isTrem(item)"
                >
                  {{ item.name }}
                </el-dropdown-item>
                <el-dropdown-item @click="ststemSignout()"
                  >退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
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
        <el-button color="#714FA7" style="border-radius: 0" @click="shopping()">
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
    <MessColls
      :contisBut="contisBut"
      @dialogclose="dialogclose"
      :userItem="userItem"
    ></MessColls>
  </div>
</template>

<script>
// import { ElMessage } from "element-plus";
// import { Search } from "@element-plus/icons-vue";
import { userCheck } from "@/components/global_cont/check";
import MessColls from "./MessColls.vue";
export default {
  name: "SystemHeader",
  components: {
    MessColls,
  },
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
        {
          title: "用户管理",
          index: 4,
        },
      ],
      searchVul: "",
      userListJob: [
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
      userList: [
        {
          name: "发布帖子",
          id: 3,
        },
        {
          name: "登录",
          id: 0,
          img: require("../assets/user/heads.png"),
        },
      ],
      isName: false,
      identList: [
        {
          name: "消息",
          path: "/address",
        },
        {
          name: "我的购物车",
          path: "/address",
        },
        {
          name: "我的物品",
          path: "/address",
        },
        {
          name: "订单记录",
          path: "/address",
        },
      ],
      identLevel: 0,
      messNum: 0,
      contisBut: false,
      timed: null,
      userItem: -2,
    };
  },
  created() {
    this.init();
    let miscellaneous = JSON.parse(
      window.localStorage.getItem("miscellaneous")
    );
    if (miscellaneous) {
      this.timed = window.setInterval(() => {
        this.identAuth();
      }, 60000);
    }
  },
  mounted() {},
  watch: {
    $route() {
      this.init();
    },
  },
  methods: {
    isTrem(item) {
      // 导航集
      if (item.name === "收货地址") {
        this.address();
      } else if (item.name === "消息") {
        this.custService();
      }
    },
    identAuth() {
      // 鉴权
      let miscellaneous = JSON.parse(
        window.localStorage.getItem("miscellaneous")
      );
      let ident = miscellaneous.userType - 0;
      this.identLevel = ident;
      if (ident === 2) {
        // 管理员
        this.identList = [
          {
            name: "用户管理",
            path: "/address",
          },
          {
            name: "物品管理",
            path: "/address",
          },
          {
            name: "订单管理",
            path: "/address",
          },
        ];
      } else {
        // 普通用户
        this.identList = [
          {
            name: "消息",
            path: "/address",
          },
          {
            name: "我的购物车",
            path: "/address",
          },
          {
            name: "我的物品",
            path: "/address",
          },
          {
            name: "订单记录",
            path: "/address",
          },
        ];
        let purDat = {};
        // 查询信息红点标识
        this.$request
          .post("/ur/getTag", purDat)
          .then(({ data: list }) => {
            this.messNum = list.data;
          })
          .catch((error) => {
            console.log("查询信息红点标识error=>", error);
          });
      }
    },
    custService() {
      // 消息
      console.log("消息");
      let miscellaneous = JSON.parse(
        window.localStorage.getItem("miscellaneous")
      );
      let purDat = {
        urAddresseeId: miscellaneous.id, // 收信人用户ID
      };
      // 已阅去红点功能
      // this.$request
      //   .post("/ur/view", purDat)
      //   .then(({data:list})=>{
      //     if(list.code === 200){
      //       this.messNum = 0
      //     }
      //   })
      //   .catch(error=>{
      //     console.log("已阅去红点功能error=>", error)
      //   })

      this.contisBut = true;
      this.userItem = -1;
    },
    dialogclose(item) {
      this.contisBut = item;
    },
    init() {
      let miscellaneous = JSON.parse(
        window.localStorage.getItem("miscellaneous")
      );
      this.$store.commit("setUser", miscellaneous);
      console.log("miscellaneous=>", miscellaneous);
      if (miscellaneous !== null) {
        this.userList[1].name = miscellaneous.userName;
        this.isName = true;
      } else {
        this.isName = false;
      }
    },
    userCu(item) {
      console.log("item=>", item);
      if (item.name === "登录") {
        this.$router.push("/user");
      } else if (item.name === "注册") {
        this.$router.push("/regis");
      } else if (item.name === "发布帖子") {
        // this.$router.push("/publish");
        userCheck("/publish");
      }
    },
    userNav(item) {
      // console.log("nav--item=>", item);
      if (item.title === "首页") {
        this.$router.push("/");
      } else if (item.title === "约稿") {
        this.$router.push("/more?type=1");
      } else if (item.title === "制品") {
        this.$router.push("/products?type=2");
      } else if (item.title === "官方周边") {
        this.$router.push("/periphery?type=3");
      } else if (item.title === "用户管理") {
        this.$router.push("/userlist");
      }
    },
    ststemSignout() {
      // 退出系统
      window.localStorage.removeItem("miscellaneous");
      this.$store.commit("setUser", "");
      this.$router.push("/user");
    },
    // 点击购物车
    shopping() {
      userCheck("/shopping");
    },
    // 点击地址
    address() {
      userCheck("/address", true);
      this.$router.push("/address");
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
      // width: 400px;
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
        .test-cent {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 400;
          img {
            width: 30px;
            height: 30px;
            box-sizing: border-box;
            border-radius: 100%;
            margin-right: 5px;
          }
        }
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
