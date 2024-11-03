<script setup lang="ts">
import {ref,reactive,toRefs,onMounted} from "vue";
import {getUserListApi} from "@/api/system/user/user.ts";
import {formatTime} from "@/utils/date.ts";
import {ElMessage} from "element-plus";
import AddUser from "@/api/system/user/components/AddUser.vue";

const state = reactive({
  // 搜索关键字
  searchValue: "",
  // 表格数据
  tableData : [],
  // 总条数
  total: 0,
  // 每页显示行数
  pageSize: 10,
  // 当前页码
  pageIndex: 1,
  // 数据加载
  loading: false,
})

// 获取管理员列表数据
const loadData = async (state:any) => {
  state.loading = true
  // 先清空表格数据
  state.tableData = []
  // 查询参数
  const params = {
    'pageIndex': state.pageIndex,
    'pageSize': state.pageSize,
    'keyword': state.searchValue,
  }
  const {data} = await getUserListApi(params)
  state.tableData = data.result.list
  state.total = data.result.count
  state.loading = false
}

// 刷新
const refresh = ()=> {
  //搜索关键字
  state.searchValue = ''
  // 加载数据
  loadData(state)
}

// 搜索
const search = ()=> {
  if (state.searchValue != null && state.searchValue != '') {
    loadData(state)
    ElMessage({
      type: 'success',
      message: `关键字"${state.searchValue}"搜索内容如下`
    })
  }
}

// 切换页码执行事件
const changePage = (val:number) => {
  state.pageIndex = val
  loadData(state)
}

// 处理列表序号
const Nindex = (index: number) => {
  // 当前页码
  const page = state.pageIndex
  // 每页行数
  const pageSize = state.pageSize
  return index+1+(page-1)*pageSize
}

// 新增管理员弹出框状态
const addUserVisible = ref(false)

// 弹出新增管理员表单的函数
const addUser = ()=> {
  addUserVisible.value = true
}

// 关闭新增管理员弹出框
const closeAddUserForm = ()=> {
  addUserVisible.value = false
}

// 提交表单后处理函数
const success = () => {
  closeAddUserForm()
  loadData(state)
}

// 挂在后加载列表数据
onMounted(()=>{
  loadData(state)
})
const {tableData,pageSize,loading,total,searchValue} = toRefs(state);
</script>

<template>
  <el-card class="box-card">
    <!--头部 start-->
    <template #header>
      <div class="card-header">
        <h3><el-icon style="margin-right: 10px;"><UserFilled/></el-icon>用户管理</h3>
        <!--搜索区域 start-->
        <div class="card-search">
          <el-row :gutter="10">
            <el-col :span="11">
              <el-input prefix-icon="Search" v-model="searchValue" @keyup.enter.native="search()" placeholder="关键字搜索（回车）"/>
            </el-col>
            <el-col :span="10">
              <div class="my-button">
                <el-button plain style="width: 50%" color="#e99d53" @click="addUser">
                  <el-icon><Plus/></el-icon>
                  添加用户
                </el-button>
                <el-button plain style="width: 50%" color="#076613" @click="exportExcelAction">
                  <el-icon><Download/></el-icon>
                  导出Excel
                </el-button>
              </div>
            </el-col>
            <el-col :span="3" style="display: inline-flex;justify-content: center;align-items: center;cursor: pointer">
              <el-icon style="font-size: 20px;color:#b3b6bc;" @click="refresh"><Refresh/></el-icon>
            </el-col>
          </el-row>
        </div>
        <!--搜索区域 end-->
      </div>
    </template>
    <!--头部 end-->

    <!--表格区域 start-->
    <div class="table-box">
      <el-table element-loading-text="数据加载中..." v-loading="loading" :data="tableData"
                style="width: 100%;text-align: center;" :cell-style="{textAlign:'center'}"
                :header-cell-style="{fontSize:'15px',background: '#e99d53', color: 'white', textAlign:'center'}">
        <el-table-column label="序号" width="100" type="index" :index="Nindex"/>
        <el-table-column label="头像">
          <template #default="scope">
            <el-tooltip v-if="scope.row.avatar!==''" :content="scope.row.avatar" placement="top" effect="light">
              <img :src="url+'uploadFile/'+scope.row.avatar" style="width:64px;height: 40px">
            </el-tooltip>
            <el-tag type="warning" v-else>未上传</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="用户名称">
          <template #default="scope">
            <span>{{scope.row.username}}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号">
          <template #default="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template #default="scope">
            <span>{{formatTime(scope.row.created_at,'yyyy-MM-dd')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="更新时间">
          <template #default="scope">
            <span>{{formatTime(scope.row.updated_at,'yyyy-MM-dd')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="editUser(scope.row.id)"><el-icon><Edit/></el-icon>编辑</el-button>
            <el-popconfirm width="200px" confirm-button-text="确定" cancel-button-text="取消" icon="Delete"
                           icon-color="#626AEF" :title="'确定删除用户名为“'+scope.row.username+'的用户吗？”'" @confirm="delUser(scope.row.id)">
              <template #reference>
                <el-button size="small" type="danger"><el-icon><Delete/></el-icon>删除</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>

      </el-table>

      <!--分页插件 start-->
      <el-pagination background layout="total,sizes,prev,pager,next,jumper"
      :total="total" v-model:page-size="pageSize" :page-sizes="[10,20,30,40]"
      @current-change="changePage"/>
      <!--分页插件 end-->

    </div>
    <!--表格区域 end-->

    <!--新增管理员弹出框 start-->
    <el-dialog v-model="addUserVisible" align-center width="42%" destroy-on-close>
      <template #header>
        <div class="my-header">
          <el-icon size="26px"><EditPen/></el-icon>
          <h1>添加管理员</h1>
        </div>
      </template>
      <!--添加管理员组件 start-->
      <AddUser @closeAddUserForm="closeAddUserForm" @success="success"/>
      <!--添加管理员组件 end-->
    </el-dialog>
    <!--新增管理员弹出框 end-->
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e99d53
}
.card-search h3 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.el-card {
  border-radius: 0px;
  border: none;
}
/*自定义按钮样式*/
.my-button {
  display: flex;
  justify-content: space-between;
}

/*自定义弹出框头部样式*/
.my-header {
  display: flex;
  justify-content: flex-start;
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
</style>