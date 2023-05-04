<template>
  <div>
    <div class="wrapper">
      <div class="breadcrumb">
        <div class="title">当前目录：</div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ details.articleName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="row-main">
        <div class="row-left">
          <el-row :gutter="20">
            <el-col :span="9"
              ><div class="grid-content ep-bg-purple">
                <img
                  style="border: 1px solid #ddd; width: 100%"
                  :src="details.articleCover"
                  alt=""
                />
              </div>
            </el-col>
            <el-col :span="15"
              ><div class="grid-content ep-bg-purple">
                <h2>【{{ title }}】{{ details.articleName }}</h2>
                <div class="details">
                  <div class="details-left">价格</div>
                  <div class="details-right">
                    ￥
                    <span class="text-style">{{ details.articlePrice }}</span>
                  </div>
                </div>
                <div class="details">
                  <div class="details-left">特格</div>
                  <div class="details-right">
                    ￥
                    <span style="font-size: 16px; color: red">{{
                      details.articleDiscount
                    }}</span>
                  </div>
                </div>
                <div class="details">
                  <div class="details-left">状态</div>
                  <div class="details-right">{{ setName }}</div>
                </div>
                <div class="details">
                  <div class="details-left">数量</div>
                  <div class="details-right">
                    <el-input-number
                      v-model="detailsNum"
                      :min="1"
                      :max="10"
                      @change="handleChange"
                    />
                  </div>
                </div>
                <div class="details">
                  <el-button size="large" type="primary" @click="addGw()"
                    >加入购物车</el-button
                  >
                </div>
              </div></el-col
            >
          </el-row>
          <h5>简介</h5>
          <div class="jjBox">
            {{ details.articleDiscount }}
          </div>
          <h5>详情</h5>
          <div class="jjBox">
            {{ details.articleIntroduction }}
          </div>
        </div>
        <div class="row-right">
          <SystemMain
            title="热门创作者"
            typex="1"
            itemKey1="articleDiscount"
            itemKey2="articleName"
            isMove="3"
            pageSize="3"
          ></SystemMain>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SystemBox from "@/components/SystemBox.vue";
import SystemMain from "@/components/SystemMain.vue";
import { userCheck } from "@/components/global_cont/check";
import { ElMessage } from "element-plus";

export default {
  components: {
    SystemBox,
    SystemMain,
  },
  data() {
    return {
      title:
        this.$route.query.type == 1
          ? "约稿"
          : this.$route.query.type == 2
          ? "制品"
          : "官方周边",
      details: "",
      detailsNum: 1,
    };
  },
  computed: {
    setName: function () {
      let datax = ["有货", "无货", "已下架", "已删除"];
      return datax[this.details.articleState];
    },
  },
  created() {
    console.log(this.$route.path);
    this.getArticle();
  },
  mounted() {},
  methods: {
    addGw() {
      userCheck("/publish", true);
      this.$request({
        url: "/st/add",
        method: "post",
        data: {
          stArticleCount: this.detailsNum,
          stArticleId: this.details.id,
        },
      }).then(({ data }) => {
        console.log("123456", data);
        ElMessage.success(data.msg);
      });
    },
    getArticle() {
      console.log(this.$route.query.id);
      this.$request({
        // url:"/order/get/"+this.$route.query.id,
        method: "get",
        url: "/article/getById/" + this.$route.query.id,
      })
        .then(({ data }) => {
          console.log(data);
          this.details = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleChange(value) {
      console.log(value);
      this.detailsNum = value;
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1170px;
  min-width: 960px;
  margin-bottom: 15px;
  .row-main {
    width: 100%;
    min-height: 500px;
    display: flex;
    justify-content: space-between;
    .row-left {
      width: 71%;
      border: 1px solid #dddddd;
      padding: 1.5%;
      ::v-deep .el-row {
        .grid-content {
          h2 {
            padding-bottom: 9px;
            border-bottom: 1px solid #e5e5e5;
          }
          .details {
            font-size: 14px;
            width: 100%;
            display: flex;
            margin-top: 20px;
            align-items: center;

            &-left {
              width: 12%;
              text-align: right;
            }
            &-right {
              padding-left: 5%;
              width: 88%;
              .text-style {
                text-decoration: line-through;
              }
            }
            .el-button--primary {
              border-color: #673ab7;
              background-color: #673ab7;
            }
          }
        }
      }
      h5 {
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
      }
      .jjBox {
        width: 100%;
        padding: 2%;
      }
    }
    .row-right {
      width: 23%;
      height: 100%;
      border: 1px solid #dddddd;
    }
  }
}
.breadcrumb {
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 16px;
  align-items: center;
  .title {
    margin-right: 5px;
    line-height: 1;
    color: #606266;
  }
}
</style>
