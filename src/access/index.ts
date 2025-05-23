import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  await store.dispatch("user/getLoginUser");
  const loginUser = store.state.user.loginUser;
  // 如果没登陆，自动登录
  // if (!loginUser || loginUser.userRole === ACCESS_ENUM.GUEST) {
  //   // 加 await 是为了等用户登录成功之后，再执行后续的代码
  //   await store.dispatch("user/getLoginUser");
  // }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.GUEST;
  // 要跳转的页面若需要权限则必须要登陆
  if (needAccess !== ACCESS_ENUM.GUEST) {
    // 如果没登陆，跳转到登录页面
    if (!loginUser || loginUser.userRole === ACCESS_ENUM.GUEST) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
