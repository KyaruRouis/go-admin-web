<script setup lang="ts">
import {ref,computed,watch,onMounted} from "vue";
import {useRoute,useRouter} from "vue-router";
import {useTagsViewsStore} from "@/store/modules/tagsViews";
import {TabsPaneContext} from "element-plus";

const tagsViewsStore = useTagsViewsStore();
const route = useRoute();
const router = useRouter();

const visitedViews = computed(()=> tagsViewsStore.visitedViews)

const activeTabsValue = computed({
  get:()=> {
    return tagsViewsStore.activeTabsValue
  },
  set: val => {
    tagsViewsStore.setTabsMenuValue(val)
  }
})

// 显示上一个或者下一个tabs标签
function toLastView(activeTabPath) {
  // 当前tabs标签的索引
  let index = visitedViews.value.findIndex(item => item.path === activeTabPath)
  // 获取下一个tab索引或者上一个索引
  const nextTab = visitedViews.value[index + 1] || visitedViews.value[index - 1]
  if (!nextTab) return
  router.push(nextTab.path)
  // 新增tabs标签的函数
  tagsViewsStore.addVisitedView(nextTab)
}

// 点击tabs标签事件
const tabClick = (tabItem:TabsPaneContext)=> {
  let path = tabItem.props.name as string;
  router.push(path);
}

// 添加tags标签
const addTabs = ()=> {
  const {name} = route
  if (name==='Login')return
  if (name){
    tagsViewsStore.addView(route)
  }
  return false
}

onMounted(()=> {
  addTabs()
})
watch(route,()=> {
  addTabs()
})

</script>

<template>
  <div class="main-tabs-view">
    <div class="tabs-view">
      <el-tabs v-model="activeTabsValue" type="card" @tab-click="tabClick">
        <el-tab-pane v-for="item in visitedViews"
                     :key="item.path"
                     :path="item.path"
                     :label="item.title"
                     :closable="item.meta&&item.meta.affix">
        <template #label>
          <el-icon class="tabs-icon" v-if="item.icon">
            <component :is="item.icon"></component>/
          </el-icon>
          {{item.title}}
        </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right-tbn"></div>
  </div>
</template>

<style scoped>
.main-tabs-view {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 100px;
  background: white;
}

.tabs-view {
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
}

:deep(.el-tabs) {
  border-top: 1px solid #e99d53;
}

:deep(.el-tabs .el-tabs__nav) {
  border: none;
}

:deep(.el-tabs .el-tabs__header .el-tabs__item) {
  border: none;
  color: #cccccc;
}

:deep(.el-tabs .el-tabs__header .el-tabs__item.is-active) {
  border-bottom: 2px solid #e99d53;
  color: #e99d53;
}


</style>