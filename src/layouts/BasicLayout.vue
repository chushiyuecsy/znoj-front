<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <NavBar />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-content class="footer">
        狗哥的毕设项目 ZNOJ在线判题系统 by
        <a href="https://gitee.com/zhao-ning123">程序员狗哥</a>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout .header {
  box-shadow: #efefef 5px 5px 10px;
}

#basicLayout .content {
  background: linear-gradient(to bottom, #eee, #fff);
  margin-bottom: 16px;
  padding: 20px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: { NavBar },
};
</script>
