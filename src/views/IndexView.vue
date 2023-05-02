<template>
  <div class="index-view">
    <header>
      <SystemHeader></SystemHeader>
    </header>
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
  </div>
</template>

<script>
// @ is an alias to /src
import SystemHeader from "@/components/SystemHeader.vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import SystemFooter from "@/components/SystemFooter.vue";

export default {
  components: {
    SystemHeader,
    SystemFooter
  },
  data() {
    return {
      local: zhCn,
      input: "组件库输入框",
    };
  },
  mounted() {
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
        .then(res => {
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
    height: calc(100% - 90px);
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
  .index-main{
    width: 1170px;
    height: auto;
    // background: red;
    // height: 100px;
    margin: 0 auto;
  }
  footer{
    width: 100%;
    // height: calc(100%);
    box-sizing: border-box;
  }
}
</style>
