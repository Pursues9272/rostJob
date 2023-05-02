<template>
  <div class="login-view">
    <div class="login-box">
      <div class="box-top">
        <strong>用户注册</strong>
      </div>
      <div class="box-main">
        <el-form
          :model="footDatapur"
          :rules="baseRules"
          ref="ruleFormRef"
          @keyup.enter="submitForm('ruleFormRef')"
        >
          <div class="main-title">
            <span>欢迎注册</span>
          </div>

          <el-form-item prop="regoNickname">
            <el-input
              v-model="footDatapur.regoNickname"
              class="w-50 m-2 isInput"
              placeholder="请输入昵称"
              style="width: 380px"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="regoName">
            <el-input
              v-model="footDatapur.regoName"
              class="w-50 m-2 isInput"
              placeholder="请输入真实姓名"
              style="width: 380px"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="staffSex">
            <el-radio-group v-model="footDatapur.staffSex" class="ml-4">
              <el-radio label="1" size="large">男</el-radio>
              <el-radio label="2" size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-select
              v-model="footDatapur.datapurSource"
              placeholder="请选择角色"
              clearable
              style="width: 180px"
            >
              <el-option label="普通用户" value="0" />
              <el-option label="创作者用户" value="1" />
            </el-select>
          </el-form-item>

          <el-form-item prop="phoneDat">
            <el-input
              v-model="footDatapur.phoneDat"
              class="w-50 m-2 isInput"
              placeholder="请输入手机号"
              style="width: 380px"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="passDat">
            <el-input
              v-model="footDatapur.passDat"
              class="w-50 m-2 isInput"
              placeholder="请输入密码"
              show-password
              style="width: 380px"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="passTwo">
            <el-input
              v-model="footDatapur.passTwo"
              class="w-50 m-2 isInput"
              placeholder="请再次输入密码"
              show-password
              style="width: 380px"
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="login-button"
              type="primary"
              @click="submitForm('ruleFormRef'), clickOt($event)"
              >注册</el-button
            >
            <el-button
              class="login-button"
              type="primary"
              plain
              text
              @click="resetForm(), clickOt($event)"
              >重置</el-button
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        if (this.footDatapur.passTwo !== "") {
          this.$refs.ruleFormRef.validateField("passTwo");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else if (value !== this.footDatapur.passDat) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      if (value) {
        // 判断当输入的有值时，才校验
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          let purDat = {
            userPhone: value,
          };
          this.$request
            .post("/user/getUserPhoneCheck", purDat)
            .then(({ data: list }) => {
              if (list.data) {
                callback(); // 注意这里要回调一下，不然提交不了
              } else {
                callback(new Error("该手机号已注册"));
              }
            });
        }
      } else {
        callback();
      }
    };

    return {
      footDatapur: {
        regoNickname: "", // 请输入昵称
        regoName: "", // 请输入真实姓名
        staffSex: "1", // 性别
        datapurSource: "0", // 角色
        phoneDat: "", // 手机号
        passDat: "", // 密码
        passTwo: "", // 重复密码
      },
      baseRules: {
        regoNickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        regoName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        phoneDat: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        passDat: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        passTwo: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    clickOt(event) {
      this.$func.unFons(event);
    },
    submitForm(formEl) {
      // 注册
      this.$refs[formEl].validate((valid) => {
        if (valid) {
          let purDat = {
            userGender: this.footDatapur.staffSex - 0,
            userName: this.footDatapur.regoNickname,
            userPassword: this.footDatapur.passDat,
            userPassword2: this.footDatapur.passTwo,
            userPhone: this.footDatapur.phoneDat,
            userRealName: this.footDatapur.regoName,
            userType: this.footDatapur.datapurSource - 0,
          };
          console.log("purDat=>", purDat);
          this.$request({
            url: "/user/register",
            method: "post",
            data: purDat,
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(({ data: list }) => {
              ElMessage({
                type: "success",
                message: "注册成功",
              });
              this.$router.push("/user");
            })
            .catch((error) => {
              ElMessage({
                type: "error",
                message: error,
              });
            });
        }
      });
    },
    resetForm() {
      // 重置
      this.$refs.ruleFormRef.resetFields();
      this.footDatapur = {
        regoNickname: "", // 请输入昵称
        regoName: "", // 请输入真实姓名
        staffSex: "1", // 性别
        datapurSource: "1", // 角色
        phoneDat: "", // 手机号
        passDat: "", // 密码
        passTwo: "", // 重复密码
      };
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
