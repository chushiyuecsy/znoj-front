/* eslint-disable */
<template>
  <div class="home">
    <a-row class="grid-demo">
      <a-col :span="8">
        <a-card>
          <a-image :src="user_avatar" width="180px" />
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card>
          <a-form
            :model="form"
            :style="{ width: '600px' }"
            @submit="handleSubmit"
          >
            <a-form-item field="userName" label="昵称">
              <a-input v-model="form.userName" />
            </a-form-item>
            <a-form-item field="userProfile" label="个人简介">
              <a-textarea v-model="form.userProfile" />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit">Submit</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useStore } from "vuex";
import { UserControllerService } from "@/others/generated";
import message from "@arco-design/web-vue/es/message";

interface Form {
  userAvatar: string;
  userName: string;
  userProfile: string;
}

const store = useStore();

const user_avatar: string = store.state.user.loginUser.userAvatar;
const form = reactive<Form>({
  userAvatar: store.state.user.loginUser?.userAvatar ?? null,
  userName: store.state.user.loginUser.userName,
  userProfile: store.state.user.loginUser.userProfile,
});

const handleSubmit = async () => {
  const res = await UserControllerService.updateMyUserUsingPost(form);
  if (res.code === 0) {
    message.success("修改成功");
    await store.dispatch("user/getLoginUser");
  } else {
    message.error("修改失败, " + res.message);
  }
};
</script>

<style scoped>
.grid-demo a-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
</style>
