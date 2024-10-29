<script setup lang="ts">
import {useSettingStore} from "@/store/modules/setting.ts";
import {computed} from "vue";
const settingStore = useSettingStore();
const isCollapse = computed(()=> !settingStore.isCollapse);
const handleCollapse = () => {
  settingStore.setCollapse(isCollapse.value);
}
</script>

<template>
  <div class="hamburger-container" @click="handleCollapse">
    <el-icon class="icon" color="#e99d53" v-if="isCollapse">
      <expand/>
    </el-icon>

    <el-icon class="icon" color="#e99d53" v-else>
      <fold/>
    </el-icon>

  </div>
</template>

<style scoped>
.hamburger-container {
  padding: 0px 15px;
  height: 100%;
  display: flex;
  align-items: center;
}
.hamburger-container .icon {
  font-size: 24px;
  cursor: pointer;
}
</style>