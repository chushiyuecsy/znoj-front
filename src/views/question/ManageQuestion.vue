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
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
          <a-popconfirm
            content="确定删除？"
            okText="✓"
            cancelText="×"
            @ok="doDelete(record)"
          >
            <a-button status="danger">删除</a-button>
          </a-popconfirm>
=======
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
>>>>>>> 63176bd29ad605ef1db311f9fe2a4fa42e2dd090
        </a-space>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY年MM月DD日") }}
      </template>
      <template #acInSubmit="{ record }">
        {{ record.acceptedNum + "/" + record.submitNum }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "@/others/generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
<<<<<<< HEAD
import { Modal } from "@arco-design/web-vue";
=======
import moment from "moment";
>>>>>>> 63176bd29ad605ef1db311f9fe2a4fa42e2dd090

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
<<<<<<< HEAD
  size: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  console.log(searchParams.value);
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const handlePageChange = (current: number, size: number) => {
  searchParams.value.current = current; // 更新当前页码
  loadData(); // 重新加载数据
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
=======
  pageSize: 8,
  current: 1,
>>>>>>> 63176bd29ad605ef1db311f9fe2a4fa42e2dd090
});

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
    title: "通过/提交",
    slotName: "acInSubmit",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.questionId,
  });
  if (res.code === 0) {
    message.success("删除成功");
    await loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/question/update",
    query: {
      id: question.questionId,
    },
  });
};

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

watchEffect(() => {
  loadData();
});

const onPageChange = (page: number, pageSize: number) => {
  searchParams.value.current = page;
  loadData();
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped></style>
