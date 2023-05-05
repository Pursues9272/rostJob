<template>
  <div class="index-view">
    <header>
      <SystemHeader></SystemHeader>
    </header>
    <!-- <nav v-if="$route.path !== '/user' && $route.path !== '/regis'">
      <SystemNav></SystemNav>
    </nav> -->
    <main>
      <div class="right-box">
        <el-config-provider :locale="local">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :key="$route.path" />
            </transition>
          </router-view>
        </el-config-provider>
      </div>
    </main>
    <footer>
      <SystemFooter></SystemFooter>
    </footer>
    <el-backtop
      v-if="($route.path = '/details')"
      :visibility-height="100"
      :right="100"
      :bottom="100"
      target=".index-view"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import SystemHeader from "@/components/SystemHeader.vue";
import SystemNav from "@/components/SystemNav.vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import SystemFooter from "@/components/SystemFooter.vue";

export default {
  components: {
    SystemHeader,
    SystemFooter,
    SystemNav,
  },
  data() {
    return {
      local: zhCn,
      input: "组件库输入框",
    };
  },
  mounted() {
    console.log("妈妈咪呀", this.$route.path);
    // this.init();
    
  },
  methods: {
    clickOt(event) {
      // 单击回归初始状态
      this.$func.unFons(event);
    },
    init() {
      // axios测试
      let httIt = {
        context: "",
        pageNum: 1,
        pageSize: 20,
      };
      console.log(this.$request);
      this.$request
        .post("/backend/backUser/list", httIt)
        .then((res) => {
          console.log("list=>", res);
        })
        .catch((error) => {
          console.log("error=>", error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
// 严格模式下必须存在内容
.index-view {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  overflow: auto;

  header {
    width: 100%;
    box-sizing: border-box;
  }
  main {
    width: 100%;
    min-height: 500px;
    max-height: auto;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    -ms-scrollbar-track-color: transparent;
    .right-box {
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      background-color: #fff;
      // padding: 10px;
      width: 1170px;
    }
  }
  main::-webkit-scrollbar {
    display: none;
  }
  nav {
    padding: 10px 0;
  }
  .index-main {
    width: 1170px;
    height: auto;
    // background: red;
    // height: 100px;
    margin: 0 auto;
  }
  footer {
    width: 100%;
    // height: calc(100%);
    box-sizing: border-box;
  }
}
</style>
