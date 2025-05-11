// initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "@/others/generated";
import message from "@arco-design/web-vue/es/message";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "",
    },
    isLogin: false,
  }),
  actions: {
    async getLoginUser({ commit, state }) {
      // 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.data) {
        console.log(res);
        commit("updateUser", res.data);
        commit("updateIsLogin", true);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.GUEST,
        });
        commit("updateIsLogin", false);
      }
    },
    async logout({ commit, state }) {
      const res = await UserControllerService.userLogoutUsingPost();
      if (res.code === 0) {
        commit("updateIsLogin", false);
        message.success("退出成功");
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.GUEST,
        });
      } else {
        commit("updateIsLogin", false);
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
    updateIsLogin(state, payload) {
      state.isLogin = payload;
    },
  },
} as StoreOptions<any>;
