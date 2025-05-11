<template>
  <div class="markdown-viewer">
    <Viewer :value="value" :plugins="plugins" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import gfm from "@bytemd/plugin-gfm";
import { Viewer } from "@bytemd/vue-next";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import { defineProps, withDefaults } from "vue";

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const plugins = [
  gfm(),
  highlight(),
  math(),
  // Add more plugins here
];

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped>
.markdown-viewer {
  max-width: 80vw;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
</style>
