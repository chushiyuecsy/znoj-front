import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", () => {
  // 状态：当前选中的菜单项
  const selectedKey = ref<string>("/");

  // 计算属性：返回选中的菜单项（用于绑定到 a-menu 的 selectedKeys）
  const selectedKeys = computed(() => {
    console.log("selectedKey.value", selectedKey.value);
    return [selectedKey.value];
  });

  // 方法：更新选中的菜单项
  function setSelectedKey(key: string) {
    console.log("setSelectedKey", key);
    selectedKey.value = key;
    // 可选：将状态保存到 localStorage，以便页面刷新后恢复
    localStorage.setItem("selectedMenuKey", key);
  }

  // 方法：从 localStorage 恢复状态
  function restoreSelectedKey() {
    const savedKey = localStorage.getItem("selectedMenuKey");
    if (savedKey) {
      selectedKey.value = savedKey;
    }
  }

  return {
    selectedKey,
    selectedKeys,
    setSelectedKey,
    restoreSelectedKey,
  };
});
