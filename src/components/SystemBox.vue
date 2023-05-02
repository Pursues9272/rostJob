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
    props:{
        title:{
            type:String,
            default: "用户登录"
        }
    },
    data() {
      return {
       
        
      };
    },
    mounted() {},
    methods: {
      
    },
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
        height: 480px;
        background: #914343;
        ::v-deep .el-form {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            .el-form-item {
              margin: 30px 0;
              .isInput {
                .el-input__wrapper {
                  box-shadow: 0 0 0 0px
                    var(--el-input-border-color, var(--el-border-color)) inset;
                  border-bottom: 1px solid #000;
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
              }
              
            }
          }
          
      }
    }
  }
</style>
  