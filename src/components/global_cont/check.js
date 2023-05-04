import store from '@/store'
import router from '@/router'
export const userCheck = function (url,type) {
    let user = store.state.user.userPhone;
    console.log("user",user);
    if (user) {
        if(!type) router.push(url);
    } else {
        router.push("/user");
    }
};