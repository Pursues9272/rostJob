<template>
  <div class="navBox">
    <div class="navBox-main">
      <div class="main-left">
        <Splide :options="swOptions">
          <SplideSlide>
            <img src="../assets/img/0-1.jpg" />
          </SplideSlide>
          <SplideSlide>
            <img src="../assets/img/0-2.jpg" />
          </SplideSlide>
          <SplideSlide>
            <img src="../assets/img/0-3.jpg" />
          </SplideSlide>
        </Splide>
      </div>
      <div class="main-right">
        <div class="right-top"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
export default {
  data() {
    return {
      swOptions: {
        type: "loop", // 循环
        rewind: true,
        autoplay: true, // 是否自动播放
        speed: 2000, //时间间隔毫秒数
        proportionWidth: 1, // 宽度比例
        proportionHeight: 1, // 高度比例
      },
    };
  },
};
</script>

<style lang="less" scoped>
.navBox {
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  // background-color: aqua;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  .navBox-main {
    width: 1170px;
    height: 100%;
    // background-color: aquamarine;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .main-left {
      width: 880px;
      height: 280px;
      // background-color: rgb(88, 16, 16);
      box-sizing: border-box;
      padding: 0 20px;
      img {
        width: 880px;
        height: 280px;
      }
    }
    .main-right {
      width: 250px;
      height: 280px;
      // background-color: rgb(147, 65, 65);
      margin-right: 20px;
      box-sizing: border-box;
      border: 1px solid rgba(153, 153, 153, 0.5);
      .right-top {
        width: 100%;
        height: 40px;
        color: #333333;
        background-color: #f1f1f1;
        border-color: #dddddd;
      }
    }
  }
}
</style>
