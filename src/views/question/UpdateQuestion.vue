<template>
  <div id="updateQuestion">更新题目</div>
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
          <a-form-item field="timeLimit" no-style>
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              :max="5000"
              :min="500"
              :handle-change="onTimeChange"
              placeholder="时间限制"
            >
              <template #suffix>ms</template>
            </a-input-number>
          </a-form-item>
          <a-form-item field="memoryLimit" no-style>
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              :max="256"
              :min="32"
              :handle-change="onMemoryChange"
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
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import MdEditor from "@/components/MdEditor.vue";
import { IconPlus } from "@arco-design/web-vue/es/icon";
import { QuestionControllerService } from "@/others/generated";
import message from "@arco-design/web-vue/es/message";

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

const route = useRoute();
const form = reactive<Form>({
  questionId: 0,
  title: "",
  tags: [],
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 32,
    timeLimit: 500,
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

const onTimeChange = (value: number) => {
  form.judgeConfig.timeLimit = value;
};

const onMemoryChange = (value: number) => {
  form.judgeConfig.memoryLimit = value;
};

const handleSubmit = async () => {
  console.log(form);
  try {
    const res = await QuestionControllerService.updateQuestionUsingPost(form);
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error(res.message);
    }
  } catch (error) {
    message.error("更新失败");
  } finally {
    console.log("ok");
  }
};

onMounted(async () => {
  const id = Number(route.query.id);

  for (
    let index = 0;
    index < form.tags.length;
    index++ // 删除空tag，全为空白符的tag
  )
    if (form.tags[index].trim() === "") form.tags.splice(index, 1);

  if (id) {
    try {
      const res = await QuestionControllerService.getQuestionVoByIdUsingGet(id);
      if (res.code === 0) {
        form.questionId = res.data?.questionId as number;
        form.title = res.data?.title as string;
        form.tags = res.data?.tags as string[];
        form.content = res.data?.content as string;
        form.judgeCase = (res.data?.judgeCase || []).map((item) => ({
          input: item.input || "",
          output: item.output || "",
        }));
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
});
</script>

<style scoped></style>
