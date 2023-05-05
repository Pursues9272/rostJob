<template>
  <div class="list" v-show="totalShow">
    <div class="Hlist" v-show="title">
      <div class="leftName">
        {{ title }}
      </div>
      <span class="rightName" @click="setMore()">更多</span>
    </div>
    <div class="Mlist" :style="isMove != 1 ? 'flex-wrap: wrap;' : ''">
      <div
        class="col-xs-2"
        v-for="(item, index) in listData"
        :key="index"
        :style="
          isMove != 1
            ? { margin: ' 0.4%', width: isMove == 3 ? '100%' : '' }
            : { width: '16.4%', margin: '0 0.1%' }
        "
      >
        <div class="card" @click="setDetails(item)">
          <!--  -->
          <!-- <img :src="setImg(index)" alt="" /> -->
          <div class="imgbox">
            <img :src="item.articleCover" alt="" />
          </div>
          <div class="card-heading">
            <span class="pull-right price">￥{{ item[itemKey1] }} </span>
            <span class="pull-left" style="color: #673ab7">
              <span v-show="item.articleType == 1 || item.articleType == 2">
                【约稿/{{ typeList[item.articleType] }}】
              </span>
              <span v-show="item.articleType != 1 && item.articleType != 2">
                【
                {{ typeList[item.articleType] }}
                <!-- {{setText}}   -->
                <!-- {{ item.articleType==1||item.articleType==2?typeList[item.articleType]:'' }}  -->
                】
              </span>
              {{ item[itemKey2] }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="paginationBox">
      <el-pagination v-if="isMove == 2&&total" background layout="total, sizes, prev, pager, next, jumper" :current-page="mainPage.pageNum" 
      :page-size="mainPage.pageSize" :page-sizes="[10, 20, 40]"    
      @size-change="handleSize"
      @current-change="handleCurrent" :total="total" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    typex: {
      type: Number,
      default: 1,
    },
    isMove: {
      type: Number,
      default: 1,
      // 三种心态，1 为有头部型，2无头部型，3详情树形
    },
    itemKey1: {
      type: String,
      default: "userPhone",
    },
    itemKey2: {
      type: String,
      default: "userName",
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 6,
    },
  },
  name: "",
  data() {
    return {
      listData: "",
      urlList: [
        "/user/list",
        "/article/getByArticleTypeList",
        "/article/getByArticleTypeList",
      ],
      // 0:制品|1:绘画|2:文字|3:约稿|4:官方周边
      typeList: { 0: "制品", 1: "绘画", 2: "文字", 3: "约稿", 4: "周边" },
      totalShow: true,
      mainPage:{
        articleType: this.typex==1?3:this.typex==2? 0 : 4,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      },
      total:0
    };
  },
  created() {
    this.login();
  },
  mounted() {},
  computed: {},
  methods: {
    handleSize(val){
      this.mainPage.pageNum = 1
      this.mainPage.pageSize = val
      this.login()
    },
    handleCurrent(val){
      this.mainPage.pageNum = val
      this.login()
    },
    setText() {
      return this.typex == 1 ? "约稿" : this.typex == 2 ? "制品" : "官方周边";
    },
    setImg(i) {
      return require(`@/assets/img/${this.typex}-${(i % 7) + 1}.jpg`);
    },

    login() {
      // console.log(this.typex);
      // let data, method;
      // if (this.typex == 1) {
      //   // method = 'post'
      //   data = {
      //     // context: "",
      //     articleType: 3,
      //     pageNum: this.pageNum,
      //     pageSize: this.pageSize,
      //   };
      // } else {
      //   // method = 'get'
      //   data = {
      //     articleType: this.typex == 2 ? 0 : 4,
      //     pageNum: this.pageNum,
      //     pageSize: this.pageSize,
      //   };
      // }
      this.$request({
        url: "/article/getByArticleTypeList",
        method: "post",
        data: this.mainPage,
      })
        .then((res) => {
          if (res.status == 200)
            // console.log(this.urlList[this.typex - 1], "list=>", res.data.rows);
            this.listData = res.data.rows;
          this.total = res.data.total;
          this.totalShow = res.data.total;
        })
        .catch((error) => {
          console.log("error=>", error);
        });
    },
    setDetails(item) {
      let urlid = item.id;
      // if (this.typex == 1) urlid = item.id;
      console.log(this.$route);
      if (this.isMove == 3) {
        let url = this.$router.resolve({
          path: "/details",
          query: {
            id: urlid,
            type: this.typex,
          },
        });
        window.open(url.href, "_black");
        this.$router.go(0);
      } else {
        this.$router.push({
          path: "/details",
          query: {
            id: urlid,
            type: this.typex,
          },
        });
      }
    },
    setMore() {
      // let title = this.typex==1?"约稿":this.typex==2?"制品":"官方周边";
      this.$router.push("/more?type=" + this.typex);
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  margin-top: 8px;
  margin-bottom: 24px;
  padding: 0;
}
.Hlist {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  padding-bottom: 10px;
  border: 0;
  .leftName {
    font-weight: bold;
  }
  .rightName {
    cursor: pointer;
  }
  span {
    color: #673ab7;
  }
}
.Mlist {
  width: 100%;
  display: flex;
  border: 1px solid #ddd;
  // border-top: 0;
  // border-left: 0;
  .listCard:hover {
    border: 1px solid #6633cc;
  }
  .col-xs-2 {
    border: 1px solid #e5e5e5;
    // margin: 5px;
    width: 19%;
    .card {
      padding: 10px;
      border-right: 0;
      border-bottom: 0;
      border-radius: 0;
      .imgbox {
        min-height: 200px;
      }
      .card-heading {
        padding: 10px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .pull-right {
          float: right;
          padding-top: 1px;
        }
        .pull-left {
          text-decoration: none;
        }
      }
    }
    img {
      max-width: 100%;
      vertical-align: middle;
    }
  }
  .col-xs-2:hover {
    border: 1px solid #6633cc;
  }
}
.paginationBox{
  display: flex;
  justify-content: right;
  margin-top: 10px;
}
</style>
