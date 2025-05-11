<template>
  <div id="manageQuestionView">
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
<<<<<<< HEAD
        size: searchParams.size,
        current: searchParams.current,
        total,
      }"
      @page-change="handlePageChange"
=======
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
>>>>>>> 63176bd29ad605ef1db311f9fe2a4fa42e2dd090
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="handleCode(record)">查看代码</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { RunListControllerService, RunSubmitVO } from "@/others/generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
<<<<<<< HEAD
  size: 10,
=======
  pageSize: 10,
>>>>>>> 63176bd29ad605ef1db311f9fe2a4fa42e2dd090
  current: 1,
});

const loadData = async () => {
  const res = await RunListControllerService.listRunSubmitByPageUsingPost(
    searchParams.value
  );
  const code2str = (code: number) => {
    switch (code) {
      case 1:
        return "排队中";
      case 2:
        return "运行中";
      case 3:
        return "通过";
      case 4:
        return "答案错误";
      case 5:
        return "运行超时";
      case 6:
        return "编译出错";
      case 7:
        return "运行异常(SIGSEGV)";
      case 8:
        return "运行异常(SIGXFSZ)";
      case 9:
        return "运行异常(SIGFPE)";
      case 10:
        return "运行异常(SIGABRT)";
      case 11:
        return "运行异常(NZEC)";
      case 12:
        return "运行异常(Other)";
      case 13:
        return "内部错误";
      case 14:
        return "输出格式错误";
    }
  };
  if (res.code === 0) {
    dataList.value = res.data.records.map((i) => ({
      runId: i.runId,
      questionId: i.questionId,
      userId: i.userId,
      codeLength: i.codeLength,
      language: i.language,
      time: i.time,
      memory: i.memory,
      result: code2str(i.result as number),
    }));
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const handlePageChange = (current: number, size: number) => {
  searchParams.value.current = current; // 更新当前页码
  searchParams.value.size = size; // 更新每页条数
  loadData(); // 重新加载数据
};

const columns = [
  {
    title: "编号",
    dataIndex: "runId",
  },
  {
    title: "题目",
    dataIndex: "questionId",
  },
  {
    title: "提交用户",
    dataIndex: "userId",
  },
  {
    title: "代码长度",
    dataIndex: "codeLength",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "时间使用",
    dataIndex: "time",
  },
  {
    title: "内存使用",
    dataIndex: "memory",
  },
  {
    title: "运行结果",
    dataIndex: "result",
  },
  {
    title: "源码",
    slotName: "optional",
  },
];

const router = useRouter();

const handleCode = (runSubmit: RunSubmitVO) => {
  const routeData = router.resolve({
    path: "/run/case",
    query: {
      id: runSubmit.runId,
    },
  });
  window.open(routeData.href, "_blank");
};
watchEffect(() => {
  loadData();
});

const onPageChange = (page: number, pageSize: number) => {
  searchParams.value.current = page;
  loadData();
};
</script>

<style scoped></style>
