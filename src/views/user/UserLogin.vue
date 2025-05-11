<template>
  <div id="userLoginView">
    <h2 :style="{ marginBottom: '28px', textAlign: 'center' }">登录</h2>
    <a-card :style="{ width: '50%', align: 'center', margin: '0 auto' }">
      <a-form
        :model="form"
        auto-label-width
        label-align="left"
        size="large"
        @submit="handleSubmit"
      >
        <a-form-item field="userAccount" label="账号" tooltip="请输入账号">
          <a-input v-model="form.userAccount" placeholder="请输入账号..." />
        </a-form-item>
        <a-form-item field="userPassword" label="密码">
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码..."
          />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" style="width: 120px" type="primary">
            登录
          </a-button>
        </a-form-item>
      </a-form>
      <a-divider></a-divider>
      <a-row align="center">
        <a-col :span="16" align="center"></a-col>
        <a-col :span="4" align="center">
          <a-link href="/user/register" style="width: 120px">注册</a-link>
        </a-col>
        <a-col :span="4" align="center">
          <a-link href="https://www.qrz.com/db/bg9joi" style="width: 120px">
            联系我
          </a-link>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import message from "@arco-design/web-vue/es/message";
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "@/others/generated";
// 引入hashcode.ts中的encryptPassword方法
import { encryptPassword } from "@/utils/hashcode";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const handleSubmit = async () => {
  form.userPassword = encryptPassword(
    form.userPassword + "7458329fn6dio7awyuratghukreasjghklajrsetehailuw"
  );
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    message.success("登录成功");
    // await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败, " + res.message);
  }
};
</script>
