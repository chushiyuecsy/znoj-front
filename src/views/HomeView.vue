<template>
  <div id="manageQuestionView">
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="tag in record.tags" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY年MM月DD日") }}
      </template>
      <template #acInSubmit="{ record }">
        {{ record.acceptedNum + "/" + record.submitNum }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="handleWrite(record)">做题</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "@/others/generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
const isLoaded = ref(false);
onMounted(() => {
  if (!isLoaded.value) {
    loadData();
    isLoaded.value = true;
  }
});

watchEffect(() => {
<<<<<<< HEAD
  if (!isLoaded.value) {
    loadData();
    isLoaded.value = true;
  }
=======
  loadData();
>>>>>>> 63176bd29ad605ef1db311f9fe2a4fa42e2dd090
});

const onPageChange = (page: number, pageSize: number) => {
  searchParams.value.current = page;
  loadData();
};

const columns = [
  {
    title: "题目id",
    dataIndex: "questionId",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过/提交",
    slotName: "acInSubmit",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const router = useRouter();

const handleWrite = (question: Question) => {
  const routeData = router.resolve({
    path: "/question/write",
    query: {
      id: question.questionId,
    },
  });
  window.open(routeData.href, "_blank");
};
</script>

<style scoped></style>
