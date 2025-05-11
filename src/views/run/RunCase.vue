<template>
  <div id="code-mirror-container" ref="codeMirrorContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { CodeControllerService } from "@/others/generated";
import message from "@arco-design/web-vue/es/message";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

const route = useRoute();

interface Form {
  runId: number;
}

const form = reactive<Form>({
  runId: 0,
});

let res = "";

const codeMirrorContainer = ref<HTMLElement | null>(null);
let editor: CodeMirror.Editor | null = null;

onMounted(async () => {
  form.runId = Number(route.query.id);
  const ret = await CodeControllerService.getCodeUsingPost(form);
  if (ret) {
    res = ret;
    message.success("获取代码成功");

    // 初始化 CodeMirror 5
    if (codeMirrorContainer.value) {
      editor = CodeMirror(codeMirrorContainer.value, {
        value: res,
        mode: "clike", // 根据需要设置代码模式
        lineNumbers: true,
        theme: "default", // 根据需要设置主题
        readOnly: true,
      });
    }
  } else {
    message.error("获取代码失败");
  }
});
</script>

<style scoped>
#code-mirror-container {
  height: 100%;
  width: 100%;
}

.grid-demo a-col {
  height: 48px;
  line-height: 48px;
  color: var(--color-white);
  text-align: center;
}
</style>
