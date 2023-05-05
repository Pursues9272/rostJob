<template>
  <div class="navBox">
    <div class="navBox-main">
      <div class="main-left">
        <Splide :options="swOptions">
          <SplideSlide>
            <img :src="require('@/assets/img/0-1.jpg')" />
          </SplideSlide>
          <SplideSlide>
            <img :src="require('@/assets/img/0-1.jpg')" />
          </SplideSlide>
          <SplideSlide>
            <img :src="require('@/assets/img/0-1.jpg')" />
          </SplideSlide>
        </Splide>
      </div>
      <div class="main-right">
        <div class="right-top">
          <h4>今日热门</h4>
          <span>更多></span>
        </div>
        <div class="right-main">
          <ul>
            <li v-for="(item,index) in popuList" :key="index" @click="setDetails(item)">【{{typeList[item.articleType]}}】{{ item.articleName }}</li>
            <!-- <li>【制品】忘川初见 彼岸花开烫金手账</li>
            <li>【制品】忘川初见 彼岸花开烫金手账</li> -->
          </ul>
        </div>
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
      typeList: { 0: "制品", 1: "绘画", 2: "文字", 3: "约稿", 4: "周边" },
      popuList: [
        {
          textpo: "忘川初见 彼岸花开烫金手账本",
        },
      ],
    };
  },
  mounted() {},
  created() {
    this.init();
  },
  methods: {
    setDetails(item){
      this.$router.push({
        path: "/details",
        query: {
          id: item.articleId,
          type: item.articleType,
        },
      });
    },
    init() {
      // 今日热门
      this.$request
        .get("/st/getHotList")
        .then((data) => {
          console.log("今日热门=>", data);
          this.popuList= data.data.data;
        })
        .catch((error) => {
          console.log("今日热门error=>", error);
        });
    },
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
      display: flex;
      flex-flow: column nowrap;
      .right-top {
        width: 100%;
        height: 40px;
        color: #333333;
        background-color: #f1f1f1;
        border-color: #dddddd;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        h4 {
          font-weight: 500;
          font-size: 16px;
        }
        span {
          color: #673ab7;
          cursor: pointer;
        }
      }
      .right-main {
        width: 100%;
        height: calc(100% - 40px);
        // background-color: aqua;
        ul {
          margin: 0;
          box-sizing: border-box;
          padding: 10px;
          list-style-type: none;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          li {
            width: 220px;
            height: 30px;
            line-height: 30px;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; // 默认不换行；
            cursor: pointer;
          }
          li:hover {
            color: #673ab7;
          }
        }
      }
    }
  }
}
</style>
