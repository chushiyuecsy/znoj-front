<template>
  <div class="home">
    <MdEditor :handle-change="onMdChange" :value="mdValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";

const mdValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v;
  console.log(v);
};
</script>
