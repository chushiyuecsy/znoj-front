import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NoAuth from "@/views/NoAuth.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLogin from "@/views/user/UserLogin.vue";
import UserRegister from "@/views/user/UserRegister.vue";
import UserProfile from "@/views/user/UserProfile.vue";
import UpdateQuestion from "@/views/question/UpdateQuestion.vue";
import AddQuestion from "@/views/question/AddQuestion.vue";
import ManageQuestion from "@/views/question/ManageQuestion.vue";
import WriteQuestion from "@/views/question/WriteQuestion.vue";
import RunList from "@/views/run/RunList.vue";
import RunCase from "@/views/run/RunCase.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "题库",
    component: HomeView,
  },
  {
    path: "/run/list",
    name: "提交列表",
    component: RunList,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/run/case",
    name: "提交记录",
    component: RunCase,
    props: (route) => ({ id: route.query.id }),
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/question/add",
    name: "创建题目",
    component: AddQuestion,
    meta: {
      access: ACCESS_ENUM.TEACHER,
    },
  },
  {
    path: "/question/manage",
    name: "管理题库",
    component: ManageQuestion,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/update",
    name: "更新题目",
    component: UpdateQuestion,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.ADMIN,
    },
    props: (route) => ({ id: route.query.id }),
  },
  {
    path: "/question/write",
    name: "做题",
    component: WriteQuestion,
    meta: {
      hideInMenu: true,
    },
    props: (route) => ({ id: route.query.id }),
  },
  {
    path: "/user/login",
    name: "用户登录",
    component: UserLogin,
    meta: {
      access: ACCESS_ENUM.GUEST,
      hideInMenu: true,
    },
  },
  {
    path: "/user/register",
    name: "用户注册",
    component: UserRegister,
    meta: {
      access: ACCESS_ENUM.GUEST,
      hideInMenu: true,
    },
  },
  {
    path: "/myProfile",
    name: "用户信息",
    component: UserProfile,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/noAuth",
    name: "出错",
    component: NoAuth,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.GUEST,
    },
  },
];
