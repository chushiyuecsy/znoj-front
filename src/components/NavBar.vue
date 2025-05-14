<template>
  <a-row align="center" justify="center">
    <a-col flex="auto">
      <a-row id="navBar" align="center">
        <a-col flex="auto">
          <a-menu
            :default-selected-keys="['1']"
            :selected-keys="selectedKeys"
            mode="horizontal"
            @menu-item-click="doMenuClick"
          >
            <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }">
              <a class="title-bar">
                <img alt="" class="logo" src="@/assets/logo.png" />
                <div class="title">狗哥 OJ</div>
              </a>
            </a-menu-item>
            <a-menu-item v-for="item in visibleRoutes" :key="item.path">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </a-col>
    <a-col class="user" flex="160px" justify="center">
      <a-image
        show-loader
        height="36px"
        v-if="
          store.state.user.isLogin &&
          store.state.user.loginUser?.userAvatar !== ''
        "
        :src="store.state.user.loginUser.userAvatar"
        :preview="false"
        flex="auto"
      />
      <a-col
        v-if="!store.state.user?.isLogin"
        :span="16"
        class="centered-col"
        flex="auto"
      >
        <a-button href="/user/login" size="large">登录</a-button>
      </a-col>
      <a-col
        v-else
        :span="16"
        class="centered-col"
        flex="160px"
        justify="center"
      >
        <a-dropdown :popup-max-height="true" justify="center" trigger="hover">
          <a-button size="large">
            <div class="userName">
              {{ store.state.user?.loginUser?.userName }}
            </div>
          </a-button>
          <template #content>
            <a-doption @click="router.push('/myProfile')">
              修改个人信息
            </a-doption>
            <a-doption @click="store.dispatch('user/logout')">
              退出登录
            </a-doption>
          </template>
        </a-dropdown>
      </a-col>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const store = useStore();

console.log(store.state.user);

const visibleRoutes = computed(() => {
  return routes.filter((i) => {
    if (i.meta?.hideInMenu) return false;
    return checkAccess(store.state.user.loginUser, i?.meta?.access as string);
  });
});

const selectedKeys = ref(["/"]);

router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  if (key !== "0") router.push({ path: key });
  else router.push({ path: "/" });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: #cfcfcf;
  }
}

.title {
  font-size: 25px;
  color: #111;
  margin-left: 10px;
}

.logo {
  height: 50px;
}

.user {
  display: flex;
}

.userName {
  display: flex;
  color: #111;
}

.centered-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
