<template>
  <div id="updateQuestion" class="container">
    <div class="title-container">
      <div class="title">{{ form.title }}</div>
    </div>
    <div class="content-container">
      <div class="tags">
        <a-tag v-for="tag in form.tags" :key="tag">
          {{ tag }}
        </a-tag>
      </div>
      <MdViewer
        disabled="disabled"
        :handle-change="onContentChange"
        :style="{ width: '100%' }"
        :value="form.content"
        :mode="'preview'"
        :locale="{ toolbar: {} }"
      />
      <div class="config">
        <div class="time">
          <span class="label">时间限制:</span>
          <span class="value">{{ form.judgeConfig.timeLimit }} ms</span>
        </div>
        <div class="memory">
          <span class="label">内存限制:</span>
          <span class="value">{{ form.judgeConfig.memoryLimit }} MB</span>
        </div>
        <div class="language-selector">
          <span class="label">选择语言:</span>
          <a-select
            v-model="run.language"
            style="width: 300px"
            @change="handleLanguageChange"
            default-value="c"
          >
            <a-option
              v-for="language in languages"
              :key="language.value"
              :value="language.value"
            >
              {{ language.label }}
            </a-option>
          </a-select>
        </div>
        <div ref="codeMirrorContainer" class="code-mirror-container"></div>
      </div>
      <a-button @click="handleSubmit">提交</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import MdViewer from "@/components/MdViewer.vue";
import {
  QuestionControllerService,
  RunSubmitControllerService,
} from "@/others/generated";
import message from "@arco-design/web-vue/es/message";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/pascal/pascal";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python.js";
import "codemirror/mode/fortran/fortran";

interface Form {
  questionId: number;
  title: string;
  tags: string[];
  content: string;
  judgeCase: {
    input: string;
    output: string;
  }[];
  judgeConfig: {
    timeLimit: number;
    memoryLimit: number;
  };
}

interface Run {
  questionId: number;
  code: string;
  language: string;
}

const route = useRoute();
const form = reactive<Form>({
  questionId: 0,
  title: "",
  tags: [],
  content: "",
  judgeCase: [],
  judgeConfig: {
    memoryLimit: 0,
    timeLimit: 0,
  },
});
const run = reactive<Run>({
  questionId: 0,
  code: "",
  language: "c", // 默认语言
});

const codeMirrorContainer = ref<HTMLElement | null>(null);
let codeMirrorInstance: CodeMirror.Editor | null = null;

const languages = [
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
  { label: "Python", value: "py" },
  { label: "C#", value: "cs" },
];

const modeMap: Record<string, string> = {
  c: "clike",
  cpp: "clike",
  java: "clike",
  py: "python",
  cs: "clike",
};

const onContentChange = (value: string) => {
  form.content = value;
};

const handleSubmit = async () => {
  run.questionId = form.questionId;
  run.code = codeMirrorInstance?.getValue() || "";

  // 若代码为空，则提示用户输入代码
  if (run.code.trim() === "") {
    message.error("请输入代码");
    codeMirrorInstance?.setValue("");
    return;
  }

  try {
    const res = await RunSubmitControllerService.doOneRunSubmitUsingPost(run);
    if (res.code === 0) {
      message.success("提交成功");
    } else {
      message.error("提交失败，请登录");
    }
  } catch (error) {
    message.error("提交失败，内部错误");
  }
};

const handleLanguageChange = (
  value: string | number | boolean | Record<string, unknown>
) => {
  if (typeof value === "string") {
    codeMirrorInstance?.setOption("mode", modeMap[value] || "clike");
    run.language = value;
  } else {
    console.error("Invalid language value type:", typeof value);
  }
};

onMounted(async () => {
  const id = Number(route.query.id);
  if (id) {
    try {
      const res = await QuestionControllerService.getQuestionVoByIdUsingGet(id);
      if (res.code === 0) {
        form.questionId = res.data?.questionId as number;
        form.title = res.data?.title as string;
        form.tags = res.data?.tags as string[];
        form.content = res.data?.content as string;
        form.judgeCase = [];
        form.judgeConfig = res.data?.judgeConfig as {
          timeLimit: number;
          memoryLimit: number;
        };
      } else {
        message.error("" + res.message);
      }
    } catch (error) {
      message.error("获取问题详情失败");
    }
  }

  // 初始化 CodeMirror
  if (codeMirrorContainer.value) {
    codeMirrorInstance = CodeMirror(codeMirrorContainer.value, {
      value: run.code,
      mode: modeMap[run.language] || "clike",
      lineNumbers: true,
    });

    // 监听 CodeMirror 的变化
    codeMirrorInstance.on("change", (instance) => {
      run.code = instance.getValue();
    });

    // 监听语言选择的变化并更新 CodeMirror 的模式
    watch(
      () => run.language,
      () => {
        codeMirrorInstance?.setOption("mode", modeMap[run.language] || "clike");
      }
    );
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-container {
  margin-bottom: 20px; /* 根据需要调整间距 */
}

.title {
  font-size: 24px; /* 根据需要调整字体大小 */
  font-weight: bold;
  text-align: center;
}

.content-container {
  width: 100%;
  max-width: 800px; /* 根据需要调整最大宽度 */
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.tags {
  margin-bottom: 20px;
}

.config {
  margin-top: 20px;
  margin-bottom: 20px;
}

.config .time,
.config .memory,
.config .language-selector {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.config .label {
  font-weight: bold;
  margin-right: 10px;
}

.config .value {
  font-size: 16px;
}

.code-mirror-container {
  width: 100%;
  height: 300px; /* 根据需要调整高度 */
}
</style>
