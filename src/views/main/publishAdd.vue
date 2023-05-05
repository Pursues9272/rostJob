<template>
    <div>
        <el-form :model="articleList"
            :rules="articleRules"
            ref="articleFormRef"
            @keyup.enter="submitForm('articleFormRef')">
          <div class="main-title">已有账户</div>
          <el-form-item prop="articleType">
            <el-select
              v-model="articleList.articleType"
              class="m-2"
              placeholder="请选择发布类型"
              size="large"
            >
              <el-option
                v-for="item in articleSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="articleName">
            <el-input
              v-model="articleList.articleName"
              class="w-50 m-2 isInput"
              size="large"
              placeholder="请输入作品名称"
              style="width: 380px"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            prop="articleCount"
            v-show="
              articleList.articleType === '0' || articleList.articleType == 4
            "
          >
            <el-input
              v-model="articleList.articleCount"
              class="w-50 m-2 isInput"
              size="large"
              placeholder="请输入作品库存"
              style="width: 380px"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="articlePrice">
            <el-input
              v-model="articleList.articlePrice"
              class="w-50 m-2 isInput"
              size="large"
              placeholder="请输入作品价格"
              style="width: 380px"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="articleDiscount">
            <el-input
              v-model="articleList.articleDiscount"
              class="w-50 m-2 isInput"
              size="large"
              placeholder="请输入作品特价"
              style="width: 380px"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="articleDetails">
            <el-input
              v-model="articleList.articleDetails"
              size="large"
              placeholder="请输入作品简介"
              type="textarea"
            />
          </el-form-item>
          <el-form-item porp="articleCover">
            <el-upload
              class="avatar-uploader"
              accept="image/png,image/gif,image/jpg,image/jpeg"
              :show-file-list="false"
              :http-request="requestFile"
            >
              <img
                v-if="articleList.articleCover"
                :src="articleList.articleCover"
                class="avatar"
              />
              <el-icon
                v-if="!articleList.articleCover"
                class="avatar-uploader-icon"
                ><Plus
              /></el-icon>
              <!-- <el-icon><zoom-in /></el-icon> -->
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button size="large" type="primary" @click="submitForm('articleFormRef')"
              >完成</el-button
            >
            <el-button size="large" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
  import { ElMessage } from 'element-plus';
  export default {
    data() {
      return {
        articleListCope: "",
        articleList: {
          articleName: "", //物品名称*
          articleIntroduction: "", //物品简介*
          articleType: "", //物品类型* 0制品1绘画2文字3约稿4官方周边
          articleCover: "", //物品封面*
          articlePrice: "", //物品价格*
          articleDiscount: "", //物品特价*
          articleDetails: "", //物品详情
          articleCount: "", //物品库存
        },
        articleSelect: [
          { value: "0", label: "制品" },
          { value: "1", label: "绘画" },
          { value: "2", label: "文字" },
          { value: "3", label: "约稿" },
          { value: "4", label: "官方周边" },
        ],
        articleRules: {
          articleType: [
            { required: true, message: "请选择类型", trigger: "blur" },
          ],
          articleName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
          articlePrice: [{ required: true, message: "请输入金额", trigger: "blur" }],
          articleDetails: [{ required: true, message: "请输入物品简介", trigger: "blur" }],
          articleCover: [{ required: true, message: "请上传封面", trigger: "blur" }],
        },
      };
    },
    mounted() {
      this.articleListCope = JSON.parse(JSON.stringify(this.articleList));
    },
    methods: {
      copeArticle() {
        return JSON.parse(JSON.stringify(this.articleListCope));
      },
      reset() {
        this.articleList = this.copeArticle();
      },
       submitForm(val) {
        this.$refs[val].validate(async (valid) => {
          if (valid) {
        console.log(this.$store.state.user.userPhone);
        await this.$request({
          method: "get",
          url: "/user/getLogin/" + this.$store.state.user.userPhone,
        });
        await this.$request({
          method: "post",
          url: "/article/add",
          data: this.articleList,
        })
          .then(({ data }) => {
            console.log(data);
            if (data.code) {
              ElMessage.success(data.msg);
            //   this.reset();
            this.$router.push('/main')
            } else {
              ElMessage.success(data.msg);
            }
          })
        }
      })
      },
      replace(data) {
        const search = /data/g;
        const replace = "img";
        const result = data.replace(search, replace);
        return result;
      },
      requestFile(e) {
        console.log("123456", e.file);
        let str = "http://124.223.184.229:8080";
        let formData = new FormData();
        formData.append("file", e.file);
        formData.append("module", 1);
        this.$request({
          method: "post",
          url: "/comm/upload/file",
          data: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }).then((res) => {
            console.log(res, res.data.data.absolutePath);
            this.articleList.articleCover =
            process.env.VUE_APP_BASE_API + this.replace(res.data.data.absolutePath);
            ElMessage.success(res.data.msg);
          })
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  // 严格模式下必须存在内容
  ::v-deep .el-form {
    margin: 30px 0;
    .main-title {
      width: 100%;
      text-align: left;
      border-bottom: 1px solid #dddddd;
      font-weight: bold;
      padding: 8px 15px;
      margin-bottom: 30px;
    }
    .avatar-uploader .avatar {
      display: block;
      width: 150px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      width: 150px;
      height: 150px;
    }
  
    .avatar-uploader .el-upload:hover {
      border-color: var(--el-color-primary);
    }
  
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      text-align: center;
    }
  }
  </style>
  