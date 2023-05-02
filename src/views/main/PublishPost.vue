<template>
  <div>
    <SystemBox title="发帖">
      <el-form>
        <div class="main-title">
          已有账户
        </div>
        <el-form-item prop="articleType">
          <el-select v-model="articleList.articleType" class="m-2" placeholder="请选择发布类型" size="large">
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
            class="w-50 m-2 isInput" size="large"
            placeholder="请输入作品名称"
            style="width: 380px"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="articlePrice">
          <el-input
            v-model="articleList.articlePrice"
            class="w-50 m-2 isInput" size="large"
            placeholder="请输入作品价格"
            style="width: 380px"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="articleList.articleIntroduction" size="large" placeholder="请输入作品简介" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            accept="image/png,image/gif,image/jpg,image/jpeg"
            :show-file-list="false"
            :http-request="requestFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
    </SystemBox>
  </div>
</template>

<script>
import SystemBox from "@/components/SystemBox.vue";
// @ is an alias to /src
import { ElMessage } from "element-plus";
export default {
  components: { SystemBox },
  data() {
    return {
      imageUrl:"",
      articleList: {
        articleName: "",//物品名称*
        articleIntroduction: "",//物品简介*
        articleType: '',//物品类型* 0制品1绘画2文字3约稿4官方周边
        articleCover: "",//物品封面*
        articlePrice: "",//物品价格*
        articleDetails: "",//物品详情

      },
      articleSelect:[
        { value: '0', label: '制品1' },
        { value: '1', label: '绘画1' },
        { value: '2', label: '文字1' },
        { value: '3', label: '约稿1' },
        { value: '4', label: '官方周边1' },
      ],
      baseRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        ident: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    requestFile(e){
      console.log("123456",e);
    },
  },
};
</script>

<style lang="less" scoped>
// 严格模式下必须存在内容
::v-deep .el-form{
  margin: 30px 0;
  .main-title{
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #dddddd;
    font-weight: bold;
    padding: 8px 15px;
    margin-bottom: 30px;
  }
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
