<template>
  <Editor :plugins="plugins" :value="value" @change="handleChange" />
</template>

<script lang="ts" setup>
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import { Editor } from "@bytemd/vue-next";
import katex from "katex";
import { defineProps, withDefaults } from "vue";

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const plugins = [
  gfm(),
  highlight(),
  math({
  }),
  // Add more plugins here
];

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style>
@import "~katex/dist/katex.min.css";

/* 手动添加公式块样式 */
.math-block {
  display: block;
  margin: 1em 0;
  padding: 0.5em;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: center;
}
</style>