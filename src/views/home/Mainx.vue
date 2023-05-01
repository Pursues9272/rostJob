<template>
  <div class="main-list">
    <!-- <div class="list">
        <header style="border: 0">
            <strong><i class="icon panel-icon icon-heart" style="color: #0000CC"></i> 热门创作者</strong>
            <div class="pull-right">
                <a href="product_list.html">更多</a>
            </div>
        </header>
        
        <section class="cards cards-condensed row" style="margin: 0">

            <div class="col-xs-2">
                <div class="card">
                    <a href="product_detail.html?id=26" target="_blank"><img src="img/1-1.jpg" alt=""></a>
                    <div class="card-heading">
                        <span class="pull-right price">￥800.00 </span>
                        <a href="product_detail.html?id=26" target="_blank">【约稿/绘画】抽象写意派猎奇画风约稿 暗黑山本耀司风</a>
                    </div>
                </div>
            </div>
        </section>
    </div> -->
    <div class="list">
      <div class="Hlist">
        <div class="leftName">
          {{ title }}
        </div>
        <span>更多</span>
      </div>
      <div class="Mlist">
        <div class="listCard" v-for="(index, data) in listData" :key="index">
          {{ indnx }}{{ data }}
          <!-- <a href="product_detail.html?id=23" target="_blank"><img src="@/assets/img/1-"+index+".jpg"></a>
                    <div class="card-heading">
                        <span class="pull-right price">￥300.00 </span>
                        <a href="product_detail.html?id=23" target="_blank">【约稿/绘画】动漫二次元简笔画 板绘 可画人物及风景</a>
                    </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: " 热门创作者",
    },
  },
  //   porps:['title'],
  name: "",
  data() {
    return {
      listData: "",
    };
  },
  created() {
    this.login();
  },
  mounted() {},
  methods: {
    login() {
      this.$request({
        method: "post",
        url: "/backend/backUser/list",
        data: {
          pageNum: 1,
          pageSize: 6,
          userGender: "",
          userName: "",
          userPhone: "",
          userType: "",
        },
      })
        .then((res) => {
          console.log("list=>", res);
          if (res.status == 200) this.listData = res.data.rows;
        })
        .catch((error) => {
          console.log("error=>", error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.main-list {
  width: 100%;
  height: 200px;
  background: red;
}
// .list {
// 	padding: 0;
// 	margin-top: 8px;
// 	margin-bottom: 24px;
// }

// .cards-condensed .card:hover {
// 	border: 1px solid #6633cc;
// }
.list {
  font-size: 16px;
}
.Hlist {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  padding-bottom: 10px;
}
</style>
