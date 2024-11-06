<script setup lang="ts">
import {ref,reactive,toRefs,onMounted} from 'vue'
import {formatTime} from "@/utils/date";
import { ElMessage } from 'element-plus'
import {getLogListApi} from "@/api/system/log/log.ts";
import {exportExcel} from "@/utils/exportExcel.ts";
const state = reactive({
  // 搜索关键字
  searchValue: '',
  // 表格数据
  tableData: [],
  // 总条数
  total: 0,
  // 每页显示行数
  pageSize: 10,
  // 当前页码
  pageIndex: 1,
  // 数据加载状态
  loading: false
})

// 获取日志列表数据
const loadData = async (state:object) => {
  state.loading = true
  // 先清空表格数据
  state.tableData = []
  // 查询参数对象
  const params = {
    'pageIndex':state.pageIndex,
    'pageSize':state.pageSize,
    'keyword':state.searchValue
  }
  const { data } = await getLogListApi(params)
  state.tableData = data.result.list
  state.total = data.result.count
  state.loading = false
}

// 刷新
const refresh = () => {
  // 搜索关键字
  state.searchValue = ''
  loadData(state)
}

// 搜索
const search = () => {
  if(state.searchValue!=null && state.searchValue!=''){
    loadData(state)
    ElMessage.success(`关键字“${state.searchValue}”搜索内容如下`)
  }
}
// 切换页码函数
const changePage = (val:number) => {
  state.pageIndex = val
  loadData(state)
}

// 处理列表序号
const Nindex = (index:number) => {
  // 当前页码
  const page = state.pageIndex
  // 每页显示行数
  const pageSize = state.pageSize
  return index+1+(page-1)*pageSize
}

onMounted (()=> {
  loadData(state)
})
const {tableData,pageSize,loading,total,searchValue} = toRefs(state)

// 定义需要导出的列名对象
const column = [
  {name: 'id',label: '日志ID'},
  {name: 'remote_addr',label: '来源IP'},
  {name: 'status_code',label: '请求状态'},
  {name: 'http_method',label: '操作方式'},
  {name: 'class_method',label: '请求方法'},
  {name: 'use_time',label: '执行时间'},
  {name: 'browser',label: '浏览器'},
  {name: 'created_at',label: '访问时间'}
]

// 导出excel函数
const exportExcelAction = () => {
  exportExcel({
    column,
    data:state.tableData,
    filename: '日志信息数据',
    format: 'xlsx',
    autowidth: false
  })
}


</script>

<template>
  <el-card>
    <!--头部区域 start-->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;"><Watch/></el-icon>日志管理
        </h3>

        <!--搜索区域 start-->
        <div class="card-search">
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input prefix-icon="Search" v-model="searchValue"
                        @keyup.enter.natvie="search" placeholder="关键字搜索（回车）"/>
            </el-col>

            <el-col :span="7">
              <el-button plain style="width: 100%;" color="#2fa7b9" @click="exportExcelAction">导出 Excel</el-button>
            </el-col>

            <el-col :span="3" style="display: inline-flex;justify-content: center;align-items: center;cursor: pointer;">
              <el-icon style="font-size: 20px; color: #b3b6bc;" @click="refresh"><Refresh/></el-icon>
            </el-col>

          </el-row>
        </div>
        <!--搜索区域 end-->

      </div>
    </template>
    <!--头部区域 end-->
    <!--表格区域 start-->
    <div class="table-box">
      <el-table element-loading-text="数据加载中..." v-loading="loading" :data="tableData"
                style="width: 100%;text-align: center;" :cell-style="{textAlign:'center'}"
                :header-cell-style="{ fontSize: '15px',background:'#e99d53',color: 'white',textAlign:'center' }">

        <el-table-column label="序号" width="100" type="index" :index="Nindex"/>

        <el-table-column label="来源IP">
          <template #default="scope">
            <span v-if="scope.row.remote_addr == '::1'">内网地址</span>
            <span v-else>{{scope.row.province}}-{{scope.row.city}}</span>
          </template>
        </el-table-column>

        <el-table-column label="请求状态">
          <template #default="scope">
            <span>{{scope.row.status_code}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作方式">
          <template #default="scope">
            <span>{{scope.row.http_method}}</span>
          </template>
        </el-table-column>

        <el-table-column label="请求方法">
          <template #default="scope">
            <span>{{scope.row.class_method}}</span>
          </template>
        </el-table-column>

        <el-table-column label="执行时间(ms)">
          <template #default="scope">
            <el-tag>{{scope.row.use_time}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="浏览器">
          <template #default="scope">
            <el-tag>{{scope.row.browser}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="访问时间">
          <template #default="scope">
            <span>{{formatTime(scope.row.created_at,'yyyy-MM-dd HH:mm:sss')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--表格区域 end-->

    <!--分页区域 start-->
    <el-pagination background layout="total,sizes,prev,pager,next,jumper" :total="total"
                   v-model:page-size="pageSize" :page-sizes="[10,20,30,40]"
                   @current-change="changePage"/>
    <!--分页区域 end-->

  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #e99d53;
}

/*自定义分页样式*/
.el-pagination {
  margin-top: 20px;
  justify-content: center;
}
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active){
  background-color: #e99d53;
}

/*修改v-loading样式*/
:deep(.el-loading-spinner .el-loading-text){
  color: #e99d53;
}
:deep(.el-loading-spinner .path){
  stroke: #e99d53;
}
</style>