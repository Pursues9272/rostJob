<template>
  <div class="login-view">
    <div class="login-box">
      <div class="box-top">
        <strong>{{ title }}</strong>
      </div>
      <div class="box-main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  props: {
    title: {
      type: String,
      default: "用户登录",
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
// 严格模式下必须存在内容
.login-view {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  .login-box {
    width: 1170px;
    height: 100%;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin: 20px;
    border: 1px solid rgba(153, 153, 153, 0.5);
    box-sizing: border-box;
    .box-top {
      width: 100%;
      height: 50px;
      background: #f1f1f1;
      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 0 20px;
      color: #333333;
      background-color: #f1f1f1;
      border-color: #dddddd;
      font-size: 18px;
      font-weight: bold;
    }
    .box-main {
      width: 100%;
      min-height: 430px;
      display: flex;
      justify-content: center;
      ::v-deep .el-form {
        display: flex;
        flex-flow: column nowrap;
        // align-items: center;
        .el-form-item {
          margin-bottom: 30px;
          --el-input-focus: #9c27b0;
          .isInput {
            .el-input__wrapper {
              border: 1px solid #ccc;
              border-radius: 0;
              .el-icon {
                font-size: 20px;
                color: #000;
              }
              .ic-suppress-out {
                font-size: 22px;
                color: #000;
              }
            }
            .is-focus {
              box-shadow: 0 0 3px var(--el-input-focus);
              border: 1px solid var(--el-input-focus);
            }
          }
          .el-textarea__inner {
            //
            box-shadow: 0 0 3px #ccc;
            border: 1px solid #ccc;
            &:focus {
              box-shadow: 0 0 3px var(--el-input-focus);
              border: 1px solid var(--el-input-focus);
            }
          }
          .el-select .el-input.is-focus {
            border: 1px solid var(--el-input-focus) inset !important;
            .el-input__wrapper {
              box-shadow: 0 0 0 1px var(--el-input-focus) inset !important;
            }
          }

          .avatar-uploader .el-upload:hover {
            border-color: var(--el-input-focus);
          }
          .el-button--primary {
            border-color: var(--el-input-focus);
            background-color: var(--el-input-focus);
          }
        }
      }
    }
  }
}
</style>
