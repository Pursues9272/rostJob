<template>
  <div>
    <el-button @click="loginx">asd</el-button>
    <Footer></Footer>
  </div>
</template>

<script>
import footer from "@/components/SystemFooter.vue";

export default {
  name: "",
  component: {
    Footer: footer,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    loginx() {
      this.$request({
        method: "post",
        url: "/user/register",
        data: {
          userGender: 0,
          userName: "老王6",
          userPassword: "1234567",
          userPassword2: "1234567",
          userPhone: "15580222316",
          userRealName: "王某6",
          userType: 1,
        },
      })
        .then((res) => {
          if (res.status == 200) {
            this.$message(res.msg);
          } else {
            this.$message(res.msg);
          }
        })
        .catch((err) => {
          console.log("接口报错", err);
        });
    },
    // 192.168.137.1:8080
  },
};
</script>

<style scoped></style>
