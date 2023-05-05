<template>
  <div class="login-view">
    <div class="login-box">
      <div class="box-top">
        <strong>用户登录</strong>
      </div>
      <div class="box-main">
        <el-form
          :model="footDatapur"
          :rules="baseRules"
          ref="ruleFormRef"
          @keyup.enter="submitForm('ruleFormRef')"
        >
          <div class="main-title">
            <span>已有账号</span>
          </div>

          <el-form-item prop="username">
            <el-input
              v-model="footDatapur.username"
              class="w-50 m-2 isInput"
              placeholder="请输入手机号"
              style="width: 380px"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="footDatapur.password"
              class="w-50 m-2 isInput"
              placeholder="请输入密码"
              show-password
              style="width: 380px"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="ident">
            <el-input
              v-model="footDatapur.ident"
              class="w-50 m-2 isInput"
              placeholder="验证码"
              style="width: 240px"
            >
            </el-input>
            <img :src="require('@/assets/user/test.png')" alt="" />
          </el-form-item>

          <el-form-item>
            <el-button
              class="login-button"
              type="primary"
              @click="submitForm('ruleFormRef'), clickOt($event)"
              >登录</el-button
            >
            <el-button
              class="login-button"
              type="primary"
              plain
              text
              @click="subRegis(), clickOt($event)"
              >注册</el-button
            >
            <el-button class="login-button" type="primary" plain text
              >忘记密码</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      footDatapur: {
        username: "15580755669",
        password: "123456",
        ident: "M8k2",
      },
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
    clickOt(event) {
      this.$func.unFons(event);
    },
    submitForm(formEl) {
      console.log("formEl", formEl);
      this.$refs[formEl].validate((valid) => {
        console.log("valid", valid);
        if (valid) {
          if (this.footDatapur.ident == "M8k2") {
            let purDat = {
              userPhone: this.footDatapur.username, // 手机号
              userPassword: this.footDatapur.password, // 密码
            };
            this.$request({
              url: "/user/login",
              method: "post",
              data: purDat,
            })
              .then(({ data: list }) => {
                console.log("登录成功", list);
                if (list.code === 200) {
                  let miscellaneous = list.data;
                  this.$store.commit("setUser", miscellaneous);
                  window.localStorage.setItem(
                    "miscellaneous",
                    JSON.stringify(miscellaneous)
                  );
                  ElMessage({
                    type: "success",
                    message: list.msg,
                  });
                  if(list.data.userType!=2){
                    this.$router.push("/");
                  }else{
                    this.$router.push("/userlist");
                  }
                } else {
                  ElMessage({
                    type: "warning",
                    message: list.msg,
                  });
                }
              })
              .catch((error) => {
                ElMessage({
                  type: "error",
                  message: error,
                });
              });
          } else {
            ElMessage({
              type: "error",
              message: "验证码输入错误",
            });
          }
        }
      });
    },
    subRegis() {
      // 注册
      this.$router.push("/regis");
    },
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
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      ::v-deep .el-form {
        display: flex;
        flex-flow: column nowrap;
        // align-items: center;
        .el-form-item {
          margin-bottom: 20px;
          display: flex;
          flex-flow: row nowrap;
          img {
            width: 140px;
            height: 32px;
          }
        }
        .main-title {
          widows: 100%;
          height: 35px;
          // background: blue;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: flex-start;
          font-size: 13px;
          font-weight: bold;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(153, 153, 153, 0.5);
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
