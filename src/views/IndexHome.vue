<template>
  <div class="index-view">
    <SystemHeader></SystemHeader>
    <div class="index-main">
      <SystemMain></SystemMain>
    </div>
    <SystemFooter></SystemFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import SystemHeader from "@/components/SystemHeader.vue";
import SystemFooter from "@/components/SystemFooter.vue";
import SystemMain from "@/components/SystemMain.vue";

export default {
  component: {
    SystemFooter,
    SystemHeader,
    SystemMain,
  },
  data() {
    return {
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

  .ic-suppress {
    font-size: 20px;
    margin: 0 5px;
  }
  .index-main {
    width: 1170px;
    height: auto;
    // background: red;
    // height: 100px;
    margin: 0 auto;
  }
}
</style>
