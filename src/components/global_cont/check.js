import store from "@/store";
import router from "@/router";
export const userCheck = function (url, type) {
  // let user = store.state.user.userPhone;
  let user = store.state.user;
  console.log("user", user);
  if (user) {
    if (!type) router.push(url);
  } else {
    console.log("跳回登录");
    router.push("/user");

  }
};
