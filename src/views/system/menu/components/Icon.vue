<script setup lang="ts">
import {ref,computed} from 'vue'

// 定义事件
const emit = defineEmits(['onChangeIcon'])

// 定义图标数组
const iconList:Array<string> = ref<any>([
  'Plus',
  'Minus',
  'CirclePlus',
  'Search',
  'Female',
  'Male',
  'Aim',
  'House',
  'FullScreen',
  'Loading',
  'Link',
  'Service',
  'Pointer',
  'Star',
  'Notification',
  'Connection',
  'ChatDotRound',
  'Setting',
  'Clock',
  'Position',
  'Discount',
  'Odometer',
  'ChatSquare',
  'ChatRound',
  'ChatLineRound',
  'ChatLineSquare',
  'ChatDotSquare',
  'View',
  'Hide',
  'Unlock',
  'Lock',
  'RefreshRight',
  'RefreshLeft',
  'Refresh',
  'Bell',
  'MuteNotification',
  'User',
  'Check',
  'CircleCheck',
  'CircleClose',
  'Close',
  'PieChart',
  'More',
  'Compass',
  'Filter',
  'Switch',
  'Select',
  'SemiSelect',
  'CloseBold',
  'EditPen',
  'Edit',
  'Message',
  'MessageBox',
  'TurnOff',
  'Finished',
  'Delete',
  'Crop',
  'SwitchButton',
  'Operation',
  'Open',
  'Remove',
  'ZoomOut',
  'ZoomIn',
  'InfoFilled',
  'CircleCheckFilled',
  'SuccessFilled',
  'WarningFilled',
  'CircleCloseFilled',
  'QuestionFilled',
  'WarnTriangleFilled',
  'UserFilled',
  'MoreFilled',
  'Tools',
  'HomeFilled',
  'Menu',
  'UploadFilled',
  'Avatar',
  'HelpFilled',
  'Share',
  'StarFilled',
  'Comment',
  'Histogram',
  'Grid',
  'Promotion',
  'DeleteFilled',
  'RemoveFilled',
  'CirclePlusFilled',
  'ArrowLeft'
])

// 每页显示行数
const pageSize = ref(20)
// 当前页码
const currentPage = ref(1)
// 搜索关键字
const keyword = ref('')
// 计算属性
const list = computed(()=> {
  if (currentPage.value === 1){
    return iconList.value.filter(item=> {
      return item.indexOf(keyword.value)!==-1
    }).slice(currentPage.value-1,pageSize.value)
  }else {
    return iconList.value.filter(v=> v.includes(keyword.value))
        .slice(
            pageSize.value*(currentPage.value-1),
            pageSize.value*(currentPage.value-1)+pageSize.value
        )
  }
})

// 选中图标的函数
const onChangeIcon = (item:any)=> {
  emit('onChangeIcon',item)
}

// 图标分页功能
const onCurrentChange = (page:number) => {
  currentPage.value = page
}

</script>

<template>
  <div class="container">
    <h3>（共{{iconList.length}}个图标）</h3>
    <div class="search-box">
      <el-input class="search" size="large" v-model="keyword" clearable placeholder="请输入图标名称"></el-input>
    </div>

    <ul>
      <li class="icon-li" v-for="(item,index) in list" :key="index" :title="item"
          @click="onChangeIcon(item)">
        <div class="icon-li-content">
          <el-icon>
            <component :is="item" :title="item"></component>
          </el-icon>
        </div>
      </li>
    </ul>
  </div>

  <!--分页 start-->
  <el-pagination
      small
      :total="iconList.length"
      :page-size="pageSize"
      :current-page="currentPage"
      background
      layout="prev,pager,next"
      @current-change="onCurrentChange"
  ></el-pagination>
  <!--分页 end-->
</template>

<style scoped>
.search-box {
  text-align: center;
  margin-top: 10px;
}
.search {
  width: 300px;
}

ul {
  text-align: center;
}
li {
  list-style: none;
}
.icon-li {
  display: inline-block;
  padding: 10px;
  width: 30px;
  height: 30px;
  border-style: solid;
  border-width: 1px;
  margin-top: 0.25rem;
  margin-right: 0.5rem;
}
.icon-li-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.icon-li-content i {
  font-size: 26px;
  color: #606266;
}
.icon-li-content span {
  margin-top: 10px;
  color: #787878;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.flex-wrap {
  flex-wrap: wrap;
}
.flex {
  display: flex;
}

.ml-2 {
  margin-left: 0.5rem;
}

/*分页样式*/
.el-pagination {
  margin-top: 20px;
  justify-content: center;
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active){
  background-color: #e99d53;
}
</style>