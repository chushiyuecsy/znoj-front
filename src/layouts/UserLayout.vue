<template>
  <div id="userLayout">
    <a-layout>
      <a-layout-header class="header">
        <a-row id="userLayout" align="center">
          <a-col flex="auto">
            <a-menu mode="horizontal">
              <a-menu-item
                key="0"
                :style="{ padding: 0, marginRight: '38px' }"
                disabled
              >
                <a class="title-bar" href="/">
                  <img alt="" class="logo" src="@/assets/logo.png" />
                  <div class="title">狗哥 OJ</div>
                </a>
              </a-menu-item>
            </a-menu>
            <a-menu></a-menu>
          </a-col>
          <a-col flex="100px"></a-col>
        </a-row>
      </a-layout-header>
    </a-layout>
  </div>
  <a-layout-content class="content">
    <router-view />
  </a-layout-content>
  <a-layout-footer class="footer">
    狗哥的毕设项目 ZNOJ在线判题系统 by
    <a href="https://gitee.com/zhao-ning123">程序员狗哥</a>
  </a-layout-footer>
</template>

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
  color: #111;
  margin-left: 10px;
}

.logo {
  height: 50px;
}

#userLayout .header {
  box-shadow: #efefef 5px 5px 10px;
}

.content {
  background: linear-gradient(to bottom, #eee, #fff);
  margin-bottom: 16px;
  padding: 20px;
}

.footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script lang="ts" setup></script>
