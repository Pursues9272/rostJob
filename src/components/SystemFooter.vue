<template>
  <div>
    <div id="footer">
      <div class="wrapper">
        <span>© 2023-2050 十一粮仓</span>
        <div class="pull-right">原创文艺作品私人定制交易平台</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
#footer {
  border: none;
  padding: 0;
  background: #353535;
  color: #aaa;
  height: 90px;
  line-height: 90px;
  .wrapper {
    margin: 0 auto;
    max-width: 1170px;
    min-width: 960px;
  }
  .pull-right {
    float: right !important;
  }
}
</style>
