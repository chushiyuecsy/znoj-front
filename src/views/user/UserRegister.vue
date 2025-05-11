<template>
  <div id="userRegisterView">
    <h2 :style="{ marginBottom: '28px' }">注册</h2>
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
        <a-form-item field="userName" label="昵称" tooltip="请输入昵称">
          <a-input v-model="form.userName" placeholder="请输入昵称..." />
        </a-form-item>
        <a-form-item field="userPassword" label="密码">
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码..."
          />
        </a-form-item>
        <a-form-item field="checkPassword" label="确认密码">
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请输入确认密码..."
          />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" style="width: 120px" type="primary">
            注册
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import message from "@arco-design/web-vue/es/message";
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "@/others/generated";
// 引入hashcode.ts中的encryptPassword方法
import { encryptPassword } from "@/utils/hashcode";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userName: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const handleSubmit = async () => {
  form.userPassword = encryptPassword(
    form.userPassword + "7458329fn6dio7awyuratghukreasjghklajrsetehailuw"
  );
  form.checkPassword = encryptPassword(
    form.checkPassword + "7458329fn6dio7awyuratghukreasjghklajrsetehailuw"
  );
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    message.success("注册成功, " + res.message);
    await store.dispatch("user/getLoginUser");
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败, " + res.message);
  }
};
</script>
