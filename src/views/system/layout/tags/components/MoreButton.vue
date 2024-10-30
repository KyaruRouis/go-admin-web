<script setup lang="ts">
import {computed} from "vue";
import {useSettingStore} from "@/store/modules/setting";
import {useTagsViewsStore} from "@/store/modules/tagsViews";
import {useRouter,useRoute} from "vue-router";

const router = useRouter();
const route = useRoute();

const settingStore = useSettingStore()
const tagsViewsStore = useTagsViewsStore();
const visitedViews = computed(()=> tagsViewsStore.visitedViews)

// 关闭其他标签
const closeOtherTab = async () => {
  await tagsViewsStore.delOtherViews(route.path)
}

// 关闭所有标签
const closeAllTab = async () => {
  await tagsViewsStore.delAllViews()
  tagsViewsStore.goHome()
}
</script>

<template>
  <el-dropdown trigger="hover">
    <el-button size="small" color="#e99d53">
      <span class="more">更多</span>
      <el-icon><arrow-down/></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon size="14"><Close/></el-icon>关闭其他
        </el-dropdown-item>

        <el-dropdown-item @click="closeAllTab">
          <el-icon size="14"><FolderDelete/></el-icon>关闭所有
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.more {
  color: white;
}
.el-button {
  margin-right: 30px;
}
</style>