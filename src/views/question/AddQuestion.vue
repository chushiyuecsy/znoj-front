<template>
  <div id="addQuestion">创建题目</div>
  <div>
    <a-form :model="form">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题..." />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.tags"
          allow-clear
          placeholder="请输入标签，回车确认..."
        />
      </a-form-item>
      <a-form-item field="content" label="题目题面" tooltip="请输入题目内容">
        <MdEditor
          :handle-change="onContentChange"
          :style="{ width: '90%' }"
          :value="form.content"
        />
      </a-form-item>
      <a-form-item :content-flex="false" :merge-props="false" label="判题配置">
        <a-space direction="vertical">
          <a-form-item field="judgeConfig.timeLimit" no-style>
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              :default-value="1000"
              :max="5000"
              :min="500"
              placeholder="时间限制"
            >
              <template #suffix>ms</template>
            </a-input-number>
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" no-style>
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              :default-value="64"
              :max="256"
              :min="32"
              placeholder="内存限制"
            >
              <template #suffix>MB</template>
            </a-input-number>
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-card :style="{ width: '90%' }" title="测试用例">
          <a-form-item
            v-for="(caseItem, index) of form.judgeCase"
            :key="index"
            :wrapper-col-props="{ justify: 'center', align: 'center' }"
          >
            <a-form-item
              :key="index"
              :field="`judgeCase[${index}].input`"
              :style="{ marginLeft: '10px' }"
            >
              <a-input v-model="caseItem.input" placeholder="输入..." />
            </a-form-item>
            <a-form-item
              :key="index"
              :field="`judgeCase[${index}].output`"
              :style="{ marginLeft: '10px' }"
              :wrapper-col-props="{ justify: 'center', align: 'center' }"
            >
              <a-input v-model="caseItem.output" placeholder="输出..." />
            </a-form-item>
            <a-form-item>
              <a-button
                :style="{ marginLeft: '10px' }"
                :wrapper-col-props="{ justify: 'center', align: 'center' }"
                style="background-color: #cfcfcf"
                @click="handleDelete(index)"
              >
                删除
              </a-button>
            </a-form-item>
          </a-form-item>
          <a-button
            :style="{ marginInline: '400px' }"
            style="background-color: #cfcfcf"
            @click="handleAdd"
          >
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
        </a-card>
      </a-form-item>

      <a-form-item>
        <a-button @click="handleSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { IconPlus } from "@arco-design/web-vue/es/icon";
import { QuestionControllerService } from "@/others/generated";
import message from "@arco-design/web-vue/es/message";

interface Form {
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

const form = reactive<Form>({
  title: "",
  tags: [""],
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    timeLimit: 1000,
    memoryLimit: 64,
  },
});
const handleAdd = () => {
  form.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.judgeCase.splice(index, 1);
};

const onContentChange = (value: string) => {
  form.content = value;
};

const handleSubmit = async () => {
  console.log(form);
  try {
    const res = await QuestionControllerService.addQuestionUsingPost(form);
    if (res.code === 0) {
      message.success("添加成功");
    } else {
      message.error(res.message);
    }
  } catch (error) {
    message.error("添加失败");
  } finally {
    console.log("ok");
  }
};
</script>

<style scoped></style>
